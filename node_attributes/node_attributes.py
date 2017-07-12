import json
import sys
from anytree import Node, RenderTree, Resolver
from anytree.dotexport import RenderTreeGraph


# Find a specific node by name
def find_node(data, node_label):
    for node in data["nodes"]:
        if "label" in node:
            if node_label in node["label"]:
                return node["id"]


# Find a specific label by node
def find_label(data, node_id):
    for node in data["nodes"]:
        if "id" in node:
            if node_id in node["id"]:
                if "label" in node:
                    return node["label"]
                else:
                    return "No name"


# Generate tree of the callgraph
def generate_tree(entry_node, data, root, visited=None):
    if visited is None:
        visited = set()
    for link in data["links"]:
        if entry_node in link["source"]:
            key = hash(entry_node + link["source"] + link["target"])
            if key not in visited:
                visited.add(key)
                name = find_label(data, link["target"])
                new_node = Node(name, parent=root)
                generate_tree(link["target"], data, new_node, visited)
    return root


# The degree of a node is defined as the number of its neighboring edges
def node_degree(node, data):
    counter_source = 0
    counter_target = 0
    for link in data["links"]:
        if node in link["source"]:
            counter_source += 1
        if node in link["target"]:
            counter_target += 1
    return counter_source, counter_target, counter_source + counter_target


# Looks for the shortest path to the requested node
# Have the root be the node, and average the distance to its children nodes
def node_path_length(tree, node_name):
    resolver = Resolver('name')
    total = 0
    children_number = 0
    start = '*'
    for i in range(tree.height):
        node = resolver.glob(tree, start + node_name)
        if node != []:
            for child in node[0].children:
                total += child.height
                children_number += 1
            if children_number != 0:
                total = total / children_number
        else:
            start += '/*'
    return total


# For a node u, the clustering coefficient c(u) represents the likelihood that any two neighbors of u are connected.
# Step 1: Get list, L, of all connected (sources or targets, anything) nodes to "node". 
# Step 2: For all pairs (a, b) of nodes in L:
#   Step 2a: If a!=b and a and b are connected (a->b or b->a), then add to clustering coefficient
def clustering_coefficient(node, data):
    return


# Distance from the node to the entry node.
def distance_to_interface(tree, node_name):
    resolver = Resolver('name')
    start = '*'
    for i in range(tree.height):
        node = resolver.glob(tree, start + node_name)
        if node != []:
            return node[0].depth
        else:
            start += '/*'


# -- NO LONGER IN DEV --
# Might not be useful for directed graph -- eccentricity of most nodes is infinity
# The eccentricity of a node u is defined as e(u) = max{d(u, v) : v ∈ V },
# where the distance d(u, v) is the length of the shortest path from u to v.
def effective_eccentricity(node, data):
    return


# -- NO LONGER IN DEV --
# Might not be useful for graphs with unique labels. 
# We define the impurity degree of a node u as: ImpurityDeg(u) = |L(v) : v ∈ N(u), L(u) 6= L(v)|
# where L(u) is the label, and N(u) is the neighborhood of (the nodes adjacent to) node u.
def neighborhood_impurity(node, data):
    return


# Print results out.
def print_results(node_name):
    requested_node = find_node(data, node_name)

    print("\nThe results for node \"" + node_name + "\" with interface \"" + interface + "\" are:\n")
    print("\tNode degree (out, in, total):", node_degree(requested_node, data))
    print("\tNode distance to interface:", distance_to_interface(tree, node_name))
    print("\tNode path length:", node_path_length(tree, node_name))  # fix
    # print("\tNode clustering coefficient:", node_path_length(tree, node_name))  # fix

# Main
if len(sys.argv) < 1:
    sys.stderr.write("Syntax : python %s json_file function_name\n" % sys.argv[0])
else:
    with open(sys.argv[1]) as data_file:
        data = json.load(data_file)
    interface = sys.argv[3] if len(sys.argv) > 3 else "external node"
    entry_node = find_node(data, interface)
    root = Node(interface)
    tree = generate_tree(entry_node, data, root)
    RenderTreeGraph(tree).to_picture("Callgraph.png")

    for pre, fill, node in RenderTree(tree):
        print("%s%s" % (pre, node.name))

    if len(sys.argv) > 2:
        node_name = '{' + sys.argv[2] + '}'
        requested_node = find_node(data, node_name)
        print_results(node_name)
    else:
        for node in data["nodes"]:
            if "label" in node:
                node_name = node['label']
                print_results(node_name)

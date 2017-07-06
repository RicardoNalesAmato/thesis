import json
import sys
from anytree import Node, RenderTree, Resolver


# Find a specific node by name
def find_node(data, node_label):
    for node in data["nodes"]:
        if "label" in node:
            if node_label + "}" in node["label"]:
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
    return counter_source, counter_target


# Looks for the shortest path to the requested node
# Add parameter for node instead of parsing from command line - node_path_length(node, tree)
# See the definition of centrality from the paper, fix it
def node_path_length(tree):
    resolver = Resolver('name')
    start = '*'
    for i in range(tree.height):
        node = resolver.glob(tree, start + '{' + sys.argv[2] + '}')
        if node != []:
            return node[0].depth
        else:
            start += '/*'

# TODO - Ask Saahil
# For a node u, the clustering coefficient c(u) represents the likelihood that any two neighbors of u are connected.
# Step 1: Get list, L, of all connected (sources or targets, anything) nodes to "node". 
# Step 2: For all pairs (a, b) of nodes in L:
#   Step 2a: If a!=b and a and b are connected (a->b or b->a), then add to clustering coefficient
def clustering_coefficient(node, data):
    return

# Might not be useful for directed graph -- eccentricity of most nodes is infinity
# The eccentricity of a node u is defined as e(u) = max{d(u, v) : v ∈ V },
# where the distance d(u, v) is the length of the shortest path from u to v.
def effective_eccentricity(node, data):
    return


# Might not be useful for graphs with unique labels. 
# We define the impurity degree of a node u as: ImpurityDeg(u) = |L(v) : v ∈ N(u), L(u) 6= L(v)|
# where L(u) is the label, and N(u) is the neighborhood of (the nodes adjacent to) node u.
def neighborhood_impurity(node, data):
    return


# Main program
if len(sys.argv) < 3:
    sys.stderr.write("Syntax : python %s json_file function_name\n" % sys.argv[0])
else:
    with open(sys.argv[1]) as data_file:
        data = json.load(data_file)
    requested_node = find_node(data, sys.argv[2])
    entry_node = find_node(data, "external node")

    root = Node("Entry node")
    tree = generate_tree(entry_node, data, root)

    for pre, fill, node in RenderTree(tree):
        print("%s%s" % (pre, node.name))

    from anytree.dotexport import RenderTreeGraph

    RenderTreeGraph(tree).to_picture("Callgraph.png")

    print("\nThe results for node", sys.argv[2], "are:")
    print("Node degree (out, in):", node_degree(requested_node, data))

    print("Node path length:", node_path_length(tree))

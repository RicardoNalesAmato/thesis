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
def find_label(node_id):
    for node in data["nodes"]:
        if "id" in node:
            if node_id in node["id"]:
                if "label" in node:
                    return node["label"]
                else:
                    return node["id"]


# Tested
# Generate tree of the callgraph
def generate_tree(entry_node, root, visited=None):
    if visited is None:
        visited = set()
    for link in data["links"]:
        if entry_node in link["source"]:
            key = hash(entry_node + link["source"] + link["target"])
            if key not in visited:
                visited.add(key)
                name = find_label(link["target"])
                new_node = Node(name, parent=root)
                generate_tree(link["target"], new_node, visited)
    return root


# Tested
# The degree of a node is defined as the number of its neighboring edges
def node_degree(node):
    visited = set()
    counter_out = 0
    counter_in = 0
    for link in data["links"]:
        key = hash(link["source"] + link["target"])
        if key not in visited:
            if node in link["source"]:
                counter_out += 1
            if node in link["target"]:
                counter_in += 1
            visited.add(key)
    return counter_out, counter_in, counter_out + counter_in


# Looks for the shortest path to the requested node
# Have the root be the node, and average the distance to its children nodes
def node_path_length(tree, node_name):
    resolver = Resolver('name')
    total = 0
    children_number = 0
    start = '*'
    for i in range(tree.height):
        node = resolver.glob(tree, start + node_name)
        if node:
            node[0].parent = None
            result = get_all_children(node[0], total, children_number, True)
            total += result[0]
            children_number += result[1]
        else:
            start += '/*'
    if children_number != 0:
        total = total / children_number
    return total


# Looks for the shortest path to the requested node
def get_all_children(node, total, children_number, isRoot=False):
    for child in node.children:
        if child.children:
            result = get_all_children(child, total, children_number)
            total += result[0]
            children_number += result[1]
        else:
            total += child.depth
            children_number += 1
    if isRoot:
        return total, children_number
    else:
        return total, children_number


# Tested
# For a node u, the clustering coefficient c(u) represents the likelihood that any two neighbors of u are connected.
# Step 1: Get list, L, of all connected (sources or targets, anything) nodes to "node". 
# Step 2: For all pairs (a, b) of nodes in L:
#   Step 2a: If a!=b and a and b are connected (a->b or b->a), then add to clustering coefficient
def clustering_coefficient(list, degree):
    visited = set()
    triangles = 0
    ru = ((degree ** 2) - degree) / 2
    for related_node in list:
        for link in data["links"]:
            key = hash(related_node + link["source"] + link["target"])
            if key not in visited:
                if (related_node in link["source"]) and (link["target"] in list) and (link["source"] != link["target"]):
                    visited.add(key)
                    triangles += 1
                    # print("from:", find_label(link["source"]), "to:", find_label(link["target"]))
    return triangles / ru if ru != 0 else 0


# Tested
def generate_connected_list(requested_node):
    list_nodes = []
    for link in data["links"]:
        if requested_node in link["source"]:
            list_nodes.append(link['target'])
        if requested_node in link["target"]:
            list_nodes.append(link['source'])
    set_nodes = list(set(list_nodes))
    return set_nodes


# Tested
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


# Print results out.
def generate_json():
    requested_node = find_node(data, node_name)
    connected_list = generate_connected_list(requested_node)

    degree = node_degree(requested_node)

    results_json[node_name] = {"faulty": False, "node_degree": degree,
                               "distance_to_interface": distance_to_interface(tree, node_name),
                               "node_path_length": node_path_length(tree, node_name),
                               "clustering_coefficient": clustering_coefficient(connected_list, degree[2])}
    for cvss3_entry in cvss3_data:
        if node_name in cvss3_entry:
            macke_results = macke_attributes(node_name)
            results_json[node_name]["faulty"] = True
            results_json[node_name]["cvss3"] = cvss3_data[node_name]
            results_json[node_name]["macke_vulnerabilities_found"] = macke_results[0]
            results_json[node_name]["macke_bug_chain_length"] = macke_results[1]


# Macke functions
#  Number of vulnerabilities inside the function
def macke_attributes(node_name):
    directory = sys.argv[1].rsplit('/', 1)[0]
    number_of_bugs_found = 0
    bug_chain_length = 0
    with open(directory + "/klee.json") as klee_json:
        klee_json_data = json.load(klee_json)
    for key, value in sorted(klee_json_data.items()):
        if "function" in value:
            if '{' + value['function'] + '}' == node_name:
                number_of_bugs_found += 1
                bug_chain_length = value['phase']
        if "caller" in value:
            bug_chain_length = value['phase']
    return number_of_bugs_found, bug_chain_length


# Generate JSON for the frontend
def front_end_json():
    nodes = []
    links = []
    from random import randint
    for link in data["links"]:
        del link["key"]
        link["source"] = find_label(link["source"])
        link["target"] = find_label(link["target"])
        link["type"] = randint(0, 3)
        links.append(link)
    for node in data["nodes"]:
        if "label" in node:
            node["id"] = node["label"]
            del node["label"]
        if "shape" in node:
            del node["shape"]
        node["type"] = randint(0, 5)
        nodes.append(node)
    formatted_json = {
        'nodes': nodes,
        'links': links,
    }
    with open(sys.argv[1] + '__Test.json', 'w') as frontend_json:
        json.dump(formatted_json, frontend_json)


# Main
if len(sys.argv) < 2:
    sys.stderr.write("Syntax : python %s json_file function_name\n" % sys.argv[0])
else:
    with open(sys.argv[1]) as data_file:
        data = json.load(data_file)
    with open(sys.argv[2]) as cvss3_file:
        cvss3_data = json.load(cvss3_file)
    interface = sys.argv[3] if len(sys.argv) > 3 else "external node"
    entry_node = find_node(data, interface)
    root = Node(interface)
    tree = generate_tree(entry_node, root)
    results_json = {}
    RenderTreeGraph(tree).to_picture(sys.argv[1] + "_callgraph.png")

    for pre, fill, node in RenderTree(tree):
        print("%s%s" % (pre, node.name))

    for node in data["nodes"]:
        if "label" in node:
            node_name = node['label']
            generate_json()
    with open(sys.argv[1] + '_node_attributes.json', 'w') as fp:
        json.dump(results_json, fp)

    front_end_json()

import networkx as nx
import json
from networkx.readwrite import json_graph
import sys

if len(sys.argv)==1:
  sys.stderr.write("Syntax : python %s dot_file\n" % sys.argv[0])
else:
  dot_graph = nx.drawing.nx_agraph.read_dot(sys.argv[1])
  print json.dumps(json_graph.node_link_data(dot_graph))

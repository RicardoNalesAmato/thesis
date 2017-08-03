import sys
import json
import numpy

# Main
if len(sys.argv) < 1:
    sys.stderr.write("Syntax : python3 %s attributes_file.dot.json\n" % sys.argv[0])
else:
    with open(sys.argv[1]) as data_file:
        data = json.load(data_file)
    for function_name, function_data in data.items():
        if function_data["faulty"]:
            covariance = numpy.cov([[1, 2, 3, 4, 5], [5, 65, 345, 2, 7]], rowvar=False)
            correlation = numpy.corrcoef([[1, 2, 3, 4, 5], [5, 65, 345, 2, 7]], rowvar=False)
            print(covariance)
            print(correlation)

# We need only the values for CVSS3 scores of the resulting array NODEATTRIBUTES + CVSS3
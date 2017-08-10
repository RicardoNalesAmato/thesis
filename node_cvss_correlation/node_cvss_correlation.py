import sys
import json
import numpy
import os


# We need only the values for CVSS3 scores of the resulting array NODEATTRIBUTES + CVSS3
def prep_data(function_data):
    global cvss3_data
    result = []
    for key, value in sorted(function_data.items()):
        if key == 'clustering_coefficient':
            result.append(value)
        elif key == 'cvss3':
            cvss3_data = value
        elif key == 'distance_to_interface':
            if value is None:
                result.append(0)
            else:
                result.append(1)
        elif key == 'macke_bug_chain_length':
            result.append(value)
        elif key == 'macke_vulnerabilities_found':
            result.append(value)
        elif key == 'node_degree':
            result.append(value[2])
        elif key == 'node_path_length':
            result.append(value)

    # Mapping CVSS3 values
    for cvss3_entry_key, cvss3_entry_data in sorted(cvss3_data.items()):
        if cvss3_entry_key == 'attackVector':
            if cvss3_entry_data == 'NETWORK':
                result.append(0)
            elif cvss3_entry_data == 'ADJACENT':
                result.append(1)
            elif cvss3_entry_data == 'LOCAL':
                result.append(2)
            elif cvss3_entry_data == 'PHYSICAL':
                result.append(3)
        elif cvss3_entry_key == 'attackComplexity':
            if cvss3_entry_data == 'LOW':
                result.append(0)
            elif cvss3_entry_data == 'HIGH':
                result.append(1)
        elif cvss3_entry_key == 'privilegesRequired':
            if cvss3_entry_data == 'NONE':
                result.append(0)
            elif cvss3_entry_data == 'LOW':
                result.append(1)
            elif cvss3_entry_data == 'HIGH':
                result.append(2)
        elif cvss3_entry_key == 'userInteraction':
            if cvss3_entry_data == 'NONE':
                result.append(0)
            elif cvss3_entry_data == 'REQUIRED':
                result.append(1)
        elif cvss3_entry_key == 'scope':
            if cvss3_entry_data == 'UNCHANGED':
                result.append(0)
            elif cvss3_entry_data == 'CHANGED':
                result.append(1)
        elif cvss3_entry_key == 'confidentialityImpact':
            if cvss3_entry_data == 'NONE':
                result.append(0)
            elif cvss3_entry_data == 'LOW':
                result.append(1)
            elif cvss3_entry_data == 'HIGH':
                result.append(2)
        elif cvss3_entry_key == 'integrityImpact':
            if cvss3_entry_data == 'NONE':
                result.append(0)
            elif cvss3_entry_data == 'LOW':
                result.append(1)
            elif cvss3_entry_data == 'HIGH':
                result.append(2)
        elif cvss3_entry_key == 'availabilityImpact':
            if cvss3_entry_data == 'NONE':
                result.append(0)
            elif cvss3_entry_data == 'LOW':
                result.append(1)
            elif cvss3_entry_data == 'HIGH':
                result.append(2)
    return result


# Main
if len(sys.argv) < 2:
    sys.stderr.write('Syntax : python3 %s /node_attributes_directory\n' % sys.argv[0])
else:
    files = os.listdir(sys.argv[1])
    data = []
    structure_data = []
    for file in files:
        with open(os.path.join(sys.argv[1], file)) as data_file:
            all_functions = json.load(data_file)
            for key, value in all_functions.items():
                if value['faulty'] is True:
                    data.append(value)

    for function_data in data:
        structure_data.append(prep_data(function_data))

    covariance = numpy.cov(structure_data, rowvar=False)
    correlation = numpy.corrcoef(structure_data, rowvar=False)
    print('Covariance:\n', covariance)
    print('Correlation of CVSS3 Scores:\n')
    for i in range(5, 14):
        print(correlation[i])

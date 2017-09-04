import sys
import json
import os
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier


# We need only the values for CVSS3 scores of the resulting array NODEATTRIBUTES + CVSS3
def prep_data(function_data):
    cvss3_data = []
    node_attributes = []
    for key, value in sorted(function_data.items()):
        if key == 'clustering_coefficient':
            node_attributes.append(value)
        elif key == 'cvss3':
            cvss3_data = value
        elif key == 'distance_to_interface':
            node_attributes.append(value)
        elif key == 'macke_bug_chain_length':
            node_attributes.append(value)
        elif key == 'macke_vulnerabilities_found':
            node_attributes.append(value)
        elif key == 'node_degree':
            node_attributes.append(value[2])
        elif key == 'node_path_length':
            node_attributes.append(value)

    # Mapping CVSS3 values
    for cvss3_entry_key, cvss3_entry_data in sorted(cvss3_data.items()):
        if cvss3_entry_key == 'attackVector':
            if cvss3_entry_data == 'NETWORK':
                y_attack_vector.append(0)
            elif cvss3_entry_data == 'ADJACENT':
                y_attack_vector.append(1)
            elif cvss3_entry_data == 'LOCAL':
                y_attack_vector.append(2)
            elif cvss3_entry_data == 'PHYSICAL':
                y_attack_vector.append(3)
        elif cvss3_entry_key == 'attackComplexity':
            if cvss3_entry_data == 'LOW':
                y_attack_complexity.append(0)
            elif cvss3_entry_data == 'HIGH':
                y_attack_complexity.append(1)
        elif cvss3_entry_key == 'privilegesRequired':
            if cvss3_entry_data == 'NONE':
                y_privileges_required.append(0)
            elif cvss3_entry_data == 'LOW':
                y_privileges_required.append(1)
            elif cvss3_entry_data == 'HIGH':
                y_privileges_required.append(2)
        elif cvss3_entry_key == 'userInteraction':
            if cvss3_entry_data == 'NONE':
                y_user_interaction.append(0)
            elif cvss3_entry_data == 'REQUIRED':
                y_user_interaction.append(1)
        elif cvss3_entry_key == 'scope':
            if cvss3_entry_data == 'UNCHANGED':
                y_scope.append(0)
            elif cvss3_entry_data == 'CHANGED':
                y_scope.append(1)
        elif cvss3_entry_key == 'confidentialityImpact':
            if cvss3_entry_data == 'NONE':
                y_confidentiality_impact.append(0)
            elif cvss3_entry_data == 'LOW':
                y_confidentiality_impact.append(1)
            elif cvss3_entry_data == 'HIGH':
                y_confidentiality_impact.append(2)
        elif cvss3_entry_key == 'integrityImpact':
            if cvss3_entry_data == 'NONE':
                y_integrity_impact.append(0)
            elif cvss3_entry_data == 'LOW':
                y_integrity_impact.append(1)
            elif cvss3_entry_data == 'HIGH':
                y_integrity_impact.append(2)
        elif cvss3_entry_key == 'availabilityImpact':
            if cvss3_entry_data == 'NONE':
                y_availability_impact.append(0)
            elif cvss3_entry_data == 'LOW':
                y_availability_impact.append(1)
            elif cvss3_entry_data == 'HIGH':
                y_availability_impact.append(2)
    X.append(node_attributes)


def gaussian_learner(X, y):
    gnb = GaussianNB()  # SAAHIL: here you would need a gnb for every base score, i.e. gnb_av, gnb_ac etc.
    gnb.fit(X, y)
    return gnb  # SAAHIL: And finally here, return all the gnb's


def random_forest_learner(X, y):  # SAAHIL: structure similar to gaussian_learner
    clf = RandomForestClassifier(random_state=0)
    clf.fit(X, y)
    return clf


# Main
if len(sys.argv) < 2:
    sys.stderr.write('Syntax : python3 %s /node_attributes_directory\n' % sys.argv[0])
else:
    X = []
    y_attack_vector = []
    y_attack_complexity = []
    y_privileges_required = []
    y_user_interaction = []
    y_scope = []
    y_confidentiality_impact = []
    y_integrity_impact = []
    y_availability_impact = []
    files = os.listdir(sys.argv[1])
    data = []
    prediction_set = []
    structure_data = []
    for file in files:
        with open(os.path.join(sys.argv[1], file)) as data_file:
            all_functions = json.load(data_file)
            for key, value in all_functions.items():
                if value['faulty'] is True:
                    data.append(value)
                else:
                    prediction_set.append({key: value})

    for function in data:
        structure_data.append(prep_data(function))

    # Attack Vector Learners
    gaussian_av_learner = gaussian_learner(X, y_attack_vector)
    rf_av_learner = random_forest_learner(X, y_attack_vector)

    # Attack Complexity Learners
    gaussian_ac_learner = gaussian_learner(X, y_attack_complexity)
    rf_ac_learner = random_forest_learner(X, y_attack_complexity)

    # Privileges Required Learners
    gaussian_p_learner = gaussian_learner(X, y_privileges_required)
    rf_p_learner = random_forest_learner(X, y_privileges_required)

    # User Interaction Learners
    gaussian_ui_learner = gaussian_learner(X, y_user_interaction)
    rf_ui_learner = random_forest_learner(X, y_user_interaction)

    # Scope Learners
    gaussian_s_learner = gaussian_learner(X, y_scope)
    rf_s_learner = random_forest_learner(X, y_scope)

    # Confidentiality Impact Learners
    gaussian_c_learner = gaussian_learner(X, y_confidentiality_impact)
    rf_c_learner = random_forest_learner(X, y_confidentiality_impact)

    # Integrity Impact Learners
    gaussian_i_learner = gaussian_learner(X, y_integrity_impact)
    rf_i_learner = random_forest_learner(X, y_integrity_impact)

    # Availability Impact Learners
    gaussian_ai_learner = gaussian_learner(X, y_availability_impact)
    rf_ai_learner = random_forest_learner(X, y_availability_impact)

    for node in prediction_set:
        for key, node in node.items():
            print(key)
            if key == '{free}':
                print('HERE')
            test_values = [node['clustering_coefficient'], node['distance_to_interface'],
                           node['macke_bug_chain_length'],
                           node['macke_vulnerabilities_found'], node['node_degree'][2], node['node_path_length']]
            print('GAUSSIAN NAIVE BAYES')
            print(gaussian_av_learner.predict([test_values]), gaussian_ac_learner.predict([test_values]),
                  gaussian_p_learner.predict([test_values]), gaussian_ui_learner.predict([test_values]),
                  gaussian_s_learner.predict([test_values]), gaussian_c_learner.predict([test_values]),
                  gaussian_i_learner.predict([test_values]), gaussian_ai_learner.predict([test_values]))

            print('RANDOM FOREST')
            print(rf_av_learner.predict([test_values]), rf_ac_learner.predict([test_values]),
                  rf_p_learner.predict([test_values]), rf_ui_learner.predict([test_values]),
                  rf_s_learner.predict([test_values]), rf_c_learner.predict([test_values]),
                  rf_i_learner.predict([test_values]),
                  rf_ai_learner.predict([test_values]))

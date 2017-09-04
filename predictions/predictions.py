from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier


def gaussian_learner(X, y):
    gnb = GaussianNB() # SAAHIL: here you would need a gnb for every base score, i.e. gnb_av, gnb_ac etc. 
    gnb.fit(X, y) 
    return gnb # SAAHIL: And finally here, return all the gnb's


def random_forest_learner(X, y): # SAAHIL: structure similar to gaussian_learner
    clf = RandomForestClassifier(random_state=0) 
    clf.fit(X, y)
    return clf

# Main
# Attributes - TODO Ask Saahil if structure is correct (seems to be)
X = [[32, 43], [2, 3], [435, 546]]
'''
SAAHIL: 
X seems to be incorrect, unless this is only an example. 
Every element, eg. in place of [32, 43], should be a tuple such as [in_degree, out_degree, total_degree, clustering_coeff...]
Basically, every tuple in X contains all node attributes for a single node. 
'''

# Values - TODO Ask Saahil if structure is correct (seems to be)
y = [0, 2, 1]
'''
SAAHIL:
y seems to be correct, depending on what it means. 
Each value in y should be a base score value (such as attack vector, av) for the corresponding tuple in X. 
I suggest you name it y_av, y_ac, y_pr etc. instead of only y.
'''

gaussian_test_learner = gaussian_learner(X, y) # SAAHIL: You could send all the y's to this function. i.e. gaussian_learner(X, y_ac, y_av ....)
rf_test_learner = random_forest_learner(X, y) # SAAHIL: Same as above

print('GAUSSIAN NAIVE BAYES:')
print(gaussian_test_learner.predict([[2,3]]))
print('RANDOM FOREST:')
print(rf_test_learner.predict([[2,3]]))
#SAAHIL: For random forest, also print individual feature importances (check out scikit-learn documentation for help)

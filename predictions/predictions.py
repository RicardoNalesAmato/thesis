from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier


def gaussian_learner(X, y):
    gnb = GaussianNB()
    gnb.fit(X, y)
    return gnb


def random_forest_learner(X, y):
    clf = RandomForestClassifier(random_state=0)
    clf.fit(X, y)
    return clf

# Main
# Attributes - TODO Ask Saahil how to structure them
X = [[32, 43], [2, 3], [435, 546]]
# Values - TODO Ask Saahil how to structure them
y = [0, 2, 1]

gaussian_test_learner = gaussian_learner(X, y)
rf_test_learner = random_forest_learner(X, y)

print('GAUSSIAN NAIVE BAYES:')
print(gaussian_test_learner.predict([[2,3]]))
print('RANDOM FOREST:')
print(rf_test_learner.predict([[2,3]]))

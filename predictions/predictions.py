from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier


def gaussian_learner(X, y):
    print('GAUSSIAN NAIVE BAYES:')
    gnb = GaussianNB()
    y_pred = gnb.fit(X, y)
    print(y_pred.predict([[2, 3]]))


def random_forest_learner(X, y):
    print('RANDOM FOREST:')
    clf = RandomForestClassifier(random_state=0)
    clf.fit(X, y)
    print(clf.feature_importances_)
    print(clf.predict([[2, 3]]))

# Main

# Attributes - TODO Ask Saahil how to structure them
X = [[32, 43], [2, 3], [435, 546]]
# Values - TODO Ask Saahil how to structure them
y = [0, 1, 0]

gaussian_learner(X, y)
random_forest_learner(X, y)

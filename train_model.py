from sklearn.tree import DecisionTreeClassifier
import joblib
import numpy as np

# Sample dataset (replace with real data)
X = [
    [1, 0, 1, 1, 0],  # Example quiz responses
    [0, 1, 0, 0, 1],
    [1, 1, 1, 0, 0],
]
y = ['Web Development', 'AI', 'Data Science']  # Course labels

# Train the model
model = DecisionTreeClassifier()
model.fit(X, y)

# Save the model
joblib.dump(model, 'career_model.pkl')
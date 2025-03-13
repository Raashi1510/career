from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
import joblib

# Initialize Flask app
app = Flask(__name__)

# Initialize Firebase
cred = credentials.Certificate("path/to/firebase-service-account.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load the trained model
model = joblib.load('ml_model/career_model.pkl')

@app.route('/quiz', methods=['POST'])
def quiz():
    data = request.json
    responses = data['responses']

    # Predict courses
    predictions = model.predict([responses])
    probabilities = model.predict_proba([responses])[0]

    # Prepare response
    courses = []
    for i, course in enumerate(predictions):
        courses.append({
            'name': course,
            'accuracy': round(probabilities[i] * 100, 2),
        })

    return jsonify({"courses": courses})

if __name__ == '__main__':
    app.run(debug=True)
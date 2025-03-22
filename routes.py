from flask import Blueprint, render_template, request
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .utils import load_data

# Create a Blueprint for routes
bp = Blueprint("routes", __name__)

# Load course data
courses = load_data("data/course_data.csv")

# Vectorize course descriptions
tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(courses["Description"])

@bp.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # Get user input from the quiz
        topic = request.form["topic"]
        skill_level = request.form["skill_level"]
        language = request.form["language"]
        data_viz = request.form["data_viz"]
        ml_interest = request.form["ml_interest"]
        cybersecurity = request.form["cybersecurity"]
        learning_format = request.form["learning_format"]
        time_commitment = request.form["time_commitment"]
        cloud_platforms = request.form["cloud_platforms"]
        web_dev = request.form["web_dev"]

        # Combine user inputs into a single query
        user_input = (
            f"{topic} {skill_level} {language} {data_viz} {ml_interest} "
            f"{cybersecurity} {learning_format} {time_commitment} {cloud_platforms} {web_dev}"
        )

        # Vectorize user input
        user_vector = tfidf.transform([user_input])

        # Compute cosine similarity
        similarity_scores = cosine_similarity(user_vector, tfidf_matrix)
        course_indices = similarity_scores.argsort()[0][-3:][::-1]  # Top 3 courses
        recommended_courses = courses.iloc[course_indices]

        return render_template("results.html", courses=recommended_courses)
    return render_template("index.html")
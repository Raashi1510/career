import pandas as pd

def load_data(file_path):
    """Load the course data from a CSV file."""
    try:
        courses = pd.read_csv(file_path)
        print("Columns in CSV:", courses.columns.tolist())  # Debugging
        print("First few rows:\n", courses.head())  # Debugging
        return courses
    except Exception as e:
        print(f"Error loading data: {e}")
        return pd.DataFrame()
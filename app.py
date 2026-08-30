from flask import (
    Flask,
    render_template,
    request,
    jsonify
)

import pandas as pd
import joblib


app = Flask(__name__)


# Load trained model (Pipeline with
# built-in preprocessor)
model = joblib.load(
    "diabetes_final_8_features.joblib"
)


@app.route("/")
def home():

    return render_template(
        "index.html"
    )


@app.route(
    "/predict",
    methods=["POST"]
)
def predict():

    data = request.get_json()

    # Build input DataFrame matching
    # the model's expected 16 features.
    # The pipeline handles scaling and
    # encoding internally.
    input_data = pd.DataFrame([{

        "year":
            2024,

        "gender":
            data["gender"],

        "age":
            float(data["age"]),

        "location":
            "United States",

        "race:AfricanAmerican":
            0,

        "race:Asian":
            0,

        "race:Caucasian":
            0,

        "race:Hispanic":
            0,

        "race:Other":
            0,

        "hypertension":
            int(data["hypertension"]),

        "heart_disease":
            int(data["heart_disease"]),

        "smoking_history":
            data["smoking_history"],

        "bmi":
            float(data["bmi"]),

        "hbA1c_level":
            float(data["HbA1c_level"]),

        "blood_glucose_level":
            float(
                data["blood_glucose_level"]
            ),

        "clinical_notes":
            "",

    }])


    # Prediction
    prediction = model.predict(
        input_data
    )[0]

    # Diabetes probability
    probability = model.predict_proba(
        input_data
    )[0][1]


    return jsonify({

        "prediction":
            int(prediction),

        "label":
            (
                "Diabetic"
                if prediction == 1
                else "Non-diabetic"
            ),

        "probability":
            float(probability)

    })


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
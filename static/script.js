const form =
    document.getElementById(
        "predictionForm"
    );

const resultCard =
    document.getElementById(
        "resultCard"
    );

const resultTitle =
    document.getElementById(
        "resultTitle"
    );

const resultIcon =
    document.getElementById(
        "resultIcon"
    );

const probabilityText =
    document.getElementById(
        "probabilityText"
    );

const progressBar =
    document.getElementById(
        "progressBar"
    );

const resultMessage =
    document.getElementById(
        "resultMessage"
    );

const predictButton =
    document.getElementById(
        "predictButton"
    );


form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        predictButton.disabled = true;

        predictButton.innerHTML =
            "<span>Analyzing...</span>";


        const data = {

            gender:
                document.getElementById(
                    "gender"
                ).value,

            age:
                document.getElementById(
                    "age"
                ).value,

            hypertension:
                document.getElementById(
                    "hypertension"
                ).value,

            heart_disease:
                document.getElementById(
                    "heart_disease"
                ).value,

            smoking_history:
                document.getElementById(
                    "smoking_history"
                ).value,

            bmi:
                document.getElementById(
                    "bmi"
                ).value,

            HbA1c_level:
                document.getElementById(
                    "HbA1c_level"
                ).value,

            blood_glucose_level:
                document.getElementById(
                    "blood_glucose_level"
                ).value
        };


        try {

            const response =
                await fetch(
                    "/predict",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(data)
                    }
                );


            const result =
                await response.json();


            displayResult(result);


        } catch (error) {

            alert(
                "Unable to connect to the prediction server."
            );

        }


        predictButton.disabled = false;

        predictButton.innerHTML =
            "<span>Run Diabetes Analysis</span>" +
            "<span class='arrow'>→</span>";
    }
);


function displayResult(result) {

    resultCard.classList.remove(
        "hidden"
    );


    const probability =
        result.probability * 100;


    probabilityText.innerText =
        probability.toFixed(1) + "%";


    progressBar.style.width =
        probability + "%";


    if (
        result.prediction === 1
    ) {

        resultTitle.innerText =
            "Diabetic";

        resultIcon.innerText =
            "!";

        resultIcon.style.background =
            "#fee2e2";

        resultIcon.style.color =
            "#dc2626";

        progressBar.style.background =
            "linear-gradient(90deg,#f97316,#dc2626)";

        resultMessage.innerText =
            "The model predicts a higher " +
            "probability of diabetes for " +
            "this input. Please consult a " +
            "qualified healthcare professional " +
            "for further evaluation.";

    } else {

        resultTitle.innerText =
            "Non-diabetic";

        resultIcon.innerText =
            "✓";

        resultIcon.style.background =
            "#dcfce7";

        resultIcon.style.color =
            "#16a34a";

        progressBar.style.background =
            "linear-gradient(90deg,#22c55e,#16a34a)";

        resultMessage.innerText =
            "The model predicts a lower " +
            "probability of diabetes for " +
            "this input. This result is for " +
            "educational and screening purposes only.";
    }


    resultCard.scrollIntoView({
        behavior: "smooth"
    });
}


function resetForm() {

    form.reset();

    resultCard.classList.add(
        "hidden"
    );

    progressBar.style.width =
        "0%";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
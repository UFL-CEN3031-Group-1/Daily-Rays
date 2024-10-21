//submit affirmation
const affirmationForm = document.querySelector(".affirm-form");
const message = document.querySelector(".message");
const submit = document.querySelector(".submit-affirmation")

submit.addEventListener("click", (e)=> {
    e.preventDefault();
    db.collection('Affirmations').doc().set({ //adds message to database
        message: message.value,
    }).then(() => {
        affirmationForm.reset();
    })
});
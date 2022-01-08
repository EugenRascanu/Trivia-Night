let selectedQuestions = [];
let quizLength = 10;

let mainDiv = document.querySelector(".mainDiv");
let container = document.querySelector(".container");
let question = document.querySelector(".question");
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

let submitAnswerBtn = document.querySelector(".submitAnswerBtn");
let restartBtn = document.querySelector(".restartBtn");

let userBtn = document.querySelector(".userBtn");
let userInput = document.getElementById("user");
let currentQuestionMarkup = document.querySelector(".currentQuestion");
let answers = document.querySelectorAll(".answer");

let score = 0,
    questionNumber = 0;

//Modal elements
let modal = document.getElementById("myModal");
let modalContent = document.getElementById("content");

let userNameForm = document.querySelector(".userNameForm");
let rightAnswer = document.querySelector(".rightAnswer");
let wrongAnswer = document.querySelector(".wrongAnswer");
let noAnswer = document.querySelector(".noAnswer");
let resultsContent = document.querySelector(".resultsContent");
let restartQuizContent = document.querySelector(".restartQuizContent");

let resultScoreMarkup = document.querySelector(".resultScore");
let playAgain = document.querySelector(".playAgain");
let confirmRestartBtn = document.querySelector(".confirmRestartBtn");
let cancelRestartBtn = document.querySelector(".cancelRestartBtn");


//Event listener registrations
submitAnswerBtn.addEventListener("click", () => {
    let markedAnswer = getAnswer();
    let currentQuestion = selectedQuestions[questionNumber];

    if (markedAnswer != -1) {
        if (markedAnswer == currentQuestion.answer) {
            ++score;
            rightAnswer.style.display = "block";
            modal.style.display = "block";
        } else {
            wrongAnswer.style.display = "block";
            modal.style.display = "block";
        }
    } else {
        modal.style.display = "block";
        noAnswer.style.display = "block";
        setTimeout(closeModal, 2000);
        return;
    }

    if (questionNumber == selectedQuestions.length - 1) {
        resultScoreMarkup.innerHTML = `${score}/${selectedQuestions.length}`;
        resultsContent.style.display = "block";
    } else {
        setTimeout(nextQuestion, 1000);
    }

    modal.style.display = "block";
});

restartBtn.addEventListener("click", () => {
    restartQuizContent.style.display = "block";
    modal.style.display = "block";
});

confirmRestartBtn.addEventListener("click", () => {
    selectedQuestions = shuffleArray(selectedQuestions);
    score = 0;
    questionNumber = 0;
    loadQuestions();
    closeModal();
});

cancelRestartBtn.addEventListener("click", () => {
    closeModal();
});

userBtn.addEventListener("click", () => {
    console.log("user", userInput.value);
    let value = userInput.value;
    if (value != "") {
        localStorage.setItem("userNameValue", value);
        closeModal();
    } else {
        alert("Please Enter the user name");
    }
})

//Function definitions
/**
 * @param {Array} itemList - the array to be shuffled
 * @returns {Array} resultArray
 */
function shuffleArray(itemList) {
    const resultArray = itemList.slice();
    for (let i = resultArray.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [resultArray[i], resultArray[rand]] = [resultArray[rand], resultArray[i]];

    }
    return resultArray;
}

/**
 * @returns {undefined} 
 */
function loadQuestions() {
    currentQuestionMarkup.innerHTML = `Question: ${questionNumber + 1}/${selectedQuestions.length}`;
    let currentQuestion = selectedQuestions[questionNumber];

    question.innerHTML = currentQuestion.question;
    option1.innerHTML = currentQuestion.a;
    option2.innerHTML = currentQuestion.b;
    option3.innerHTML = currentQuestion.c;
    option4.innerHTML = currentQuestion.d;
};

/**
 * @returns {string} answer
 */
function getAnswer() {
    let answer = -1;

    answers.forEach(ans => {
        if (ans.checked)
            answer = ans.id;
    });

    return answer;
};

/**
 * @returns {undefined} 
 */
function nextQuestion() {
    closeModal();
    ++questionNumber;

    answers.forEach(ans => ans.checked = false);
    if (questionNumber < selectedQuestions.length)
        loadQuestions();
    else {
        currentQuestionMarkup.innerHTML = `Question: ${questionNumber + 1}/${selectedQuestions.length}`;
        localStorage.removeItem("userNameValue");
        selectedQuestions = shuffleArray(selectedQuestions);
    }
}

/**
 * @returns {undefined} 
 */
function closeModal() {
    modal.style.display = "none";
    userNameForm.style.display = "none";
    rightAnswer.style.display = "none";
    wrongAnswer.style.display = "none";
    resultsContent.style.display = "none";
    restartQuizContent.style.display = "none";
    noAnswer.style.display = "none";
}

allQuestions = shuffleArray(allQuestions);
selectedQuestions = allQuestions.slice(0, quizLength);
loadQuestions();

if (localStorage.getItem("userNameValue") == "" || !localStorage.getItem("userNameValue")) {
    modal.style.display = "block";
    userNameForm.style.display = "block";
}
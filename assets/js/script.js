function shuffleArray(array) {
    const dummyArray = array.slice();
    for (let i = dummyArray.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [dummyArray[i], dummyArray[rand]] = [dummyArray[rand], dummyArray[i]];

    }
    return dummyArray;
}
allQuestions = shuffleArray(allQuestions);
var mainDiv = document.querySelector('.mainDiv');
var container = document.querySelector('.container');
var question = document.querySelector('.question');
var option1 = document.querySelector('#option1');
var option2 = document.querySelector('#option2');
var option3 = document.querySelector('#option3');
var option4 = document.querySelector('#option4');

var submitAnswerBtn = document.querySelector('.submitAnswerBtn');
var restartBtn = document.querySelector('.restartBtn');

var userBtn = document.querySelector(".userBtn");
var userInput = document.getElementById("user");
var currentQuestionMarkup = document.querySelector('.currentQuestion');
var answers = document.querySelectorAll('.answer');

var score = 0,
    questionNumber = 0;

//Modal elements
var modal = document.getElementById("myModal");
var modalContent = document.getElementById("content");

var userNameForm = document.querySelector('.userNameForm');
var rightAnswer = document.querySelector('.rightAnswer');
var wrongAnswer = document.querySelector('.wrongAnswer');
var noAnswer = document.querySelector('.noAnswer');
var resultsContent = document.querySelector('.resultsContent');
var restartQuizContent = document.querySelector('.restartQuizContent');

var resultScoreMarkup = document.querySelector('.resultScore');
var playAgain = document.querySelector('.playAgain');
var confirmRestartBtn = document.querySelector('.confirmRestartBtn');
var cancelRestartBtn = document.querySelector('.cancelRestartBtn');


const getAnswer = () => {
    var answer = -1;

    answers.forEach(ans => {
        if (ans.checked)
            answer = ans.id;
    });

    return answer;
};

const nextQuestion = () => {
    closeModal();
    ++questionNumber;

    answers.forEach(ans => ans.checked = false);
    if (questionNumber < allQuestions.length)
        loadQuestions();
    else {
        currentQuestionMarkup.innerHTML = `Question: ${questionNumber + 1}/${allQuestions.length}`;
        localStorage.removeItem("userNameValue");
        allQuestions = shuffleArray(allQuestions);
    }
}

const loadQuestions = () => {
    currentQuestionMarkup.innerHTML = `Question: ${questionNumber + 1}/${allQuestions.length}`;
    var currentQuestion = allQuestions[questionNumber];

    question.innerHTML = currentQuestion.question;
    option1.innerHTML = currentQuestion.a;
    option2.innerHTML = currentQuestion.b;
    option3.innerHTML = currentQuestion.c;
    option4.innerHTML = currentQuestion.d;
};

loadQuestions();


const closeModal = () => {
    modal.style.display = "none";
    userNameForm.style.display = "none";
    rightAnswer.style.display = "none";
    wrongAnswer.style.display = "none";
    resultsContent.style.display = "none";
    restartQuizContent.style.display = "none";
    noAnswer.style.display = "none";
}

if (localStorage.getItem("userNameValue") == "" || !localStorage.getItem("userNameValue")) {
    modal.style.display = "block";
    userNameForm.style.display = "block";
}

//Events
submitAnswerBtn.addEventListener('click', () => {
    var markedAnswer = getAnswer();
    var currentQuestion = allQuestions[questionNumber];

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

    if (questionNumber == allQuestions.length - 1) {
        resultScoreMarkup.innerHTML = `${score}/${allQuestions.length}`;
        resultsContent.style.display = "block";
    } else {
        setTimeout(nextQuestion, 1000);
    }

    modal.style.display = "block";
});

restartBtn.addEventListener('click', () => {
    restartQuizContent.style.display = "block";
    modal.style.display = "block";
});

confirmRestartBtn.addEventListener('click', () => {
    allQuestions = shuffleArray(allQuestions);
    score = 0;
    questionNumber = 0;
    loadQuestions();
    closeModal();
});

cancelRestartBtn.addEventListener('click', () => {
    closeModal();
});

userBtn.addEventListener('click', () => {
    console.log("user", userInput.value);
    let value = userInput.value;
    if (value != "") {
        localStorage.setItem("userNameValue", value);
        closeModal();
    } else {
        alert("Please Enter the user name");
    }
})
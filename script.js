var AllQuestions = [{
    question: "In the hit movie 'Die Hard', what is John MClane's famous catch-phrase?",
    a: 'Ho-Ho-Ho, now i have a machinegun!',
    b: 'Yippee-ki-yay!',
    c: 'Shoot the glass!',
    d: 'Easy now, cowboy!',
    answer: 'ans2'
}, {
    question: "How many prime directives did 'Robocop' have in the first original movie?",
    a: '4',
    b: '6',
    c: '3',
    d: '10',
    answer: 'ans1'
}, {
    question: "In 'Predator 2', after killing the City Hunter, Lieutenant Mike Harrigan receives a flintlock pistol. What year was engraved on it?",
    a: '1840',
    b: '1675',
    c: '1910',
    d: '1715',
    answer: 'ans4'
}, {
    question: "In the first 'Termiantor' movie, the T-800, played by Arnold Schwarzenegger, had what mission?",
    a: 'Protect John Connor',
    b: 'Eliminate Sarah Connor',
    c: 'Protect SkyNet',
    d: 'Eliminate mankind',
    answer: 'ans2'
}, {
    question: "In 'Star Wars: Revenge of the Sith', the fighting scene between Anakin Skywalker and Obi Wan Kenobi, who had higher ground?",
    a: 'Anakin Skywalker',
    b: 'Obi Wan Kenobi',
    c: 'Both',
    d: 'Neither',
    answer: 'ans2'
}, {
    question: "What was the name of the first film in the 'Harry Potter' series?",
    a: 'Harry Potter and the Order of the Phoenix',
    b: 'Harry Potter and the Prisoner of Azkaban',
    c: 'Harry Potter and the Goblet of Fire',
    d: "Harry Potter And The Philosopher's Stone",
    answer: 'ans4'
}, {
    question: "In 'Beverly Hills Cop', Axel Foley was a cop from what city",
    a: 'Chicago',
    b: 'Beverly Hills',
    c: 'Detroit',
    d: 'New York',
    answer: 'ans3'
}, {
    question: "In what year was 'Rush Hour' produced?",
    a: '1998',
    b: '1999',
    c: '2000',
    d: '2001',
    answer: 'ans1'
}, {
    question: "Leonardo DiCaprio won his first Oscar for which movie?",
    a: 'The Wolf Of Wall Street',
    b: 'Django Unchained',
    c: 'The Revenant',
    d: 'Titanic',
    answer: 'ans3'
}, {
    question: "In 'Back To The Future', how many miles per hour did the DeLorean had to reach in order to time-travel?",
    a: '100',
    b: '88',
    c: '75',
    d: '90',
    answer: 'ans2'
}, ];


function shuffleArray(array) {
    const dummyArray = array.slice();
    for (let i = dummyArray.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [dummyArray[i], dummyArray[rand]] = [dummyArray[rand], dummyArray[i]];

    }
    return dummyArray;
}
AllQuestions = shuffleArray(AllQuestions);
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
    if (questionNumber < AllQuestions.length)
        loadQuestions();
    else {
        currentQuestionMarkup.innerHTML = `Question: ${questionNumber + 1}/${AllQuestions.length}`;
        localStorage.removeItem("userNameValue");
        AllQuestions = shuffleArray(AllQuestions);
    }
}

const loadQuestions = () => {
    currentQuestionMarkup.innerHTML = `Question: ${questionNumber + 1}/${AllQuestions.length}`;
    var currentQuestion = AllQuestions[questionNumber];

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
    var currentQuestion = AllQuestions[questionNumber];

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

    if (questionNumber == AllQuestions.length - 1) {
        resultScoreMarkup.innerHTML = `${score}/${AllQuestions.length}`;
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
    AllQuestions = shuffleArray(AllQuestions);
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
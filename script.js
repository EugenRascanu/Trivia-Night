var AllQuestions = [
    {
        question: "In the hit movie 'Die Hard', what is John MClane's famous catch-phrase?",
        a: 'Ho-Ho-Ho, now i have a machinegun!',
        b: 'Yippee-ki-yay!',
        c: 'Shoot the glass!',
        d: 'Easy now, cowboy!',
        answer: 'ans2'
    },
    {
        question: "How many prime directives did Robocop have in the first original movie?",
        a: '4',
        b: '6',
        c: '3',
        d: '10',
        answer: 'ans1'
    },
    {
        question: "In 'Predator 2', after killing the 'City Hunter', Lieutenant Mike Harrigan receives a flintlock pistol. What year was engraved on it?",
        a: '1840',
        b: '1675',
        c: '1910',
        d: '1715',
        answer: 'ans4'
    },
    {
        question: "In the first 'Termiantor' movie, the T-800, played by Arnold Schwarzenegger, had what mission?",
        a: 'Protect John Connor',
        b: 'Eliminate Sarah Connor',
        c: 'Protect SkyNet',
        d: 'Eliminate mankind',
        answer: 'ans2'
    },  
]

var mainDiv = document.querySelector('.mainDiv');
var container = document.querySelector('.container');
var question = document.querySelector('.question');
var option1 = document.querySelector('#option1');
var option2 = document.querySelector('#option2');
var option3 = document.querySelector('#option3');
var option4 = document.querySelector('#option4');
var submitBtn = document.querySelector('.submitBtn');
var ScoreDiv = document.querySelector('.score');
var answers = document.querySelectorAll('.answer');
var playAgain = document.querySelector('.playAgain')

var score = 0, questionNumber = 0;

const GetAnswer = () => {
    var answer = -1;

    answers.forEach(ans => {
        if(ans.checked)
            answer = ans.id;
    })

    return answer;
}

submitBtn.addEventListener('click', () => {
    var markedAnswer = GetAnswer();
    var currentQuestion = AllQuestions[questionNumber];

    if(markedAnswer != -1) {
        if(markedAnswer == currentQuestion.answer) 
            ++score;

        ++questionNumber;

        answers.forEach(ans => ans.checked = false)
        if(questionNumber < AllQuestions.length)
            loadQuestions();
        else {
            ScoreDiv.innerHTML = `Score: ${score}/${AllQuestions.length}`
            playAgain.innerHTML = `
            <button class='playAgainBtn' onClick='location.reload()'>Play Again</button>`
        }
    }
})

const loadQuestions = () => {
    ScoreDiv.innerHTML = `Score: ${score}/${AllQuestions.length}`
    var currentQuestion = AllQuestions[questionNumber];
   
    question.innerHTML = currentQuestion.question;
    option1.innerHTML = currentQuestion.a;
    option2.innerHTML = currentQuestion.b;
    option3.innerHTML = currentQuestion.c;
    option4.innerHTML = currentQuestion.d;
}

loadQuestions();
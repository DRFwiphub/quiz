const startBtn = document.getElementById("start-btn");

startBtn.addEventListener('click', () => {
    startBtn.style.display = "none"; 
    document.querySelector('.quiz').style.display = "block"; 
    startQuiz();
});

const questions = [
    {
        question: "Who is the Dragon Reborn?",
        answers: [
            { text: "Mat", correct: false },
            { text: "Rand", correct: true },
            { text: "Perrin", correct: false },
            { text: "Thom", correct: false }    
        ],
        right: "Rand is the Dragon Reborn",
        wrong: "Rand Al'Thor is the Dragon Reborn"
    },
    {
        question: "Who doesn't become royalty?",
        answers: [
            { text: "Matt", correct: false },
            { text: "Rand", correct: false },
            { text: "Lan", correct: true },
            { text: "Perrin", correct: false }    
        ],
        right: "Lan already is Royalty",
        wrong: "Lan was born a Prince in the Borderlands"
    },
    {
        question: "What is Mat's weapon of choice?",
        answers: [
            { text: "Spear", correct: false },
            { text: "Bow", correct: false },
            { text: "Knives", correct: false },
            { text: "Quarterstaff", correct: true }    
        ],
        right: "Mat's weapon of choice is a quarterstaff",
        wrong: "While proficient in all four weapons, he prefers a quarterstaff"
    },
    {
        question: "who is Rand'd half brother?",
        answers: [
            { text: "Galad", correct: true },
            { text: "Moraine", correct: false },
            { text: "Julian", correct: false },
            { text: "Logain", correct: false }    
        ],
        right: "Galad is Rand's brother",
        wrong: "Rand's mother was Tigraine, the former Queen of Andor and Galad's Birthmother"
    },
    {
        question: "Who is not among the Chosen?",
        answers: [
            { text: "Lanfear", correct: false },
            { text: "Damandred", correct: false },
            { text: "Tam", correct: true },
            { text: "Semirhage", correct: false }    
        ],
        right: "Tam raised Rand in the Two Rivers",
        wrong: "Lanfear, Demandred and Semirhage are all part of the Chosen"
    },
    {
        question: "is ruby cute",
        answers: [
            { text: "false", correct: false},
            { text: "true", correct: true}
        ],
        right: "Ruby is cute!",
        wrong: "You should know Ruby is cute!"
    },
    {
        question: "What's Ruby's oddest food choice?",
        answers: [
            { text: "Pandabao!!", correct: false },
            { text: "Onogiryyy!", correct: false },
            { text: "Pastrybun bun bun bun", correct: false },
            { text: "Anythinging tastyyyy", correct: false },    
            { text: "RaNdOm..", correct: right }
        ],
        wrong: "SShhhh! It's a secret!"
    },
];

const questionElement = document.getElementById("question");
const answerButton= document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const replayButton = document.getElementById("replay-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){   
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    shuffle(questions); // Shuffle once at the start!
    showQuestion();
}

function showQuestion(){
    resetState();
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');

        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });   
}
function flavourRight() {
    let current = questions[currentQuestionIndex];
    const flavourText = document.getElementById("flavour-text");
    flavourText.innerHTML = `Correct, ${current.right}`;
    var rht = document.getElementsByClassName('flavour');
    if (rht.length > 0) {
        rht[0].style.display = "block";
    }
}

function flavourWrong() {
    let current = questions[currentQuestionIndex];
    const flavourText = document.getElementById("flavour-text");
    flavourText.innerHTML = `${current.wrong}`;
    var wng = document.getElementsByClassName('flavour');
    if (wng.length > 0) {
        wng[0].style.display = "block";
    }
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
  }
}
function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
        flavourRight();
    }else{
        selectBtn.classList.add("incorrect");
        flavourWrong();
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");            
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    replayButton.style.display = "block"; 
}
replayButton.addEventListener('click', () => {
    replayButton.style.display = "none"; 
    document.querySelector('.quiz').style.display = "block"; 
    startQuiz();
});
function handleNextButton(){
    var flavourDivs = document.getElementsByClassName('flavour');
    if (flavourDivs.length > 0) {
        flavourDivs[0].style.display = "none";
    }

    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
    
});
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


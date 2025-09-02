const startBtn = document.getElementById("start-btn");
const replayBtn = document.getElementById("replay-btn");
const startInfo = document.getElementById("start-info");

if (startBtn) {
    startBtn.addEventListener('click', () => {
        hideStartAndReplay();
        document.querySelector('.quiz').style.display = "block"; 
        startQuiz();
    });
}

if (replayBtn) {
    replayBtn.addEventListener('click', () => {
        replayBtn.style.display = "none"; 
        document.querySelector('.quiz').style.display = "block"; 
        startQuiz();
    });
}

function hideStartAndReplay() {
    if (startBtn) {
        startBtn.style.display = "none";
    }
    if (replayBtn) {
        replayBtn.style.display = "none";
    }
    startInfo.style.display ="none";
}

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
        question: "Callandor is referred to as 'the sword that is not a sword'",
        answers: [
            { text: "false", correct: false},
            { text: "true", correct: true}
        ],
        right: "it's an angrel",
        wrong: "It's not a sword it's a sword shaped angrel"
    },
    {
        question: "2*2/2+2",
        answers: [
            { text: "2", correct: false },
            { text: "4", correct: true },
            { text: "6", correct: false },
            { text: "8", correct: false }
        ],
        right: "It's 4",
        wrong: "It's 4, following the BoDMAS rule, it's 2/2=1, 1*2=2, 2+2=4"
    },
    {
        question: "2 is the squareroot of 4",
        answers: [
            { text: "true", correct: true},
            { text: "false", correct: false}
        ],
        right: "2*2 = 4",
        wrong: "2*2 = 4"
    }
];

const questionElement = document.getElementById("question");
const answerButton= document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){   
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    shuffle(questions); 
    showQuestion();
}

function showQuestion(){
    resetState();
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = "Question " + questionNo + ": " + currentQuestion.question;
    shuffle(currentQuestion.answers);
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
    replayBtn.style.display = "block"; 
}
replayBtn.addEventListener('click', () => {
    replayBtn.style.display = "none"; 
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


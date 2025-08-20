const startBtn = document.getElementById("start-btn");

startBtn.addEventListener('click', () => {
    startBtn.style.display = "none"; // Hide start button
    document.querySelector('.quiz').style.display = "block"; // Show quiz
    startQuiz();
});

const questions = [
    {
        question: "Who is the Dragon Reborn?",
        answers: [
            { text: "Mat", correct: false },
            { text: "Perrin", correct: false },
            { text: "Rand", correct: true },
            { text: "Thom", correct: false }    
        ]
    },
    {
        question: "Who doesn't become royalty?",
        answers: [
            { text: "Matt", correct: false },
            { text: "Rand", correct: false },
            { text: "Lan", correct: true },
            { text: "Perrin", correct: false }    
        ]
    },

    {
        question: "who is Rand'd half brother?",
        answers: [
            { text: "Moraine", correct: false },
            { text: "Julian", correct: false },
            { text: "Galad", correct: true },
            { text: "Logain", correct: false }    
        ]
    },
    {
        question: "Who is not among the Chosen?",
        answers: [
            { text: "Lanfear", correct: false },
            { text: "Damandred", correct: false },
            { text: "Tam", correct: true },
            { text: "Semirhage", correct: false }    
        ]
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
    }else{
        selectBtn.classList.add("incorrect");
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
    replayButton.style.display = "block"; // Show button
};

replayButton.addEventListener('click', () => {
    replayButton.style.display = "none"; // Hide start button
    document.querySelector('.quiz').style.display = "block"; // Show quiz
    startQuiz();
});

function handleNextButton(){
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
//startQuiz();

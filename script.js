import { questions } from "./questions.js";
//import { flavourRight, flavourWrong, showQuestion, selectAnswer} from "./quizstructure.js";

const startBtn = document.getElementById("start-btn");
const replayBtn = document.getElementById("replay-btn");
const startInfo = document.getElementById("start-info");
const questionElement = document.getElementById("question");
const answerButton= document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;



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
function startQuiz(){   
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    shuffle(questions); 
    showQuestion();
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
  }
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
function shuffle(questions) { 
    for (let i = questions.length - 1; i > 0; i--) {
        var incrementIndex= i + 1;
        const j = Math.floor(Math.random() * (incrementIndex));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}
function checkCheckboxAnswer() {
    let current = questions[currentQuestionIndex];
    const checkboxes = answerButton.querySelectorAll('input[type="checkbox"]');
    const labels = answerButton.querySelectorAll('label');
    let allCorrect = true;
    let anyChecked = false;

    checkboxes.forEach((cb, idx) => {
        const shouldBeChecked = !!current.answers[idx].correct;
        if (shouldBeChecked) {
            labels[idx].classList.add('checkbox-correct');
        } else {
            labels[idx].classList.add('checkbox-incorrect');
        }
        if (cb.checked !== shouldBeChecked) {
            allCorrect = false;
        }
        if (cb.checked) anyChecked = true;
    });

    if (!anyChecked) {
        alert("Please select at least one answer.");
        labels.forEach(label => {
            label.classList.remove('checkbox-correct', 'checkbox-incorrect');
        });
        return;
    }

    if (allCorrect) {
        flavourRight();
        score++;
    } else {
        flavourWrong();
    }

    Array.from(checkboxes).forEach((cb) => {
        cb.disabled = true;
    });
    nextButton.style.display = "block";
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
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = "Question " + questionNo + ": " + currentQuestion.question;

    if (currentQuestion.type === "checkbox") {
        shuffle(currentQuestion.answers);
        currentQuestion.answers.forEach((answer, idx) => {
            const label = document.createElement('label');
            label.style.display = "block";
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "answer";
            checkbox.value = idx;
            checkbox.classList.add("quiz-checkbox"); 
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(" " + answer.text));
            answerButton.appendChild(label);
        });
        const submitBtn = document.createElement('button');
        submitBtn.textContent = "Submit";
        submitBtn.classList.add('btn');
        submitBtn.addEventListener("click", checkCheckboxAnswer);
        answerButton.appendChild(submitBtn);
    } else {
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
}
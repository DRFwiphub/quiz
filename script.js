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
        right: "it's an Sa'Angrel",
        wrong: "It's not a sword it's a sword shaped Sa'Angrel"
    },
    {
        question: "Which title does not belong to Rand Al'Thor",
        answers: [
            { text: "Coramoor", correct: false },
            { text: "Car'a'carn", correct: false },
            { text: "The Prince of Ravens", correct: true },
            { text: "He who comes with the Dawn", correct: false }
        ],
        right: "Mat is The Prince of Ravens",
        wrong: "Rand has many Titles including the Coramorr, Car'a'carn, and He who comes with the Dawn."
    },
    {
        question: "Faile's original hunter name was the same as Lan's Horse",
        answers: [
            { text: "true", correct: true},
            { text: "false", correct: false}
        ],
        right: "Perrin laughed at her about it",
        wrong: "Perrin pointed out the horse's name was Mandarb, Failes chosen hunter name."
    },
    {
        question: "Which of these are Aes Sedai Ajahs? (Select all that apply)",
        type: "checkbox", 
        answers: [
            { text: "Red", correct: true },
            { text: "Blue", correct: true },
            { text: "Black", correct: true },
            { text: "Gold", correct: false }
        ],
        right: "Red, Blue, and Black are all Ajahs.",
        wrong: "Gold is not an Ajah."
    },
    {
        question: "Which of these is NOT a city in the Wheel of Time?",
        answers: [
            { text: "Tar Valon", correct: false },
            { text: "Caemlyn", correct: false },
            { text: "Emond's Field", correct: false },
            { text: "Winterfell", correct: true }
        ],
        right: "Winterfell is from another fantasy series.",
        wrong: "Tar Valon, Caemlyn, and Emond's Field are all cities in the Wheel of Time."
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

    if (currentQuestion.type === "checkbox") {
        shuffle(currentQuestion.answers);
        currentQuestion.answers.forEach((answer, idx) => {
            const label = document.createElement('label');
            label.style.display = "block";
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "answer";
            checkbox.value = idx;
            checkbox.classList.add("quiz-checkbox"); // <-- Add this line
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(" " + answer.text));
            answerButton.appendChild(label);
        });

        // Add a submit button for checkbox questions
        const submitBtn = document.createElement('button');
        submitBtn.textContent = "Submit";
        submitBtn.classList.add('btn');
        submitBtn.addEventListener("click", checkCheckboxAnswer);
        answerButton.appendChild(submitBtn);
    } else {
        // Default: single-answer (button) question
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
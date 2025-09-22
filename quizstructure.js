import { questions } from "./questions.js";
import { currentQuestionIndex, score} from "./script.js";
import { shuffle}  from "./script.js";
import { questionElement, answerButton, nextButton } from "./domElements.js";


export function showQuestion(){
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
/*
export function checkCheckboxAnswer(currentQuestionIndex, answerButton, nextButton, flavourRight, flavourWrong) {
    let current = questions[currentQuestionIndex];
    let checkboxes = answerButton.querySelectorAll('input[type="checkbox"]');
    let labels = answerButton.querySelectorAll('label');
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
}*/

export function selectAnswer(e) {
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

export function flavourRight() {
    let current = questions[currentQuestionIndex];
    const flavourText = document.getElementById("flavour-text");
    flavourText.innerHTML = `Correct, ${current.right}`;
    var rht = document.getElementsByClassName('flavour');
    if (rht.length > 0) {
        rht[0].style.display = "block";
    }
}

export function flavourWrong() {
    let current = questions[currentQuestionIndex];
    const flavourText = document.getElementById("flavour-text");
    flavourText.innerHTML = `${current.wrong}`;
    var wng = document.getElementsByClassName('flavour');
    if (wng.length > 0) {
        wng[0].style.display = "block";
    }
}


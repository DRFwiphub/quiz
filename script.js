const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Sun Microsystems", "Netscape", "Google"],
        answer: "Netscape"
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Who invented JavaScript?",
        options: ["Brendan Eich", "Tim Berners-Lee", "James Gosling", "Bjarne Stroustrup"],
        answer: "Brendan Eich"
    },
    {
        question: "Which HTML element is used to include JavaScript in a page?",
        options: ["<js>", "<script>", "<javascript>", "<code>"],
        answer: "<script>"
    }
];

let userAnswers = [];
let currentQuestionIndex = 0;

// Render quiz question
function renderQuiz() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    const question = questions[currentQuestionIndex];
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    
    const questionTitle = document.createElement('h3');
    questionTitle.textContent = question.question;
    questionElement.appendChild(questionTitle);

    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question${currentQuestionIndex}`;
        input.value = option;
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        questionElement.appendChild(label);
        questionElement.appendChild(document.createElement('br'));
    });

    quizContainer.appendChild(questionElement);
}

// Get the user's answers
function getUserAnswers() {
    const options = document.querySelectorAll(`input[name='question${currentQuestionIndex}']`);
    for (const option of options) {
        if (option.checked) {
            userAnswers[currentQuestionIndex] = option.value;
        }
    }
}

// Check if all answers are selected before submitting
function checkAnswers() {
    const allAnswered = userAnswers.length === questions.length;
    if (!allAnswered) {
        alert("Please answer all the questions before submitting!");
        return false;
    }
    return true;
}

// Show the result after submission
function showResult() {
    let score = 0;
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            score++;
        }
    });

    const resultContainer = document.getElementById('result');
    resultContainer.textContent = `You scored ${score} out of ${questions.length}`;
}

// Handle submit button click
document.getElementById('submitBtn').addEventListener('click', () => {
    getUserAnswers();
    if (checkAnswers()) {
        showResult();
    }
});

// Initial render
renderQuiz();

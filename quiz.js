const questions = [
    {
        question: "What is the capital of ITALY?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        correct: 3
    },
    {
        question: "is harry potter a ?",
        options: ["Wizard", "Vampire", "Witch", "Worewolf"],
        correct: 0
    },
    {
        question: "What is 5 + 2?",
        options: ["8", "7", "5", "6"],
        correct: 1
    },
    {
        question: "Which is not a programming language?",
        options: ["HTML", "Python", "JavaScript", "C++"],
        correct: 0
    },
    {
        question: "Which company is trending the most?",
        options: ["Google", "Facebook", "Tiktok", "Twitter"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = Array(questions.length).fill(false);
let selectedAnswers = Array(questions.length).fill(null);

function loadQuestion() {
    const quizContainer = document.getElementById('question-container');
    const question = questions[currentQuestion];

    quizContainer.innerHTML = `
        <h2>${question.question}</h2>
        ${question.options.map((opt, idx) => 
            `<label>
                <input type="radio" name="option" value="${idx}" ${selectedAnswers[currentQuestion] === idx ? 'checked' : ''}>
                ${opt}
            </label><br>`).join('')}`;

    document.getElementById('next-btn').textContent = 
        currentQuestion === questions.length - 1 ? "Submit" : "Next";

    document.getElementById('prev-btn').style.display = currentQuestion === 0 ? 'none' : 'inline-block';
}

function updateScore() {
    score = 0;
    selectedAnswers.forEach((answer, idx) => {
        if (answer !== null && answer === questions[idx].correct) {
            score++;
        }
    });
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an answer!");
        return;
    }

    selectedAnswers[currentQuestion] = parseInt(selectedOption.value);

    if (!answered[currentQuestion]) {
        answered[currentQuestion] = true;
    }

    updateScore();
    
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function showResults() {
    const quizContainer = document.getElementById('question-container');
    quizContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score}/${questions.length}</p>
        <button onclick="restartQuiz()">Restart</button>
    `;

    document.getElementById('prev-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = Array(questions.length).fill(false);
    selectedAnswers = Array(questions.length).fill(null);
    document.getElementById('prev-btn').style.display = 'inline-block';
    document.getElementById('next-btn').style.display = 'inline-block';
    loadQuestion();
}

loadQuestion();

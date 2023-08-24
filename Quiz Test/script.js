const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question');
const questionInfo = document.getElementById('question-info');
const answerBtns = document.getElementById('answer-btns');

let shuffledQuestions, currentQuestionIndex;

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);

function startGame() {
    startBtn.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionInfo.innerText = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`
    questionText.innerText = question.question;
    question.answers.forEach(answer => {
        const btn = document.createElement('btn');
        btn.innerText = answer.text;
        btn.classList.add('btn');

        if (answer.correct) {
            btn.dataset.correct = answer.correct;
        }

        btn.addEventListener('click', selectAnswer);
        answerBtns.appendChild(btn);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextBtn.classList.add('hide');
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(element) {
    const selBtn = element.target;
    const correct = selBtn.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerBtns.children).forEach(btn => {
        setStatusClass(btn, btn.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide');
    } else {
        startBtn.innerText = 'Restart';
        startBtn.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is 5 + 4?',
        answers: [
            { text: '9', correct: true },
            { text: '54', correct: false },
            { text: '10', correct: false },
            { text: '7', correct: false }
        ]
    },
    {
        question: 'What is 9 + 11',
        answers: [
            { text: '911', correct: false },
            { text: '20', correct: true },
            { text: '5', correct: false },
            { text: '119', correct: false }
        ]
    }
]
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question');
const questionInfo = document.getElementById('question-info');
const answerBtns = document.getElementById('answer-btns');
const mainHeader = document.getElementById('main-header');

let shuffledQuestions, currentQuestionIndex;

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);

function startGame() {
    startBtn.classList.add('hide');
    mainHeader.classList.add('hide');
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

    let shuffledAnswers;
    shuffledAnswers = Array.from(question.answers).sort(() => Math.random() - 0.5);
    
    shuffledAnswers.forEach(answer => {
        const btn = document.createElement('button');
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
        btn.disabled = true;
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide');
    } else {
        startBtn.innerText = 'Finish';
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
        question: 'What year was the Treaty of Waitangi signed?',
        answers: [
            { text: '1840', correct: true },
            { text: '1845', correct: false },
            { text: '1835', correct: false },
            { text: '1850', correct: false }
        ]
    },
    {
        question: 'What is the Maori name for New Zealand?',
        answers: [
            { text: 'Niu Tirani', correct: false },
            { text: 'Aoetearoa', correct: true },
            { text: 'Waka-O-Aoraki', correct: false },
            { text: 'Tamaki Makaurau', correct: false }
        ]
    }
]
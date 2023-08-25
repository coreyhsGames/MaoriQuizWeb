const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question');
const questionImg = document.getElementById('question-image');
const questionInfo = document.getElementById('question-info');
const scoreInfo = document.getElementById('score-info');
const answerBtns = document.getElementById('answer-btns');
const mainHeader = document.getElementById('main-header');

let shuffledQuestions, currentQuestionIndex =0, score = 0;

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);

function startGame() {
    score = 0;
    scoreInfo.innerText = `Score: ${score} / 0`;
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

    if (question.type == 'word') {
        questionImg.classList.add('hide');
    } else if (question.type == 'image') {
        questionImg.classList.remove('hide');
        questionImg.src = question.image;
    }

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

    if (correct) {
        score++;
    }

    scoreInfo.innerText = `Score: ${score} / ${currentQuestionIndex + 1}`;
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
        type: 'word',
        question: 'What year was the Treaty of Waitangi signed?',
        answers: [
            { text: '1840', correct: true },
            { text: '1845', correct: false },
            { text: '1835', correct: false },
            { text: '1850', correct: false }
        ]
    },
    {
        type: 'word',
        question: 'What is the Maori name for New Zealand?',
        answers: [
            { text: 'Niu Tirani', correct: false },
            { text: 'Aotearoa', correct: true },
            { text: 'Waka-O-Aoraki', correct: false },
            { text: 'Tamaki Makaurau', correct: false }
        ]
    },
    {
        type: 'image',
        question: 'What city is this in New Zealand?',
        image: "../images/quizTest/Auckland_skyline_from_harbor_bridge_20_September_2019.jpg",
        answers: [
            { text: 'Christchruch', correct: false },
            { text: 'Wellington', correct: false },
            { text: 'Auckland', correct: true },
            { text: 'Taupo', correct: false }
        ]
    },
    {
        type: 'image',
        question: "What is New Zealand's tallest mountain?",
        image: "../images/quizTest/Mt_Sefton_massif_Aoraki_-_Mount_Cook_National_Park_New_Zealand.jpg",
        answers: [
            { text: 'Mount Cook', correct: true },
            { text: 'Mount Ruapehu', correct: false },
            { text: 'Mount Tasman', correct: false },
            { text: 'Mount Taranaki', correct: false }
        ]
    },
    {
        type: 'image',
        question: "Name of the sea between Australia and New Zealand.",
        image: "../images/quizTest/640px-Australia_and_New_Zealand_topic_image_Satellite_image.jpg",
        answers: [
            { text: 'Australian Sea', correct: false },
            { text: 'Oceaniac Sea', correct: false },
            { text: 'Tasman Sea', correct: true },
            { text: 'Coral Sea', correct: false }
        ]
    },
]
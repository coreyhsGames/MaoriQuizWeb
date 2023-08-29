// Control Buttons
const quitBtn = document.getElementById('quit-btn');
const nextBtn = document.getElementById('next-btn');
const closeBtn = document.getElementById('close-btn');

// Answer Buttons
const answerBtns = document.getElementById('answer-btns');

// Question Information
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question');
const questionImg = document.getElementById('question-image');
const questionInfo = document.getElementById('question-info');
const difficultyInfo = document.getElementById('difficulty-info');
const fullImgView = document.getElementById('full-img-view');
const fullImg = document.getElementById('full-img')
const scoreInfo = document.getElementById('score-info');
const mainHeader = document.getElementById('main-header');
const questionResult = document.getElementById('question-result');

// Difficulty Buttons
const difficultyContainer = document.getElementById('difficulty-btns')
const easyBtn = document.getElementById('easy-btn');
const mediumBtn = document.getElementById('medium-btn');
const hardBtn = document.getElementById('hard-btn');

let shuffledQuestions, currentQuestionIndex = 0, score = 0, selectedDifficulty, questions;

// Click Events
nextBtn.addEventListener('click', nextQuestion);
quitBtn.addEventListener('click', quitGame);
questionImg.addEventListener('click', showFullImg);
closeBtn.addEventListener('click', closeFullImg);

// Difficulty Button Events
easyBtn.addEventListener('click', function () {
    selectedDifficulty = 'Easy';
    startGame(selectedDifficulty);
});

mediumBtn.addEventListener('click', function () {
    selectedDifficulty = 'Medium';
    startGame(selectedDifficulty);
});

hardBtn.addEventListener('click', function () {
    selectedDifficulty = 'Hard';
    startGame(selectedDifficulty);
});

function showFullImg() {
    fullImgView.classList.remove('hide');
}

function closeFullImg() {
    fullImgView.classList.add('hide');
}

function setFullImg(imgSrc) {
    fullImg.src = imgSrc;
}

function startGame(selDifficulty) {
    questions = null;
    score = 0;

    scoreInfo.innerText = `Score: ${score} / 0`;
    
    difficultyContainer.classList.add('hide');
    mainHeader.classList.add('hide');
    quitBtn.classList.remove('hide');

    if (selDifficulty == 'Easy') {
        questions = easyQuestions;
    } else if (selDifficulty == 'Medium') {
        questions = mediumQuestions;
    } else if (selDifficulty == 'Hard') {
        questions = hardQuestions;
    }

    difficultyInfo.innerText = selDifficulty;

    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function quitGame() {
    difficultyContainer.classList.remove('hide');
    mainHeader.classList.remove('hide');
    quitBtn.classList.add('hide');
    questionContainer.classList.add('hide');
    nextBtn.classList.add('hide');
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
    questionResult.classList.add('hide');
    clearStatusClass(questionResult);

    questionInfo.innerText = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`
    questionText.innerText = question.question;

    if (question.type == 'word') {
        questionImg.classList.add('hide');
    } else if (question.type == 'image') {
        questionImg.classList.remove('hide');
        questionImg.style.backgroundImage = `url(${question.image})`;
        setFullImg(question.image);
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

    selBtn.classList.add('clicked');
    setStatusClass(document.body, correct);

    Array.from(answerBtns.children).forEach(btn => {
        setStatusClass(btn, btn.dataset.correct);
        btn.disabled = true;
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide');
    }

    questionResult.classList.remove('hide');

    if (correct) {
        score++;
        questionResult.innerText = "Correct!";
        setStatusClass(questionResult, true);
    } else {
        questionResult.innerText = "Wrong!";
        setStatusClass(questionResult, false);
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

// Easy Quiz Questions
const easyQuestions = [
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
        image: "../images/quizTest/AYDnyoodDp.jpg",
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
        image: "../images/quizTest/dXsyfNlxWM.jpg",
        answers: [
            { text: 'Mount Cook', correct: true },
            { text: 'Mount Ruapehu', correct: false },
            { text: 'Mount Tasman', correct: false },
            { text: 'Mount Taranaki', correct: false }
        ]
    },
    {
        type: 'image',
        question: "Name the sea between Australia and New Zealand.",
        image: "../images/quizTest/sLQIXFqDnO.jpg",
        answers: [
            { text: 'Australian Sea', correct: false },
            { text: 'Oceaniac Sea', correct: false },
            { text: 'Tasman Sea', correct: true },
            { text: 'Coral Sea', correct: false }
        ]
    },
    {
        type: 'word',
        question: "What is New Zealand's most populated city?",
        answers: [
            { text: 'Auckland', correct: true },
            { text: 'Hamilton', correct: false },
            { text: 'Dunedin', correct: false },
            { text: 'Christchurch', correct: false }
        ]
    },
    {
        type: 'word',
        question: "Which of these is an official language of New Zealand?",
        answers: [
            { text: 'Spanish', correct: false },
            { text: 'Maori', correct: true },
            { text: 'Chinese', correct: false },
            { text: 'NZ Sign Language', correct: true }
        ]
    },
    {
        type: 'image',
        question: "Where is this government building located in New Zealand?",
        image: "../images/quizTest/AnMoWAx9Rb.jpg",
        answers: [
            { text: 'Auckland', correct: false },
            { text: 'Christchurch', correct: false },
            { text: 'Wellington', correct: true },
            { text: 'Tauranga', correct: false }
        ]
    },
    {
        type: 'image',
        question: "Name this native bird in New Zealand.",
        image: "../images/quizTest/G615IPgjHL.jpg",
        answers: [
            { text: 'Emu', correct: false },
            { text: 'Brown quail', correct: false },
            { text: 'Rock pigeon', correct: false },
            { text: 'Kiwi', correct: true }
        ]
    },
    {
        type: 'word',
        question: "What is the name of New Zealand natives?",
        answers: [
            { text: 'Maori', correct: true },
            { text: 'Polynesians', correct: false },
            { text: 'Aboriginals', correct: false },
            { text: 'Hawaiian', correct: false }
        ]
    },
]

// Medium Quiz Questions
const mediumQuestions = [
    {
        type: 'word',
        question: "What is New Zealand's offical currency?",
        answers: [
            { text: 'New Zealand Dollar', correct: true },
            { text: 'New Zealand Euro', correct: false },
            { text: 'New Zealand Mark', correct: false },
            { text: 'New Zealand Pound', correct: false }
        ]
    },
]

// Hard Quiz Questions
const hardQuestions = [
    {
        type: 'word',
        question: "What year did the Sky Tower open?",
        answers: [
            { text: '1997', correct: true },
            { text: '1995', correct: false },
            { text: '2000', correct: false },
            { text: '1990', correct: false }
        ]
    },
    {
        type: 'word',
        question: "Which of these regions are part of the Realm of New Zealand?",
        answers: [
            { text: 'Hawaii', correct: false },
            { text: 'Tokelau', correct: true },
            { text: 'Solomon Islands', correct: false },
            { text: 'Tuvalu', correct: false }
        ]
    },
    {
        type: 'image',
        question: "What is the GDP Per Capita for New Zealand (2022 Estimate)?",
        image: "../images/quizTest/ckCeon2YYJ.jpg",
        answers: [
            { text: '~$65,000', correct: false },
            { text: '~$40,000', correct: false },
            { text: '~$47,000', correct: true },
            { text: '~$52,000', correct: false }
        ]
    },
]
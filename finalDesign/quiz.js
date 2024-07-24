// Control Buttons
const quitBtn = document.getElementById('quit-btn');
const nextBtn = document.getElementById('next-btn');
const closeBtn = document.getElementById('close-btn');
const usernameBtn = document.getElementById('username-btn');
const backBtn = document.getElementById('difficulty-back-btn');
const startQuizBtn = document.getElementById('start-quiz-btn');

// Main Menu Elements
const mainHeader2 = document.getElementById('main-header-2');
const usernameContainer = document.getElementById('username-container');
const usernameInput = document.getElementById('username-input');
const difficultyInfo = document.getElementById('difficulty-info');

// Answer Buttons
const answerBtns = document.getElementById('answer-btns');

// Question Information
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question');
const questionImg = document.getElementById('question-image');
const questionInfo = document.getElementById('question-info');
const difficultySelected = document.getElementById('difficulty-selected');
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
const difficultyBackBtn = document.getElementById('difficulty-back-btn');

// Quiz Result Elements
const quizResultsContainer = document.getElementById('quiz-results');
const resultsBtn = document.getElementById('results-btn');
const qrUsername = document.getElementById('username');
const qrTotalQuestions = document.getElementById('total-questions');
const qrTotalCorrect = document.getElementById('total-correct');
const qrTotalWrong = document.getElementById('total-wrong');
const qrScorePercentage = document.getElementById('score-percentage');
const qrTotalScore = document.getElementById('total-score');

let shuffledQuestions, currentQuestionIndex = 0, score = 0, selectedDifficulty, difficulty, username;

// Click Events
nextBtn.addEventListener('click', nextQuestion);
quitBtn.addEventListener('click', quitGame);
questionImg.addEventListener('click', showFullImg);
closeBtn.addEventListener('click', closeFullImg);
resultsBtn.addEventListener('click', showResults);
usernameBtn.addEventListener('click', submitUsername);
difficultyBackBtn.addEventListener('click', exitDifficultySelection);

startQuizBtn.addEventListener('click', function () {
    startGame(selectedDifficulty);
});

easyBtn.addEventListener('click', function () {
    difficultyInfo.classList.remove('hide');
    updateDifficultyInfo(easyQuestions);
});

mediumBtn.addEventListener('click', function () {
    difficultyInfo.classList.remove('hide');
    updateDifficultyInfo(mediumQuestions);
});

hardBtn.addEventListener('click', function () {
    difficultyInfo.classList.remove('hide');
    updateDifficultyInfo(hardQuestions);
});

// Full Image View Functions
function showFullImg() {
    fullImgView.classList.remove('hide');
}

function closeFullImg() {
    fullImgView.classList.add('hide');
}

function setFullImg(imgSrc) {
    fullImg.src = imgSrc;
}

// Username function
function submitUsername() {
    // Checks if the input is 0 or less.
    if (usernameInput.value <= 0) {
        window.alert("Username must contain something!");
    } else {
        // Sets the username to a variable
        username = usernameInput.value;
        showDifficultyBtns();
    }
}

// Shows the difficulty buttons
function showDifficultyBtns() {
    usernameContainer.classList.add('hide');

    mainHeader2.innerText = `Hello, ${username} please select a difficulty:`;

    difficultyContainer.classList.remove('hide');
    backBtn.classList.remove('hide');
}

// Updates the difficulty information
function updateDifficultyInfo(diff) {
    startQuizBtn.classList.remove('hide');
    
    // Gets the required elements
    const name = document.getElementById('difficulty-name');
    const questionAmount = document.getElementById('difficulty-questions');
    const requirements = document.getElementById('difficulty-requirements');

    name.innerText = diff.difficultyName;

    // Checks if the array length
    if (diff.questions.length == 1) {
        questionAmount.innerText = `${diff.questions.length} Question`;
    } else {
        questionAmount.innerText = `${diff.questions.length} Questions`;
    }
    requirements.innerText = diff.requirements;
    
    selectedDifficulty = diff;
}

// Back to username section
function exitDifficultySelection() {
    difficultyContainer.classList.add('hide');
    difficultyInfo.classList.add('hide');
    backBtn.classList.add('hide');
    startQuizBtn.classList.add('hide');

    mainHeader2.innerText = "Please enter a username:";

    usernameContainer.classList.remove('hide');
}

// Starts quiz/game
function startGame(selDifficulty) {
    difficulty = null;
    score = 0;

    // Checks the difficutly selected
    if (selDifficulty) {
        difficulty = selDifficulty;
    } else {
        window.alert("Could not find difficulty! Aborting the main menu...");

        exitDifficultySelection();
    }

    scoreInfo.innerText = `Score: ${score} / 0`;

    // Hides the menu elements
    backBtn.classList.add('hide');
    startQuizBtn.classList.add('hide');
    difficultyContainer.classList.add('hide');
    mainHeader.classList.add('hide');
    difficultyInfo.classList.add('hide');

    //Shows quiz elements
    quitBtn.classList.remove('hide');
    questionContainer.classList.remove('hide');

    difficultySelected.innerText = selDifficulty.difficultyName;

    shuffledQuestions = difficulty.questions.sort(() => Math.random() - 0.5); // Shuffles the question order
    currentQuestionIndex = 0;
    setNextQuestion();
}

// Goes back the main menu/username input
function quitGame() {
    // Shows elements
    mainHeader.classList.remove('hide');
    usernameContainer.classList.remove('hide');

    // Hides elements
    quitBtn.classList.add('hide');
    questionContainer.classList.add('hide');
    nextBtn.classList.add('hide');
    quizResultsContainer.classList.add('hide');
    resultsBtn.classList.add('hide');

    mainHeader2.innerText = "Please enter a username:";
}

// Goes to next question
function nextQuestion() {
    currentQuestionIndex++;
    setNextQuestion();
}

// Resets the buttons and shows the next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Shows question
function showQuestion(question) {
    questionResult.classList.add('hide');

    clearStatusClass(questionResult);

    questionInfo.innerText = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`
    questionText.innerText = question.question;

    // Checks question type
    if (question.type == 'word') {
        questionImg.classList.add('hide');
    } else if (question.type == 'image') {
        questionImg.classList.remove('hide');
        questionImg.style.backgroundImage = `url(${question.image})`;
        setFullImg(question.image);
    }

    // Shuffles options
    let shuffledAnswers;
    shuffledAnswers = Array.from(question.answers).sort(() => Math.random() - 0.5);

    // Sets up each option
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

// Hides next button and removes option's first child
function resetState() {
    nextBtn.classList.add('hide');

    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

// Triggered when a option is clicked
function selectAnswer() {
    const selBtn = event.target; // Gets the element that was clicked using event.target
    const correct = selBtn.dataset.correct;

    selBtn.classList.add('clicked');

    // Disables the options
    Array.from(answerBtns.children).forEach(btn => {
        setStatusClass(btn, btn.dataset.correct);
        btn.disabled = true;
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) { // Shows next question button if there are still questions remaining
        nextBtn.classList.remove('hide');
    } else {
        resultsBtn.classList.remove('hide'); // If no questions left, shows the result button
    }

    questionResult.classList.remove('hide');

    if (correct) { // User got it correct!
        score++;
        questionResult.innerText = "Correct!";
        setStatusClass(questionResult, true);
    } else { // User got it wrong. :(
        questionResult.innerText = "Wrong!";
        setStatusClass(questionResult, false);
    }

    scoreInfo.innerText = `Score: ${score} / ${currentQuestionIndex + 1}`; // Updates score element text
}

// Adds the correct or wrong class to each button, displaying which option was correct and wrong
function setStatusClass(element, correct) {
    clearStatusClass(element);

    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// Removes the correct and wrong class from the element
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// Shows quiz results
function showResults() {
    questionContainer.classList.add('hide');
    resultsBtn.classList.add('hide');

    quizResultsContainer.classList.remove('hide');

    // Updates the text for each element
    qrUsername.innerText = username;
    qrTotalQuestions.innerText = difficulty.questions.length;
    qrTotalCorrect.innerText = score;
    qrTotalWrong.innerText = difficulty.questions.length - score;
    qrScorePercentage.innerText = `${Math.round(((score * 100.00) / difficulty.questions.length) * 100) / 100}%`;
    qrTotalScore.innerText = `${score} / ${difficulty.questions.length}`;
}

// Vertical navigation bar
const verticalNavBar = document.getElementById('vertical-nav-bar');

const hamburger = document.getElementById('hamburger');
const closeNavBtn = document.getElementById('close-nav-btn');

hamburger.addEventListener('click', function () {
    verticalNavBar.style.width = "100%";
});

closeNavBtn.addEventListener('click', function () {
    verticalNavBar.style.width = "0%";
});

// Easy Quiz Questions
const easyQuestions = {
    difficultyName: "Easy",
    requirements: "Learn about New Zealand!\nRequires basic knowledge about New Zealand.",
    questions: [
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
            image: "images/AYDnyoodDp.jpg",
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
            image: "images/dXsyfNlxWM.jpg",
            answers: [
                { text: 'Mount Cook', correct: true },
                { text: 'Mount Ruapehu', correct: false },
                { text: 'Mount Tasman', correct: false },
                { text: 'Mount Taranaki', correct: false }
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
            image: "images/AnMoWAx9Rb.jpg",
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
            image: "images/G615IPgjHL.jpg",
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
        {
            type: 'word',
            question: "What is the name of someone that lives in New Zealand?",
            answers: [
                { text: 'New Zealanders', correct: true },
                { text: 'European', correct: false },
                { text: 'Kiwi', correct: true },
                { text: 'British', correct: false }
            ]
        },
    ]
}

// Medium Quiz Questions
const mediumQuestions = {
    difficultyName: "Medium",
    requirements: "A bit tougher but not too hard!\nRequires knowledge about New Zealand.",
    questions: [
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
        {
            type: 'image',
            question: "How many stars are on the current New Zealand flag?",
            image: "images/mS5qMlfIZO.jpg",
            answers: [
                { text: '1 star', correct: false },
                { text: '5 stars', correct: false },
                { text: '3 stars', correct: false },
                { text: '4 stars', correct: true }
            ]
        },
        {
            type: 'image',
            question: "Name the sea between Australia and New Zealand.",
            image: "images/sLQIXFqDnO.jpg",
            answers: [
                { text: 'Australian Sea', correct: false },
                { text: 'Oceaniac Sea', correct: false },
                { text: 'Tasman Sea', correct: true },
                { text: 'Coral Sea', correct: false }
            ]
        },
        {
            type: 'word',
            question: "What is the previous capital of New Zealand",
            answers: [
                { text: 'Auckland', correct: true },
                { text: 'Christchurch', correct: false },
                { text: 'Wellington', correct: false },
                { text: 'Gisborne', correct: false }
            ]
        },
        {
            type: 'word',
            question: "What is the name that the Maori gave to Europeans when they arrived in New Zealand?",
            answers: [
                { text: 'British', correct: false },
                { text: 'Pakeha', correct: true },
                { text: 'Europeans', correct: false },
                { text: 'English', correct: false }
            ]
        },
        {
            type: 'word',
            question: "How many official languages does New Zealand have?",
            answers: [
                { text: '5 languages', correct: false },
                { text: '3 languages', correct: true },
                { text: '2 languages', correct: false },
                { text: '1 language', correct: false }
            ]
        },
        {
            type: 'image',
            question: "What is the largest ethinc group in New Zealand?",
            image: "images/Gk1qv12Pk0.jpg",
            answers: [
                { text: 'Asian', correct: false },
                { text: 'African', correct: false },
                { text: 'European', correct: true },
                { text: 'American', correct: false }
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
            type: 'word',
            question: 'What is the name of the iconic holiday that New Zealand celebrates in the middle of each year?',
            answers: [
                { text: 'Waitangi Day', correct: false },
                { text: 'Te Matatini', correct: false },
                { text: 'Matariki', correct: true },
                { text: 'Labour Day', correct: false }
            ]
        },
        {
            type: 'word',
            question: "What is New Zealand's second most populated city?",
            answers: [
                { text: 'Auckland', correct: false },
                { text: 'Christchurch', correct: true },
                { text: 'Wellington', correct: false },
                { text: 'Tauranga', correct: false }
            ]
        },
    ]
}

// Hard Quiz Questions
const hardQuestions = {
    difficultyName: "Hard",
    requirements: "Has some of the hardest questions I have made.\nOnly nerds attempt...",
    questions: [
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
            image: "images/ckCeon2YYJ.jpg",
            answers: [
                { text: '~$65,000', correct: false },
                { text: '~$40,000', correct: false },
                { text: '~$47,000', correct: true },
                { text: '~$52,000', correct: false }
            ]
        },
        {
            type: 'word',
            question: "What is the population density of New Zealand?",
            answers: [
                { text: '20 people per Km2', correct: true },
                { text: '13 people per Km2', correct: false },
                { text: '25 people per Km2', correct: false },
                { text: '7 people per Km2', correct: false }
            ]
        },
        {
            type: 'word',
            question: "Who was the first offical person to discover New Zealand?",
            answers: [
                { text: 'James Cook', correct: false },
                { text: 'Sir Edmund Hillary', correct: false },
                { text: 'Abel Tasman', correct: true },
                { text: 'Christopher Columbus', correct: false }
            ]
        },
        {
            type: 'word',
            question: 'Which country was New Zealand named after?',
            answers: [
                { text: 'Netherlands', correct: true },
                { text: 'England', correct: false },
                { text: 'France', correct: false },
                { text: 'Germany', correct: false }
            ]
        },
        {
            type: 'word',
            question: 'Which of these tectonic plates does New Zealand sit on?',
            answers: [
                { text: 'Indian Plate', correct: false },
                { text: 'Australian Plate', correct: true },
                { text: 'Pacific Plate', correct: true },
                { text: 'Antarctic Plate', correct: false }
            ]
        },
        {
            type: 'word',
            question: 'What does New Zealand import the most?',
            answers: [
                { text: 'Vehicles', correct: true },
                { text: 'Oil', correct: false },
                { text: 'Computers', correct: false },
                { text: 'Smartphones', correct: false }
            ]
        },
        {
            type: 'word',
            question: 'What was the first capital city for New Zealand?',
            answers: [
                { text: 'Auckland', correct: false },
                { text: 'Okiato', correct: true },
                { text: 'Wellington', correct: false },
                { text: 'Christchurch', correct: false }
            ]
        },
        {
            type: 'word',
            question: 'When did the Maori arrive in New Zealand?',
            answers: [
                { text: '1200-1300', correct: true },
                { text: '1400-1500', correct: false },
                { text: '1000-1200', correct: false },
                { text: '1600-1700', correct: false }
            ]
        },
    ]
}

const questions = [
    {
        category: "HTML/CSS",
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        answer: 0,
        explanation: "HTML stands for Hyper Text Markup Language."
    },
    {
        category: "HTML/CSS",
        question: "Which tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1,
        explanation: "The a tag is used to create hyperlinks."
    },
    {
        category: "HTML/CSS",
        question: "Which CSS property changes text color?",
        options: ["background", "font-style", "color", "text-size"],
        answer: 2,
        explanation: "The color property changes the text color."
    },
    {
        category: "HTML/CSS",
        question: "Which HTML tag creates an unordered list?",
        options: ["<ol>", "<li>", "<ul>", "<list>"],
        answer: 2,
        explanation: "The ul tag creates an unordered list."
    },
    {
        category: "HTML/CSS",
        question: "Which CSS property controls space outside an element?",
        options: ["padding", "margin", "border", "spacing"],
        answer: 1,
        explanation: "Margin controls the space outside an element."
    },
    {
        category: "HTML/CSS",
        question: "Which HTML tag is used to insert an image?",
        options: ["<image>", "<img>", "<picture>", "<src>"],
        answer: 1,
        explanation: "The img tag is used to display an image."
    },
    {
        category: "HTML/CSS",
        question: "Which CSS property changes the background color?",
        options: ["color", "background-color", "font-color", "bgcolor"],
        answer: 1,
        explanation: "The background-color property changes the background color."
    },
    {
        category: "HTML/CSS",
        question: "Which HTML tag is used to create a table row?",
        options: ["<td>", "<th>", "<tr>", "<table-row>"],
        answer: 2,
        explanation: "The tr tag creates a table row."
    },
    {
        category: "HTML/CSS",
        question: "Which CSS property makes text bold?",
        options: ["font-style", "font-weight", "text-decoration", "font-size"],
        answer: 1,
        explanation: "The font-weight property makes text bold."
    },
    {
        category: "HTML/CSS",
        question: "Which HTML tag is used to create a form?",
        options: ["<input>", "<button>", "<form>", "<label>"],
        answer: 2,
        explanation: "The form tag is used to create an HTML form."
    },


    {
        category: "JavaScript",
        question: "Which keyword declares a variable in JavaScript?",
        options: ["int", "var", "string", "define"],
        answer: 1,
        explanation: "var is a JavaScript keyword used to declare variables."
    },
    {
        category: "JavaScript",
        question: "Which method displays a message in the console?",
        options: ["console.log()", "print()", "display()", "show()"],
        answer: 0,
        explanation: "console.log() displays messages in the browser console."
    },
    {
        category: "JavaScript",
        question: "Which symbol is used for strict equality?",
        options: ["=", "==", "===", "!="],
        answer: 2,
        explanation: "The strict equality operator checks both value and data type."
    },
    {
        category: "JavaScript",
        question: "Which method adds an item to the end of an array?",
        options: ["pop()", "push()", "shift()", "remove()"],
        answer: 1,
        explanation: "push() adds a new item to the end of an array."
    },
    {
        category: "JavaScript",
        question: "Which function runs code after a specified delay?",
        options: ["setInterval()", "setTimeout()", "delay()", "wait()"],
        answer: 1,
        explanation: "setTimeout() runs a function after a specified delay."
    },
    {
        category: "JavaScript",
        question: "Which keyword is used to declare a constant?",
        options: ["var", "let", "const", "constant"],
        answer: 2,
        explanation: "const declares a variable that cannot be reassigned."
    },
    {
        category: "JavaScript",
        question: "Which symbol is used for comments in a single line?",
        options: ["HTML comment", "//", "**", "comment"],
        answer: 1,
        explanation: "Double forward slashes are used for single-line comments."
    },
    {
        category: "JavaScript",
        question: "Which method removes the last item from an array?",
        options: ["push()", "shift()", "pop()", "unshift()"],
        answer: 2,
        explanation: "pop() removes the last item from an array."
    },
    {
        category: "JavaScript",
        question: "Which event occurs when a user clicks an HTML element?",
        options: ["onchange", "onmouseover", "onclick", "onload"],
        answer: 2,
        explanation: "The onclick event occurs when an element is clicked."
    },
    {
        category: "JavaScript",
        question: "Which operator is used for addition?",
        options: ["-", "*", "+", "/"],
        answer: 2,
        explanation: "The plus operator is used for addition."
    }

];


const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const reviewScreen = document.getElementById("review-screen");

const categorySelect = document.getElementById("category-select");
const startBtn = document.getElementById("start-quiz-btn");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-question-btn");

const timerSeconds = document.getElementById("timer-seconds");
const timerCircle = document.getElementById("timer-progress-circle");


let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let autoNextTimer;
let userAnswers = [];
let soundEnabled = true;
let isAnswered = false;

const TIMER_DURATION = 15;
const CIRCLE_LENGTH = 276.46;


function showScreen(screen) {
    document.querySelectorAll(".screen").forEach(function(item) {
        item.classList.remove("active");
    });

    screen.classList.add("active");
}


function startQuiz() {

    clearInterval(timer);
    clearTimeout(autoNextTimer);

    const category = categorySelect.value;

    if (category === "All") {
        quizQuestions = [...questions];
    } else {
        quizQuestions = questions.filter(function(item) {
            return item.category === category;
        });
    }

    currentQuestion = 0;
    score = 0;
    userAnswers = [];

    showScreen(quizScreen);
    loadQuestion();
}


function loadQuestion() {

    clearInterval(timer);
    clearTimeout(autoNextTimer);

    if (currentQuestion >= quizQuestions.length) {
        showResults();
        return;
    }

    isAnswered = false;

    const question = quizQuestions[currentQuestion];

    document.getElementById("quiz-category-badge").textContent =
        question.category;

    document.getElementById("quiz-progress-text").textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

    document.getElementById("quiz-live-score").textContent = score;

    document.getElementById("question-tag").textContent =
        `QUESTION ${String(currentQuestion + 1).padStart(2, "0")}`;

    questionText.textContent = question.question;

    document.getElementById("quiz-progress-bar").style.width =
        ((currentQuestion + 1) / quizQuestions.length) * 100 + "%";

    optionsContainer.innerHTML = "";

    question.options.forEach(function(option, index) {

        const button = document.createElement("button");

        button.className = "option-btn";
        button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;

        button.addEventListener("click", function() {
            selectAnswer(index);
        });

        optionsContainer.appendChild(button);
    });

    document.getElementById("feedback-banner").classList.remove("show");

    nextBtn.disabled = true;

    nextBtn.textContent =
        currentQuestion === quizQuestions.length - 1
            ? "See Results →"
            : "Next Question →";

    startTimer();
}

function startTimer() {

    timeLeft = TIMER_DURATION;

    updateTimerDisplay();

    timer = setInterval(function() {

        timeLeft--;

        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }

    }, 1000);
}


function updateTimerDisplay() {

    timerSeconds.textContent = timeLeft;

    const offset =
        CIRCLE_LENGTH - (timeLeft / TIMER_DURATION) * CIRCLE_LENGTH;

    timerCircle.style.strokeDashoffset = offset;

    if (timeLeft <= 5) {
        timerCircle.style.stroke = "#ff4b64";
    } else {
        timerCircle.style.stroke = "#35d9e9";
    }
}


function selectAnswer(selectedIndex) {

    if (isAnswered) return;

    isAnswered = true;

    clearInterval(timer);

    const question = quizQuestions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll(".option-btn");

    buttons.forEach(function(button) {
        button.disabled = true;
    });

    const isCorrect = selectedIndex === question.answer;

    if (isCorrect) {
        score++;
        buttons[selectedIndex].classList.add("correct");
        showFeedback(true, question.explanation);
        playSound(true);
    } else {
        buttons[selectedIndex].classList.add("wrong");
        buttons[question.answer].classList.add("correct");
        showFeedback(false, question.explanation);
        playSound(false);
    }

    userAnswers.push({
        question: question.question,
        category: question.category,
        options: question.options,
        correctAnswer: question.answer,
        selectedAnswer: selectedIndex,
        status: isCorrect ? "correct" : "wrong",
        explanation: question.explanation
    });

    document.getElementById("quiz-live-score").textContent = score;

    nextBtn.disabled = false;

    nextBtn.textContent =
        currentQuestion === quizQuestions.length - 1
            ? "See Results →"
            : "Next Question →";
}


function showFeedback(isCorrect, explanation) {

    const banner = document.getElementById("feedback-banner");

    banner.classList.add("show");

    document.getElementById("feedback-icon").textContent =
        isCorrect ? "✓" : "✕";

    document.getElementById("feedback-title").textContent =
        isCorrect ? "Excellent! Correct Answer" : "Oops! Incorrect Answer";

    document.getElementById("feedback-explanation").textContent =
        explanation;
}


function handleTimeout() {

    if (isAnswered) return;

    isAnswered = true;

    const question = quizQuestions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll(".option-btn");

    buttons.forEach(function(button) {
        button.disabled = true;
    });

    buttons[question.answer].classList.add("correct");

    userAnswers.push({
        question: question.question,
        category: question.category,
        options: question.options,
        correctAnswer: question.answer,
        selectedAnswer: null,
        status: "timeout",
        explanation: question.explanation
    });

    showFeedback(false, "Time is up! " + question.explanation);

    nextBtn.disabled = true;

    autoNextTimer = setTimeout(function() {
        nextQuestion();
    }, 1800);
}


function nextQuestion() {

    if (!isAnswered) return;

    clearInterval(timer);
    clearTimeout(autoNextTimer);

    currentQuestion++;

    loadQuestion();
}

function showResults() {

    clearInterval(timer);
    clearTimeout(autoNextTimer);

    showScreen(resultScreen);

    const total = quizQuestions.length;
    const percentage = Math.round((score / total) * 100);

    const wrong = userAnswers.filter(function(item) {
        return item.status === "wrong";
    }).length;

    const timeoutCount = userAnswers.filter(function(item) {
        return item.status === "timeout";
    }).length;

    document.getElementById("result-score-percent").textContent =
        percentage + "%";

    document.getElementById("result-score-fraction").textContent =
        `${score} / ${total} Correct`;

    document.getElementById("result-category-label").textContent =
        categorySelect.value === "All"
            ? "All Categories"
            : categorySelect.value;

    document.getElementById("stat-total").textContent = total;
    document.getElementById("stat-correct").textContent = score;
    document.getElementById("stat-wrong").textContent = wrong;
    document.getElementById("stat-timeout").textContent = timeoutCount;

    let message = "Good try! Keep practising.";

    if (percentage >= 90) {
        message = "Outstanding! You are a Quiz Champion!";
    } else if (percentage >= 70) {
        message = "Great job! You have strong knowledge!";
    } else if (percentage >= 50) {
        message = "Good work! Keep learning and improving!";
    }

    document.getElementById("result-performance-msg").textContent = message;

    saveHighScore(percentage);

    updateReviewCounts();

    if (percentage >= 70) {
        showConfetti();
    }
}


// HIGH SCORE

function getHighScore() {
    return Number(localStorage.getItem("quizbuzz_highscore")) || 0;
}


function updateHighScoreDisplay() {
    document.getElementById("start-high-score").textContent =
        getHighScore() + "%";
}


function saveHighScore(percentage) {

    const oldScore = getHighScore();

    if (percentage > oldScore) {

        localStorage.setItem("quizbuzz_highscore", percentage);

        document.getElementById("new-high-score-badge")
            .classList.add("show");

    } else {
        document.getElementById("new-high-score-badge")
            .classList.remove("show");
    }

    updateHighScoreDisplay();
}


document.getElementById("reset-highscore-btn")
    .addEventListener("click", function() {

        localStorage.removeItem("quizbuzz_highscore");

        updateHighScoreDisplay();

        alert("High score has been reset!");
    });


// REVIEW ANSWERS

function updateReviewCounts() {

    const correct = userAnswers.filter(function(item) {
        return item.status === "correct";
    }).length;

    const wrong = userAnswers.length - correct;

    document.getElementById("filter-all-count").textContent =
        userAnswers.length;

    document.getElementById("filter-correct-count").textContent =
        correct;

    document.getElementById("filter-wrong-count").textContent =
        wrong;
}


function showReview(filter = "all") {

    showScreen(reviewScreen);

    const container = document.getElementById("review-list-container");

    container.innerHTML = "";

    let filteredAnswers = userAnswers;

    if (filter === "correct") {
        filteredAnswers = userAnswers.filter(function(item) {
            return item.status === "correct";
        });
    }

    if (filter === "wrong") {
        filteredAnswers = userAnswers.filter(function(item) {
            return item.status !== "correct";
        });
    }

    if (filteredAnswers.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No answers in this category.";
        emptyMessage.className = "empty-message";
        container.appendChild(emptyMessage);
        return;
    }

    filteredAnswers.forEach(function(item) {

        const card = document.createElement("div");
        card.className = "review-item";

        const status = document.createElement("span");
        status.className = "review-status " + item.status;

        if (item.status === "correct") {
            status.textContent = "✓ Correct";
        } else if (item.status === "timeout") {
            status.textContent = "Time Out";
        } else {
            status.textContent = "✕ Wrong";
        }

        const title = document.createElement("h3");
        title.textContent = item.question;

        const yourAnswer = document.createElement("p");

        yourAnswer.textContent =
            "Your Answer: " +
            (item.selectedAnswer === null
                ? "Not Answered"
                : item.options[item.selectedAnswer]);

        const correctAnswer = document.createElement("p");
        correctAnswer.textContent =
            "Correct Answer: " + item.options[item.correctAnswer];

        const explanation = document.createElement("p");
        explanation.textContent = "Explanation: " + item.explanation;

        card.appendChild(status);
        card.appendChild(title);
        card.appendChild(yourAnswer);
        card.appendChild(correctAnswer);
        card.appendChild(explanation);

        container.appendChild(card);
    });
}


document.getElementById("filter-all-btn").addEventListener("click", function() {
    setActiveFilter(this);
    showReview("all");
});

document.getElementById("filter-correct-btn").addEventListener("click", function() {
    setActiveFilter(this);
    showReview("correct");
});

document.getElementById("filter-wrong-btn").addEventListener("click", function() {
    setActiveFilter(this);
    showReview("wrong");
});


function setActiveFilter(button) {

    document.querySelectorAll(".filter-btn").forEach(function(item) {
        item.classList.remove("active");
    });

    button.classList.add("active");
}


function playSound(correct) {

    if (!soundEnabled) return;

    try {
        const AudioContext =
            window.AudioContext || window.webkitAudioContext;

        const audio = new AudioContext();

        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.connect(gain);
        gain.connect(audio.destination);

        if (correct) {
            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(523.25, audio.currentTime);
            oscillator.frequency.setValueAtTime(659.25, audio.currentTime + 0.12);
            oscillator.frequency.setValueAtTime(783.99, audio.currentTime + 0.24);
        } else {
            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(330, audio.currentTime);
            oscillator.frequency.setValueAtTime(261.63, audio.currentTime + 0.15);
        }

        gain.gain.setValueAtTime(0.001, audio.currentTime);
        gain.gain.linearRampToValueAtTime(0.045, audio.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audio.currentTime + 0.45
        );

        oscillator.start(audio.currentTime);
        oscillator.stop(audio.currentTime + 0.46);

        oscillator.onended = function() {
            audio.close();
        };

    } catch (error) {
        console.log("Sound is not supported.");
    }
}


document.getElementById("sound-toggle-btn")
    .addEventListener("click", function() {

        soundEnabled = !soundEnabled;

        this.textContent = soundEnabled
            ? "Sound On"
            : "Sound Off";
    });


function showConfetti() {

    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -Math.random() * canvas.height,
            size: Math.random() * 7 + 3,
            speed: Math.random() * 4 + 2,
            color: ["#9865ff", "#35d9e9", "#ff64b4", "#ffcf63"][
                Math.floor(Math.random() * 4)
            ]
        });
    }

    let frames = 0;

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(function(particle) {

            ctx.fillStyle = particle.color;

            ctx.fillRect(
                particle.x,
                particle.y,
                particle.size,
                particle.size
            );

            particle.y += particle.speed;
            particle.x += Math.sin(particle.y / 30);

        });

        frames++;

        if (frames < 120) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}


window.startQuiz = startQuiz;

nextBtn.addEventListener("click", nextQuestion);

document.getElementById("quit-quiz-btn").addEventListener("click", function() {

    const confirmQuit = confirm("Are you sure you want to quit the quiz?");

    if (confirmQuit) {
        clearInterval(timer);
        clearTimeout(autoNextTimer);
        showScreen(startScreen);
    }
});

document.getElementById("restart-quiz-btn")
    .addEventListener("click", startQuiz);

document.getElementById("review-answers-btn")
    .addEventListener("click", function() {

        setActiveFilter(document.getElementById("filter-all-btn"));
        showReview("all");
    });

document.getElementById("home-btn").addEventListener("click", function() {
    showScreen(startScreen);
});

document.getElementById("back-to-results-btn")
    .addEventListener("click", function() {
        showScreen(resultScreen);
    });

document.getElementById("review-retake-btn")
    .addEventListener("click", startQuiz);

document.getElementById("review-home-btn")
    .addEventListener("click", function() {
        showScreen(startScreen);
    });

updateHighScoreDisplay();

showScreen(startScreen);

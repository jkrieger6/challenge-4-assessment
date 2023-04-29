// DOM elements
var questionsElement = document.getElementById("questions");
var timerElement = document.getElementById("timer");
var choicesElement = document.getElementById("options");
var submitBtn = document.getElementById("submit-score");
var startBtn = document.getElementById("start");
var nameElement = document.getElementById("name");
var feedbackElement = document.getElementById("feedback");
var reStartBtn = document.getElementById("restart");

// List of prompts and options
var questions = [
    {
        prompt: "What does 'DOM' stand for?",
        options: ["Document Object Model", "Database Object Management", "Data Organization Module"],
        answer: "Document Object Model"
      },
    {
        prompt: "What is the syntax for creating a function in JavaScript?",
        options: ["function = myFunction()", "function myFunction()", "myFunction() = function"],
        answer: "function = myFunction()"
      },
    {
        prompt: "What is the output of the following code: console.log(typeof(42));",
        options: ["undefined", "number", "string"],
        answer: "number"
      },
    {
        prompt: "Which of the following data types are supported by JavaScript?",
        options: ["Boolean", "String", "Numbers", "All of the above"],
        answer: "All of the above"
      },
    {
        prompt: "An array is seperated by what?",
        options: ["Hyphen ' - '","Comma ' , '","Period ' . '","Slash ' / '"],
        answer: "Period ' . '"
      },
    {
        prompt: "A global variable is accesible throughtout the entire document.",
        options: ["True", "False"],
        answer: "True"
      },
];

// Quiz's initial state
var currentpromptIndex = 0;
var time = questions.length * 15;
var timerId;
let questionsCounter;
let correctQuestions;
let score;

// Start quiz and hide frontpage
function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerElement.textContent = time;
    var landingScreenElement = document.getElementById("start-screen");
    landingScreenElement.setAttribute("class", "hide");
    questionsElement.removeAttribute("class");
    getQuestion();
}


// Loop through array of prompts and options and create list with buttons
function getQuestion() {
    if (questionsCounter >= questions.length) return renderResults();
    let qAndA = document.getElementById("question-words", "options");
    document.getElementById("questions").innerText = "";
    document.getElementById("question-words").innerText = questions.text;
    document.getElementById("options").innerHTML = "";
    for (let i = 0; i < questions.options.length; i++) {
        let btn = document.createElement("button");
        btn.className = "options-choice";
        btn.innerText = questions.answers[i];
        btn.className = "hoverable-button answer-choice";
        btn.onclick = captureAnswer;
        document.getElementById("options").appendChild(btn); 
    }
}

// Check for right options and deduct time for wrong answer, go to next prompt

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerElement.textContent = time;
      feedbackElement.textContent = `Wrong! The correct answer was ${prompts[currentpromptIndex].answer}.`;
      feedbackElement.style.color = "red";
    } else {
      feedbackElement.textContent = "Correct!";
      feedbackElement.style.color = "green";
    }
    feedbackElement.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackElement.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currenQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

// End quiz by hiding prompts, stop timer and show final score

function quizEnd() {
    clearInterval(timerId);
    var endScreenElement = document.getElementById("Quiz-Ended");
    endScreenElement.removeAttribute("class");
    var finalScoreElement = document.getElementById("Total Points");
    finalScoreElement.textContent = time;
    questionsElement.setAttribute("class", "hide");
}

// End quiz if timer reaches 0

function clockTick() {
    time--;
    timerElement.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

// Save score in local storage along with users' name

function saveHighscore() {
    var name = nameElement.value.trim();
    if (name !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
        score: time,
        name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

// Save users' score after pressing enter

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
nameElement.onkeydown = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;

//Leaderboard
var scoresBtn = document.querySelector("#view-high-scores");

// Rank previous scores in order by retrieving scores from localStorage

function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
    highscores.forEach(function(score) {
      var liTag = document.createElement("li");
      liTag.textContent = score.name + " - " + score.score;
      var olElement = document.getElementById("highscores");
      olElement.appendChild(liTag);
    });
}

// Clear previous scores when users click clear 
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  } document.getElementById("clear").onclick = clearHighscores;
  
printHighscores();







                    
                
        












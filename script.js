// DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("timer");
var choicesEl = document.getElementById("options");
var submitBtn = document.getElementById("submit-score");
var startBtn = document.getElementById("start");
var nameEl = document.getElementById("name");
var feedbackEl = document.getElementById("feedback");
var reStartBtn = document.getElementById("restart");

// List of prompts and options
var questions = [
    {
        prompt: "What does 'DOM' stand for?",
        options: ["Document Object Model", "Database Object Management", "Data Organization Module"],
        answer: "Docmuent Object Model"
      },
    {
        prompt: "What is the syntax for creating a function in JavaScript?",
        options: ["function = myFunction()", "function myFunction()", "myFunction() = function"],
        answer: "function myFunction()"
      },
    {
        prompt: "What is the output of the following code: console.log(typeof 42);",
        options: ["undefined", "number", "string"],
        answer: "number"
      },
    {
        prompt: "Which of the following data types are supported by JavaScript?",
        options: ["Boolean", "String", "Number", "All of the above"],
        answer: "All of the above"
      },
    {
        prompt: "An array is seperated by what?",
        options: ["-", ",", ".", "/"],
        answer: "."
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
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// Loop through array of prompts and options and create list with buttons
function getQuestion() {
    if (questionsCounter >= questions.length) return renderResults();
    let qAndA = document.getElementById("question-words", "options");
    // document.getElementById("questions").innerText = "";
    // document.getElementById("question-words").innerText = questions.text;
    // document.getElementById("options").innerHTML = "";
    for (let i = 0; i < questions.options.length; i++) {
        let btn = document.createElement("button");
        btn.className = "options-choice";
        btn.innerText = questions.answers[i];
        btn.className = "hoverable-button answer-choice";
        btn.onclick = captureAnswer;
        document.getElementById("options").appendChild(btn);
        
    }
    //     var currentQuestion = questions[currentQuestionIndex];
//   var promptEl = document.querySelector("question-words");
//     promptEl.textContent = currentQuestion.prompt;
//     choicesEl.innerHTML = "";
//     currentQuestion.options.forEach(function(choice, i) {
//         var choiceBtn = document.createElement("button");
//         choiceBtn.setAttribute("value", choice);
//         choiceBtn.textContent = i + 1 + "." + choice;
//         choiceBtn.onclick = questionClick;
//         choicesEl.appendChild(choiceBtn);
//     });
}

// Check for right options and deduct time for wrong answer, go to next prompt

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = `Wrong! The correct answer was ${prompts[currentpromptIndex].answer}.`;
      feedbackEl.style.color = "red";
    } else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
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
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

// End quiz if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

// Save score in local storage along with users' name

function saveHighscore() {
    var name = nameEl.value.trim();
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
nameEl.onkeydown = checkForEnter;

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
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
}

// Clear previous scores when users click clear 
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  } document.getElementById("clear").onclick = clearHighscores;
  
printHighscores();


// Old code
//start quiz
startBtn.addEventListener('click' , startTimer)

function startQuiz() {
    var currentprompt = questions[0];
    questionsEl.textContent = currentprompt.prompt;
    var promptoptionsKeys = Object.keys(currentprompt.options);
    console.log(promptoptionsKeys);
    for (let i = 0; i < promptoptionsKeys.length; i++) {
        var answerKey = promptoptionsKeys[i];
        console.log(answerKey);
        var currentAnswer = currentprompt.options[answerKey];
        console.log(currentAnswer);
        answerChoicesContainer.append(currentAnswer);
    }
}
startBtn.addEventListener('click' , showprompt);


                    
                
        












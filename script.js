// var quizprompts = document.querySelector("quiz-prompts");
// var timer = document.querySelector("timer");
// var btnStart = document.querySelector("btn-start");
// var timecounter = document.querySelector("timecounter");
// var titleitem = document.querySelector("title-item");
// var nextprompts 
// var promptoptions = document.querySelector("prompt-options");
// var myScore = document.querySelector("score");
// var btnScore = document.querySelector("btnScore");
// var currentindex = 0;
// var score = 0;
// var count = 75;
// var alert =document.querySelector("alert");
// var info = document.querySelector("info");
// var addscore = document.querySelector("addscore");
// var submitresult = document.querySelector("submitresult");
// var allScores = [];
// var storedScores = JSON.parse(localStorage.getItem("userData"));

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
    if (questionCounter >= questions.length) return renderResults();
    document.getElementById("question-words").innerText = "";
    document.getElementById("next-question").innerText = "Skip";
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










// var quizContainer = document.querySelector('quiz');
// var resultsContainer = document.querySelector('results');
// var startButton = document.querySelector('start');
// var promptTextEl = document.querySelector('prompt-text');
// var answerChoicesContainer = document.querySelector('answer-choices');

// //variable that is an array of objects with individual objects inside each
// var questions = [
//     {
//         prompt: "What does 'DOM' stand for?",
//         options: ["Document Object Model", "Database Object Management", "Data Organization Module"],
//         answer: 0
//       },
//     {
//         prompt: "What is the syntax for creating a function in JavaScript?",
//         options: ["function = myFunction()", "function myFunction()", "myFunction() = function"],
//         answer: 1
//       },
//     {
//         prompt: "What is the output of the following code: console.log(typeof 42);",
//         options: ["undefined", "number", "string"],
//         answer: 1
//       },
//     {
//         prompt: "Which of the following data types are supported by JavaScript?",
//         options: ["Boolean", "String", "Number", "All of the above"],
//         answer: 3
//       },
//     {
//         prompt: "An array is seperated by what?",
//         options: ["-", ",", ".", "/"],
//         answer: 2
//       },
//     {
//         prompt: "A global variable is accesible throughtout the entire document.",
//         options: ["True", "False"],
//         answer: 1
//       },
// ];

// // quiz variables
// let currentprompt = 0;
// let score = 0;
// let timer;

// //display quiz prompts and choices
// function showprompt() {
//     const q = questions[0];
//     document.querySelector("prompt").textContent = q.prompt;

//     // display answer choices
//     answerChoicesContainer.innerHTML = "";
//     for (let i = 0; i < q.choices.length; i++) {
//       const choice = document.createElement("button");
//       choice.textContent = q.choices[i];
//       choice.onclick = chooseAnswer;
//       choicesContainer.appendChild(choice);
//     }
//   }
//   function chooseAnswer() {
//     const selectedAnswer = e.target.value;
//     const answer = quizData.quiz[currentpromptIndex].answer;
//     if (selectedAnswer === answer) {
//       if (currentpromptIndex < quizData.quiz.length - 1) {
//         console.log(currentpromptIndex);
//         currentpromptIndex++;

//         answerButton.addEventListener('click', optionselected)
    //     nextprompt();
    //   } else {
    //     // end quiz and show score
    //     // ...
    //   }
    // }



    // const choiceIndex = e.target.value;
    // const q = questions[1];
    // if (choiceIndex === q.answer) {
    //   score++;
    // } else {
    //   // subtract time for incorrect answer
    //   timeRemaining -= 10; // or some other time penalty value
    //   if (timeRemaining < 0) {
    //     timeRemaining = 0;
    //   }
    //   document.querySelector("timer").textContent = `Time remaining: ${timeRemaining} seconds`;
    // }
    // currentprompt++;
    // if (currentprompt === prompts.length) { endQuiz();
    // } else {
    //   showprompt();
    // }
//   }

// end quiz and display results
//   function endQuiz() {
//     clearInterval(timer);
//     document.querySelector("quiz").style.display = "none";
//     document.querySelector("results").style.display = "block";
//     resultsContainer.display(textContent);
//   }
//   // start quiz timer
// let timeRemaining;
// function startTimer() {
//   timeRemaining = 60; // or some other quiz time limit
//   document.querySelector("timer").textContent = `Time remaining: ${timeRemaining} seconds`;
//   timer = setInterval(() => {
//     if (timeRemaining > 0) {
//       timeRemaining--;
//       document.querySelector("timer").textContent = `Time remaining: ${timeRemaining} seconds`;
//     } else {
//       endQuiz();
//     }
//   }, 1000);
// }

// start quiz
// document.querySelector('countdown').addEventListener('click' , showprompt);



// function showprompt() {
//     var currentprompt = questions[0];
//     promptTextEl.textContent = currentprompt.prompt;
//     // document.querySelector("answer-choices").innerHTML = "";
//     for (let i = 0; i < answerChoicesContainer.length; i++) {
//         var answerKey = currentprompt[3];
//         var currentAnswer = currentprompt.options[answerKey];
//         answerChoicesContainer.append(currentAnswer);
//     }
// }

//choose answer
// function chooseAnswer() {
//     var choiceIndex = Array.from(this.parentNode.children).indexOf(this);
//     var q = prompts[currentprompt];
//     if (choiceIndex === q.answer) {
//         score++;
//     }
//     currentprompt++;
//     if (currentprompt === prompt.length){
//         endQuiz();
//     } else {
//         showprompt();
//     }
// }

//function that ends the quiz either when timer reaches zero or all prompts have been answered.
// function endQuiz() {
//     clearInterval(timer);
//     quizContainer.style.display = "none";
//     resultsContainer.style.display = "block";
//     resultsContainer.textContent = 'You scored ${score} out of ${prompts.length}!';
// }

// function to start quiz timer
// function startTimer() {
//     let timeRemaining = 90;
//     time = setInterval(() => {
//       if (timeRemaining > 0) {
//         timeRemaining--;
//         document.querySelector("timer").textContent = `Time remaining: ${timeRemaining} seconds`;
//       } else {
//         endQuiz();
//       }
//     }, 1000);
//   }

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


                    
                
        












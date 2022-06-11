

//Dom Set of rules

var questionsTI = document.querySelector("#questions");
var timerTI = document.querySelector("#time");
var choicesTI = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsTI= document.querySelector("#initials");
var feedbackTI = document.querySelector("#feedback");


// Var for question indexes
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

// start of the function for quiz
function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionsTI.removeAttribute("class");


  timerId = setInterval(clockTick, 1000);
  timerTI.textContent = time;

  getQuestion();
}

// This function is what retrieves the questions from its javascript file
function getQuestion() {
   var currentQuestion = questions[currentQuestionIndex]
  // questions start
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  choicesTI.innerHTML = "";

  
  currentQuestion.choices.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

     //Choice nodes
    choiceNode.onclick = questionClick;
    choicesTI.appendChild(choiceNode);
  });
}

function questionClick() {
  // wrong answer
  if (this.value !== questions[currentQuestionIndex].answer) {
    // subtract time
    time -= 10;

    if (time < 0) {
      time = 0;
    }
    // show new time
    timerTI.textContent = time;
    feedbackTI.textContent = "Wrong! TRY HARDER";
    feedbackTI.style.fontSize = "400%";
  } else {
    feedbackTI.textContent = "Correct!, GOODJOB KEEP GOING";
    feedbackTI.style.fontSize = "800%";
  }

  feedbackTI.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackTI.setAttribute("class", "feedback hide");
  }, 1000);

  // next question
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}
// End of quiz
function quizEnd() {
  clearInterval(timerId);

  
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  questionsTI.setAttribute("class", "hide");
}

function clockTick() {


  time--;
  timerTI.textContent = time;
// time resets
  if (time <= 0) {
    quizEnd();
  }
}
 

// highscore function
function saveHighscore() {
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    
    var newScore = {
      score: time,
      initials: initials
    };

  // saves it all to local storage

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscore.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}


// buttons that begin the whole process

submitBtn.onclick = saveHighscore;
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;

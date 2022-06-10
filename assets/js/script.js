var questions = document.querySelector("#questions");
var timer  =document.querySelector ("#Timer")
var choices =document.querySelector ("#choices")
var initials =document.querySelector("#initials")
var submit =document.querySelector  ("#submit")
var time= questions.length *20;
var timerTime;

function startGame(){
   var BeginningScreen = document.getElementById("start-screen")
   BeginningScreen.setAttribute("class", "hide")
   questions.removeAttribute("class");

    timerTime = setInterval(clockTick, 1000);
   timer.textContent = time;
 
   getQuestion();

}
function getQuestion() {
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];
  
    // update title with current question
    var question_Ti = document.getElementById("question-title");
    question_Ti.textContent = currentQuestion.title;
  
    // clear out any old question choices
    choices.innerHTML = "";
  
    // loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
      // create new button for each choice
      var choiceBtn = document.createElement("button");
      choiceBtn.setAttribute("class", "choice");
      choiceBtn.setAttribute("value", choice);
  
      choiceBtn.textContent = i + 1 + ". " + choice;
  
      // attach click event listener to each choice
      choiceBtn.onclick = questionClick;
  
      // display on the page
      choices.appendChild(choiceBtn);
    });
  }
  

function quizEnd() {
    // stop timer
    clearInterval(timerId);
  
    // show end screen
    var endScreenEl = document.getElementById("finished-screen");
    endScreenEl.removeAttribute("class");
  
    // show final score
    var finalScoreEl = document.getElementById("score");
    finalScoreEl.textContent = time;
  
    // hide questions section
    questionsEl.setAttribute("class", "hide");
  }


function clockTick() {
    time--;

    timer.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
  }
  function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
  
    if (initials !== "") {
      // get saved scores from localstorage, or if not any, set to empty array
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      // format new score object for current user
      var newScore = {
        score: time,
        initials: initials
      };
  
      // save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      // redirect to next page
      window.location.href = "highscore.html";
    }
  }
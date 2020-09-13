var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern
var buttons = $(".btn");
var userClickedPattern
var level
var started
startOver();
reset();
$(document).keydown(nextSequence);

function startOver() {
  level = 0;
  gamePattern = []
  buttons.off("click", activate);
}

function activate() {
  var click = this;
  $(click).addClass("pressed");
  setTimeout(end, 100);
  function end() {
    $(click).removeClass("pressed");
  }
}
function respond(color) {
  var userChosenColor = color;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(level);
}
function checkAnswer(currentLevel) {
  if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else if(userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1]){
    console.log("User clicked: " + userClickedPattern); console.log("Game: " + gamePattern); console.log("User length: " + userClickedPattern.length); console.log("Game length: " + gamePattern.length);
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function reset() {
  userClickedPattern = [];
}
function nextSequence() {
  level++
  $("h1").text("Level " + level);
  // $(document).off("keydown", nextSequence);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $("#" + randomChosenColor).animate({
    opacity: 0
  }, 200);
  $("#" + randomChosenColor).animate({
    opacity: 100
  }, 400);
  playSound(randomChosenColor);
  buttons.click(activate);
  if(userClickedPattern[0] === undefined){
    buttons.click( function() {
      respond(this.id)
    });
  }
  reset();
}


function playSound(name) {
  switch (name) {
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    default:
      console.log(randomChosenColor);
  };
};

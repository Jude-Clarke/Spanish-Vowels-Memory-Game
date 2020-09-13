
// Define Variables
var buttonColors = ["A", "E", "I", "O", "U"];
var randomChosenColor;
var userChosenColor;
var gamePattern;
var buttons = $(".btn");
var userClickedPattern;
var level;
var play = true;
var delay;
var highscore = 0;
var returning = false;
var Beat = new Audio("sounds/beat.mp3");
var Game_over = new Audio("sounds/game_over.mp3");
Beat.loop = true;
function mute(){
  $("#mute").toggleClass("muted");
  Beat.muted = !Beat.muted;
}
$("#mute").on("click", mute);

//Run Game
init();
begin();

// Define Functions
function init() {
  // Reset Variables
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  buttons.off("click", activate);
  document.addEventListener("keydown", nextSequence);
  document.addEventListener("keydown", nextSequence);
  $("#level-title").addClass("hide");
  $("#mobile-instructions").removeClass("hide");
}
function reset() {
  userClickedPattern = [];
}

// Add Event Listeners
function begin() {
  buttons.off("click", function() {
    respond(this.id);
  });
}
$("#play-btn").on("click", nextSequence)

// Game Play
function activate() {
  var click = this;
  $(click).addClass("pressed");
  setTimeout(end, 100);

  function end() {
    $(click).removeClass("pressed");
  }
}
function respond(color) {
  if (gamePattern[0] !== undefined) {
    userChosenColor = color;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(level);
  }
}
function checkAnswer(currentLevel) {
  if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
    if (userClickedPattern.length === gamePattern.length) {
      delay = (Math.floor(Math.random() * 5000) + 1000);
      if ((delay > 5600) && (userClickedPattern.length > 5)) {
        delay = 4000;
      } else {
        delay = 1000
      }
      function procede() {
          if(userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
          nextSequence();
        }
      }
      setTimeout(procede, delay);
    }
  } else if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1]) {

    // GAME OVER
    Beat.pause();
    Beat.load();
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    play = false;
    function gameover(){
      Game_over.play();
    };
    setTimeout(gameover, 2300);
    buttons.removeClass("clickable");
    $("h3").text("Your Score: ");
    $("#score").text(level - 1);
    if (level - 1 > highscore) {
      highscore = (level - 1);
      setTimeout(reward, 1300);
      $("#play-btn").removeClass("pulse");
      returning = true;
    } else {
      $("#play-btn").addClass("pulse");
    }
    setTimeout(function(){
      $("#play-btn").removeClass("hide");
    }, 1300);
    init();
  }
}

function nextSequence() {
  Game_over.pause();
  Game_over.load();
  Beat.play();
  document.removeEventListener("keydown", nextSequence);
  $("#play-btn").addClass("hide");
  $("#level-title").removeClass("hide");
  $("#mobile-instructions").addClass('hide');

  if (returning === false) {
    $("h3").text("");
    $("#score").text("");
  } else {
    $("h3").removeClass("yay");
    $("h3").text("High Score");
    $("#score").text(highscore);
  }
  level++
  $("#level-title").text("Level " + level);
  randomChosenColor = buttonColors[(Math.floor(Math.random() * 5))];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).animate({
    opacity: 0
  }, 200);
  $("#" + randomChosenColor).animate({
    opacity: 100
  }, 400);
  playSound(randomChosenColor);
  buttons.click(activate);
  buttons.addClass("clickable");
  if (play === true) {
    buttons.click(function() {
      respond(this.id);
      play = false;
    });
  }
  reset();
}

//Sounds
function playSound(name) {
  switch (name) {
    case "A":
      var a = new Audio("sounds/A.mp3");
      a.play();
      break;
    case "E":
      var e = new Audio("sounds/E.mp3");
      e.play();
      break;
    case "I":
      var i = new Audio("sounds/I.mp3");
      i.play();
      break;
    case "O":
      var o = new Audio("sounds/O.mp3");
      o.play();
      break;
    case "U":
      var u = new Audio("sounds/U.mp3");
      u.play();
      break;
    default:
      console.log(randomChosenColor);
  };
};
var noise = new Audio("sounds/Beep_Short.mp3");
var five = new Audio("sounds/On_the_Tip_Sting.mp3");
var eight = new Audio("sounds/Big_Explosion_Cut_Off.mp3");
var eight2 = new Audio("sounds/Big_Explosion_Sweeping_In.mp3");
var ten = new Audio("sounds/Garden_Walk_Sting.mp3");
var ten2 = new Audio("sounds/Small_Glass_Pane_Shatter.mp3");
var eleven = new Audio("sounds/Gunfire.mp3");
var eleven2 = new Audio("sounds/Auto_Bullets_Flyby_Short.mp3");
var twelve = new Audio("sounds/Crash.mp3");
var thirteen = new Audio("sounds/Emergency_Siren_Short_Burst.mp3");
var fourteen = new Audio("sounds/Double_Helix_Sting.mp3");
var fifteen = new Audio("sounds/Fiend_Sting.mp3");
var muy_bien = new Audio("sounds/Muy_Bien.mp3");
var eso = new Audio("sounds/Eso.mp3");
var epa = new Audio("sounds/Epa.mp3");
var excelente = new Audio("sounds/Excelente.mp3");
var perfecto = new Audio("sounds/Perfecto.mp3");
var golaso = new Audio("sounds/Golaso.mp3");

function reward() {
  $("h3").text("NEW HIGH SCORE!")
  $("h3").addClass("yay");

  noise.play();

  if(highscore >= 5) {
    five.play();
    if(highscore < 8){
      muy_bien.play();
    }
  }
  if(highscore >= 8) {
    eight.play();
    eight2.play();
    if(highscore < 11){
      eso.play();
    }
  }
  if(highscore >= 10) {
    ten.play();
    ten2.play();
  }
  if(highscore >= 11) {
    eleven.play();
    eleven2.play();
    if(highscore < 13){
      epa.play();
    }
  }
  if(highscore >= 12) {
    twelve.play();
  }
  if(highscore >= 13) {
    thirteen.play();
    if(highscore < 14){
      excelente.play();
    }

  }
  if(highscore >= 14) {
    fourteen.play();
    if(highscore < 15) {
      perfecto.play();
    }
  }
  if(highscore >= 15) {
    fifteen.play();
    golaso.play();
  }
}

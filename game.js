var btnColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level;

function playSound(soundColor){
  var nextAudio = new Audio("sounds/"+soundColor+".mp3");
  nextAudio.play();
}

function animatePress(btnColor){
  $("#"+btnColor).addClass("pressed");
  setTimeout(function(){
    $("#"+btnColor).removeClass("pressed");
  }, 100);
}

function nextSeq() {
  var randNum = Math.floor(Math.random()*4);
  var nextBtnColor = btnColors[randNum];
  $("#"+nextBtnColor).fadeOut(100).fadeIn(100);
  playSound(nextBtnColor);
  userPattern = [];
  gamePattern.push(nextBtnColor);
  level++;
  $("h1").text("Level " + level);
}

function checkAnswer(currentLevel){
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userPattern.length) {
      setTimeout(nextSeq, 1000);
    }
  }else {
    console.log("wrong");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
}

$(".btn").on("click", function(){
  var clickedColor = $(this).attr('id');
  playSound(clickedColor);
  animatePress(clickedColor);
  userPattern.push(clickedColor);
  checkAnswer(userPattern.length-1)
});

$(document).on("keydown", function(){
  if (gamePattern.length === 0) {
    level = 0;
    $("h1").text("Level " + level);
    nextSeq();
  }
});

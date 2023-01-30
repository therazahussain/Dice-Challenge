var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = true;

var level = 0;



$(document).keypress(function(){
    if(started){
        $("#level-title").html("Level "+level);
        nextSequence();
        started = false;
    }
})

$(".btn").click(function(){
    var  userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);  
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

})


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

    if(userClickedPattern.length === gamePattern.length)
        setTimeout(function () {
            nextSequence()
              }, 1000);
    }

    else{
        playSound("wrong");

        $("body").addClass("game-over");
        
        setTimeout(function () {
            $("body").removeClass("game-over"); 
          }, 200);
        
          $("#level-title").html("Game Over, Press Any Key to Restart")
          startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = true;
}


function nextSequence(){

    userClickedPattern = [];
    
    level++;

    $("#level-title").html("Level "+level);
    
    var randomNumber = Math.floor(Math.random()*4);

    var randomColor = buttonColors[randomNumber];

    gamePattern.push(randomColor);

    $("#"+randomColor).fadeOut(50).fadeIn(50);
    playSound(randomColor);
    
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    // .delay(100).removeClass("pressed")

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

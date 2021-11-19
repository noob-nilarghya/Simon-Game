var gamePattern=[];   //keep the record of sequence of color pattern
var userClickedPattern=[];  //user pattern

var buttonColours=["red", "blue", "green", "yellow"];

// function which play sound for corresponding button
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Keep a track of wheather the game has started or not
var started= false;
var level=1;  // initial level


function nextSequence(){   // Very imp: Produce next random sequence
    $("#level-title").text("level "+level); // before generating random color, print the previous level

    //empty the user input array after generating each random color 
    userClickedPattern=[];

    //Random number generator
    var num= Math.random();
    num*=4;
    num=Math.floor(num);
    var randomChosenColour= buttonColours[num]; //random color
    gamePattern.push(randomChosenColour);  //push the random color in game pattern sequence array

    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // apply the blinking animation to let the user know which color is genereated
    playSound(randomChosenColour); // also play the corresponding sound for better understanding of user 

    level++; //update the level but dont print it
}

//animation effect of button press which last for 100 ms. (for user)
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100); 
}

var i=0; // we will compare the (i)th index of 2 array & update it 

// function which compare the (index)th index of 2 array & return bool
function checkAnswer(index){
    if(gamePattern[index]===userClickedPattern[index]){
        return true;
    }
    else{
        return false;
    }
}

// On button click, we will figure which button is clicked, animate the button, push corresponding color to userArray check that wheather correct button is pressed or not
$(".btn").click(function(event){  // we cant target "button" as it is neither a tag, or class or id.
    var userChosenColour= $(this).attr("id");  //read
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);

    if(checkAnswer(i)===true){ // if correct button is pressed.
        playSound(userChosenColour);  //play the corresponding sound, update to the next index o comapre again
        i++;
        if(i===gamePattern.length){  // if all the elements are compared, time to go for the next level.
            setTimeout(function () {  // call nextSequene fn after 1000 ms, clear the userArray, generate random color, 
                                      //push it to gamePattern & then again start comparing on button press from the begining
                nextSequence(); 
            }, 1000);
            i=0; // update i to 0 to start compraing from begining on btn press
        }
    }
    else if(checkAnswer(i)===false){   // if pressed button is wrong, paly wrong sound, run gameOver animation for 300 ms
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);
        
        $("#level-title").text("Press Start to play"); // update the text, for restarting the game. Back to initial state
        //update these paremeters for fresh start
        $(".start").addClass("show");
        $(".start").removeClass("hide");
        started=false;   
        gamePattern=[];
        i=0;
        level=1;
    }
});

$(".start").click(function(){ // This function will trigger the nextSequence only once (during the initial starting of game) {for this, we had used "started"}
    if(started===false){
        started=true;
        $(".start").removeClass("show");
        $(".start").addClass("hide");
        nextSequence();
    }
});

// ===========================================  Thanking You, I had tried my best to make this code as simple as I can. ================================================
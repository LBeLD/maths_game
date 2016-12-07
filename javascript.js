var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;

//click start/reset

document.getElementById("startReset").onclick=function (){//if we are playing 
    if(playing == true){
        
        location.reload(); //reload the page
        
    }else {     //if we are not playing 
        //change mode to play
        playing = true;
        //set score to 0
        score=0;
        document.getElementById("scoreValue").innerHTML = score;
        
        //show countdown box
     
        show("timeRemaining");
        
        timeRemaining = 60;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        
        //hide Game over message
        
        hide("gameOver");
        
        //change button to Reset
        document.getElementById("startReset").innerHTML = "  Reset Game";    
        
        //start countdown
        
        startCountdown ();
        
        // genetate Q/A
        
        generateQA();
    }
    
}

// Clickin Answer box
for (i=1; i<5; i++){
    document.getElementById("box"+i).onclick=function (){
    //check if we are playing
    if(playing == true) { //yes
        if((this.innerHTML == correctAnswer)){
            //correct answer
            
            //increase score
            score++;
        document.getElementById("scoreValue").innerHTML = score;
            //hide wrong box and show correct box
            
        hide("wrong");
        show("correct");
        setTimeout(function(){
            hide("correct");       
        }, 1000); 
            
            //generate QA
            
            generateQA();
            
        }else {
            // wrong answer
        hide("correct");
        show("wrong");
        setTimeout(function(){
            hide("wrong");       
        }, 1000);
        }
    }
}
}

//if we click answer box
    //if we are playing
        //corect answer?
            //yes
                //increase score by one
                //show correct box for 1sec
                //generate new Q/A
            //no
                //show try again box for 1 sec




// FUNCTIONS:

//Start Counter

function startCountdown () {
    action = setInterval(function(){
    timeRemaining -= 1;
        
document.getElementById("timeRemainingValue").innerHTML = timeRemaining; 
        
    if (timeRemaining==0) {//game over
        stopCountdow();
        
       show ("gameOver");
        document.getElementById("gameOver").innerHTML = "<p>game over</p><p>your score is: " + score + "</p>";
       
        hide("timeRemaining");
        hide("correct");
        hide("wrong");
        playing = false;
        
        document.getElementById("startReset").innerHTML = "Start Game";
    }
    },1000);
    
}


// Stop Counter
function stopCountdow () {
    clearInterval(action);
}

//Hide Elements
function hide (Id) {
    document.getElementById(Id).style.display = "none";
}

// Show Elements
function show (Id) {
    document.getElementById(Id).style.display = "block";
}

// Generate QA

function generateQA () {
    var x = 1 + Math.round(9*Math.random()); 
    var y = 1 + Math.round(9*Math.random()); 
    correctAnswer = x*y;
    
    document.getElementById("question").innerHTML = x + "x" + y;
    
    var correctPosition = 1 + Math.round(3*Math.random()); 
    
    //fill one box with correct answer
    
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
    
    //fill other boxes with wrong answers
    
    var answers = [correctAnswer];
    
    for (i=1; i<5; i++) {
        if (i != correctPosition){
            var wrongAnswer; 
            
            do {
                
               wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random())); //a wrong answer 
            
            }while (answers.indexOf(wrongAnswer)>-1) 
            
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            
            answers.push(wrongAnswer);
        }
    }
}
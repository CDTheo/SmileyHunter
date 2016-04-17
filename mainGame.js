//Face array that saves all the faces that the user has found 
var faceArray = [];
//The variable below holds the face identification number that the user needs to click on to progress to the next level.
var happyFaceNo;
//Variable to keep count of the current number of rounds the user has played 
var roundCount = 1; 
//Sets the maximum number of rounds per game.
var maxRound = 10; 
//Timer will always begin at 1000 and reduce by 10 every second. 
//setting inital timer value 
var count = 1000; 
//In the next line, setInteral will be triggered. setInterval is a function that take 2 arguments, one function and a integer that represents the milliseconds for the interval period. Every interval period, the function in the arguement will be called.
var counter = setInterval(timer, 1000);
//varaible to hold the score with the inital value of 0
var score = 0;
//missing and hitting the wrong face will increase this variable 
var missCount = 0;

//Constructor that will store data on each game that the user plays 
//This includes: The Score, the day, the month and year. The time of completion is dependant on the score, therefore using the score we can figure out how long it took for the player to complete 50 rounds for more analysis of the user
function NewScore(finalScore, day, month, year){
    this.score = finalScore; 
    this.day = day; 
    this.month = month; 
    this.year = year;
}


//test to generate an image;
$(document).ready(function(){
    generate16();
    $(document).on('click', 'img', function(){
        //When the user clicks on the target and the number of rounds has not reached the maximum value, then update the template
        if((event.target.id === "target")&&(roundCount < maxRound))
            {
                //Update the faceArray
                UpdateFaceArray();
                scoreUpdate();
                trigTimer();
                $('#imageScreen').empty();
                //var date = new Date();
                //var newScore = new NewScore(score, date.getDate(), date.getMonth(), date.getYear()); 
                generate16();
                
            }else if ((event.target.id === "target")&&(roundCount = maxRound)){
                    //Update the faceArray
                    UpdateFaceArray();
                    //Update the number of misses the user has made
                    updateMiss();
                    //update the number of games the user has played
                    UpdateTotalGames();
                   //overwise display's the user's score, their performance this game as well as the previous high scores. 
                    scoreUpdate();
                    updateArrays();
                    window.location.href = "highScore.html";
            }else if(event.target.id === "nonTarget"){
                missCount++;
            }
    });
});


var generateFour = function(){
    var happyPos = Math.floor(Math.random()*4+1);
    var n;
    for (n = 1; n < 5; n++){
    if(n == happyPos){
            happyFaceNo = Math.floor(Math.random()*52+1); 
        //after getting the number we will get the and append the happy face 
            var $happyImage = $('<img class = "imagefour" id = "target" src = "/Happy_direct/' + happyFaceNo + '.jpg"/>');
            $happyImage.appendTo('#imageScreen');
        }else{
            var randomNo = Math.floor(Math.random()*55 + 1);
            var $unhappyImage = $('<img class = "imagefour" src = "/Afraid_averted/' + randomNo +'.jpg"/>');
            $unhappyImage.appendTo('#imageScreen');
        }
    }
}

var generate16 = function(){
     var happyPos = Math.floor(Math.random()*16+1);
    var n;
    for (n = 1; n < 17; n++){
    if(n == happyPos){
            happyFaceNo = Math.floor(Math.random()*52+1); 
        //after getting the number we will get the and append the happy face 
            var $happyImage = $('<img class = "imagesixteen" id = "target" src = "http://cdtheo.github.io/SmileyHunter/Happy_direct/' + happyFaceNo + '.jpg"/>');
        //file:///C:/Users/CDTheo/Documents/Work/Apps%20Development/code/Happy_direct/'
            $happyImage.appendTo('#imageScreen');
        }else{
            var randomNo = Math.floor(Math.random()*55 + 1);
            var $unhappyImage = $('<img class = "imagesixteen" id = "nonTarget" src = "http://cdtheo.github.io/SmileyHunter/Afraid_averted/' + randomNo +'.jpg"/>');
            $unhappyImage.appendTo('#imageScreen');
        }
    }
}
//triggeringTimer function code
function trigTimer(){
    clearInterval(counter);
    count = 1010; 
    counter = setInterval(timer, 1000);
}
//Now we decalre the function that will simulate the count down
function timer(){
    //reduce the count by 10 
    count = count - 10;
    //update the div in the html document with the new count
    document.getElementById('timeDisplay').innerHTML = count;
    //if the count reaches 0 then clear the interval to prevent it going into negatives.
    if (count <= 0){
        clearInterval(counter);
        return;
    }
}

//function to update the score 
function scoreUpdate(){
    console.log(count);
    score = score + count;
    document.getElementById('scoreDisplay').innerHTML = "Score: " + score;
    //update the round number and the text
    roundCount++;
    document.getElementById('roundText').innerHTML = "Round " + roundCount;
}

//create a function to store the newScore into the array inside the localStorage. Also storing it into the top 10 array score. 
function updateArrays(){
    if(localStorage.getItem("setup") == undefined){
        //If setup is undefined then, that means there is no score array maybe due to the user running out of the space or first time playing the game app. 
        //If this is true, then set up 3 things. The setup varaible, the score array and the top 10 high score array
        var date = new Date();
        var highScoreArray = [];
        var ScoreArray = [];
        newScore =  new NewScore(score, date.getDate(), date.getMonth(), date.getFullYear()); 
        highScoreArray[0] = newScore;
        ScoreArray[0] = newScore;
        localStorage.setItem("setup", 1);
        localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));
        localStorage.setItem("ScoreArray", JSON.stringify(ScoreArray));
        localStorage.setItem("previousScore", (newScore.score).toString());
    }else{ 
        //Else if the setup is complete then just update the arrays by taking them out of the localStorage and JSON parsing it. 
        var date = new Date();
        var newTopTen = [];
        var topTen = JSON.parse(localStorage.getItem("highScoreArray"));
        var scores = JSON.parse(localStorage.getItem("ScoreArray"));
        var newScore = new NewScore(score, date.getDate(), date.getMonth(), date.getFullYear());
        var newScorePushed = false; 
        //Only insert it into the topTen if its larger than one of the top ten scores. 
        for(var n = 0; n < topTen.length; n++){
            if (newScore.score >= topTen[n].score){
                //if the new score is greater than a score inside the array 
                //then push the new score into newTopTen and the rest of the list into it.
                newTopTen.push(newScore);
                //set the newScorePushed to true
                newScorePushed = true; 
                //Then while the newTopTen hasn't reached the 10 scores yet, keep pushing the elements into it until 
                //Either it reaches 10, or until it reaches the last element in the old topTen array 
                var whileCounter = 0;
                while((newTopTen.length < 10) && (whileCounter <= topTen.length - (n+1))){
                    //push the remaining elements into the array
                    newTopTen.push(topTen[n+whileCounter]);
                    whileCounter++;
                }
                //after this, the new highScore should be updated therefore we break the loop 
                break;
            }  
            newTopTen.push(topTen[n]);
            if((newTopTen.length < 10)&&(newScorePushed === false)){
                newTopTen.push(newScore);
            }
        }
        scores.push(newScore);
        localStorage.setItem("highScoreArray", JSON.stringify(newTopTen));
        localStorage.setItem("ScoreArray", JSON.stringify(scores));
        localStorage.setItem("previousScore", (newScore.score).toString());
    }
}
function UpdateFaceArray(){
    //If the face array is not full, then check if the user has already found the face
    var faceFound = false; 
    //First pull the newest version of the faceArray from the localStorage
    faceArray = JSON.parse(localStorage.getItem("faceArray"));
    //check if the faceArray is already full with 52 faces 
    if(faceArray === null){
        faceArray = [];
        faceArray.push(happyFaceNo);
        //Then update the localStorage
        localStorage.setItem("faceArray", JSON.stringify(faceArray));
    }else{
        if(faceArray.length < 52){

            for(var n = 0; n < faceArray.length; n++){
                if(faceArray[n] == happyFaceNo){
                    //Set the faceFound to be true
                    faceFound = true;
                    //Then break the loop as there is no longer any meaning to continuing looping
                    break;
                }
            }
        }
        if(faceFound == false){
            //if false then add the new happyFaceNo into the array
            faceArray.push(happyFaceNo);
            //Then update the localStorage
            localStorage.setItem("faceArray", JSON.stringify(faceArray));
        }
    }
    //Once the loop is broken, check if the face if found, if no, then add the face to the array. 
} 

function updateMiss(){
    var totalMiss = JSON.parse(localStorage.getItem("totalMisses"));
    if (totalMiss === null){
        totalMiss = missCount; 
        localStorage.setItem("totalMisses", JSON.stringify(totalMiss));
    }else{
        totalMiss = totalMiss + missCount;
        localStorage.setItem("totalMisses", JSON.stringify(totalMiss));
    }
}

function UpdateTotalGames(){
    var totalGames = JSON.parse(localStorage.getItem("totalGames"));
    if(totalGames === null){
        totalGames = 1;
        localStorage.setItem("totalGames", JSON.stringify(totalGames));
    }else{
        totalGames++;
        localStorage.setItem("totalGames", JSON.stringify(totalGames));
    }
}


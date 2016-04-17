//At the start we will display all the information using jQuery 
$(document).ready(function(){
    //Check if the user has played a game yet 
    var totalGames = JSON.parse(localStorage.getItem("totalGames"));
    if (totalGames === null){
        //If the user hasn't played anygames then output zeros everywhere
        var $avgScore = $('<p class = "statText">' + 0 + '</p>');
        $avgScore.appendTo('#textData1');
        var $totalTime = $('<p class = "statText">' + '00:00' + '</p>');
        $totalTime.appendTo('#textData2');
        //Apart from Accuaracy since they user has yet to play 
        var $accuracy = $('<p class = "statText">' + 100 + '%' +'</p>');
        $accuracy.appendTo('#textData3')
    }else{
        //if the user has not only played for the first time then output the data correctly
        displayTextStats();
    }
});



function displayTextStats(){
    //first statistic to output is the all time average Score
    var totalScore = 0;
    var scoreArray = JSON.parse(localStorage.getItem("ScoreArray"));
    for (n = 0; n < scoreArray.length; n++){
        totalScore = totalScore + scoreArray[n].score;
    }
    //now that we have the total score we need then devide by the number of games we have played
    var totalGames = JSON.parse(localStorage.getItem("totalGames"));
    var averageScore = totalScore / totalGames; 
    var $avgScore = $('<p class = "statText">' + averageScore + '</p>');
    $avgScore.appendTo('#textData1');

    //next we will use the compiled information to find the total game time
    var gameTimeSec = ((totalGames * 10000) - totalScore)/10;
    //then we convert to minutes
    var gameTimeMin = Math.floor(gameTimeSec/60); 
    //Then we find out the remaining number of seconds 
    gameTimeSec = gameTimeSec % 60;
    //Now we display the total play time
    var $totalTime = $('<p class = "statText">' + gameTimeMin + ':' + gameTimeSec + '</p>');
    $totalTime.appendTo('#textData2');
    
    //Finally we work out the accuracy of the user
    var totalMisses = JSON.parse(localStorage.getItem("totalMisses"));
    var accuracy = 100 - (totalMisses / (totalGames*50));
    //now we display the accuracy
    var $accuracy = $('<p class = "statText">' + accuracy + '%' +'</p>');
    $accuracy.appendTo('#textData3');
    
    var progression = ((averageScore/10000)*50 + (accuracy/100)*50)
    //Before we end, we need to create the hunter-o-meter bar
    var $innerMeter = $('<div id = "innerMeter" style = "width:'+ progression +'%;"></div>');
    $innerMeter.appendTo('#outerMeter');
}



/*
 var $preScore = $('<p class = "scoreText">' + previousScore + '</p>');
        $preScore.appendTo('#preScore');
*/
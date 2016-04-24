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
        chartLoad();
        
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
    var averageScore = (totalScore / totalGames).toFixed(2); 
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
    var accuracy = (100 - (totalMisses / (totalGames*50))).toFixed(2);
    //now we display the accuracy
    var $accuracy = $('<p class = "statText">' + accuracy + '%' +'</p>');
    $accuracy.appendTo('#textData3');
    
    var progression = ((averageScore/10000)*50 + (accuracy/100)*50);
    //Before we end, we need to create the hunter-o-meter bar
    var $innerMeter = $('<div id = "innerMeter" style = "width:'+ progression +'%;"></div>');
    $innerMeter.appendTo('#outerMeter');
}


//setting up the chart 
function chartLoad(){
    //Get the number of game per month the user has played 
    var ScoreArray = JSON.parse(localStorage.getItem("ScoreArray"));
    //Each index of this array will represent each month. 0 - January, 1 - February.. So on.
    var monthCountArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //Below we will begin populating the monthCountArray
    for (var n = 0; n < ScoreArray.length; n++){
        monthCountArray[ScoreArray[n].month]++;
    }
    //Now all 0 to 11 elements should be filled with numbers inside. 
    
    
    //Next we need to find the Average Score of each month. 
    var avgScoreArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //Populate the score array
    for(var n = 0; n< ScoreArray.length; n++){
            avgScoreArray[ScoreArray[n].month] = avgScoreArray[ScoreArray[n].month] + ScoreArray[n].score;
    }
    
    //The avgScoreArray is now populated with the accumulated scores of each month. We need to divide each index with the number of games played to get the average for each month
    for(var n = 0; n<avgScoreArray.length; n++){
        if(avgScoreArray[n] > 0){
            avgScoreArray[n] = Math.floor(avgScoreArray[n] / monthCountArray[n]);
            avgScoreArray[n] = (avgScoreArray[n]/1000).toFixed(2);
        }
    }
    
    var ctx = document.getElementById("myChart").getContext("2d");
    var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
        {
            label: "No. Games",
            fillColor: "rgba(225,69,0,0.2)",
            strokeColor: "rgba(225,69,0,1)",
            pointColor: "rgba(220,69,0,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [monthCountArray[0],monthCountArray[1],monthCountArray[2],monthCountArray[3],monthCountArray[4],monthCountArray[5],monthCountArray[6],monthCountArray[7],monthCountArray[8],monthCountArray[9],monthCountArray[10],monthCountArray[11]]
        },
        {
            label: "Average Score",
            fillColor: "rgba(151,187, 205,0.2)",
            strokeColor: "rgba(0,186,255,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [avgScoreArray[0], avgScoreArray[1], avgScoreArray[2], avgScoreArray[3], avgScoreArray[4], avgScoreArray[5], avgScoreArray[6], avgScoreArray[7], avgScoreArray[8], avgScoreArray[9], avgScoreArray[10], avgScoreArray[11]]
        }
    ]
    };
    var options = {};
    var myLineChart = new Chart(ctx).Line(data,options);
}
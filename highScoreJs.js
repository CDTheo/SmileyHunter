var topTen = JSON.parse(localStorage.getItem("highScoreArray"));
var previousScore = localStorage.getItem("previousScore");
$(document).ready(function(){
    for(n = 0; n < topTen.length; n++){
        var $Score = $('<p class = "scoreText">' + topTen[n].score + '</p>');
        $Score.appendTo('#ScoreC');
        var $Date = $('<p class = "scoreText">' + topTen[n].day + '/' + (topTen[n].month+1) + '/' + topTen[n].year + '<p>');
        $Date.appendTo('#DateC');
    }
    var $preScore = $('<p class = "scoreText">' + previousScore + '</p>');
        $preScore.appendTo('#preScore');
});




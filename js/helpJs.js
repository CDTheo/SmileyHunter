//count will reference the image that should be displayed on the help page
var count = 1;
$(document).ready(function(){
    var $initalImage = $('<img class = "image" src = "../assets/screenShots_v1/' + count +'.png"/>');
    $initalImage.appendTo('#screenshot');
    
    document.getElementById('textpt1').innerHTML = textChange();
        
        /*
        "At the menu page you can access the entire game's functionality such as: <br><br> Play: To dive into the realm of smiley hunting. <br> Gallery: To see your Trophy collection. <br> Achievements: Access your special smiley hunting analysis and feedback <br> High Score: To see your all time records";
        */
     $(document).on('click', '#rightbtn', function(){
         if(count !== 5){
            count++;
           $('#screenshot').empty();
           var $Image = $('<img class = "image" src = "../assets/screenShots_v1/' + count +'.png"/>');
         $Image.appendTo('#screenshot');
          document.getElementById('textpt1').innerHTML = textChange();
         }
       
     });
    
     $(document).on('click', '#leftbtn', function(){
         if(count !== 1){
              count--;
           $('#screenshot').empty();
         var $Image = $('<img class = "image" src = "../assets/screenShots_v1/' + count +'.png"/>');
         $Image.appendTo('#screenshot');
          document.getElementById('textpt1').innerHTML = textChange();
         }
        
     });
});


function textChange(){
    var text; 
    switch(count){
        case 1: 
            text = "At the menu page you can access the entire game's functionality such as: <br><br> Play: To dive into the smiley hunting ground. <br> Gallery: To see your Trophy collection. <br> Achievements: Access your special smiley hunting analysis and feedback <br> High Score: To see your all time records";
            return text;
            break; 
        case 2: 
            text = "Once you enter the smiley hunting grounds, you will notice on the top right there will be a number counting down from 100. This is the score you will achieve once you find the smiley. The quicker you find the smiley, the more points you get per a round.<br> There is a total of 20 rounds and your sole aim is to locate the happy smiley and push the face. <br> If you happen to push any face other than the smiley, then you will lose 10 points from the count down.<br>On the top right is the total score you have acculumated so far";
            return text;
            break; 
        case 3: 
            text = "In the Happy gallery is where you can see your trophy cabinet. In here you see the display of all the smiley faces you have found so far. <br>There is a total of 52 happy smilies. Collect them all!";
            return text;
            break;
        case 4: 
            text = "Welcome to the Stats and Achievements where you can observe intricate and detailed feedback of your smiley hunting accomplishments. <br><br>First is the Smiley Huntero-Meter, this guage is a measure of how profficient at smiley hunter you are. <br> Below the bar are a few statistics. Your all time avrage score, your accumulated play time inside the Hunting grounds and your all time accuracy of smiley hunting. <br><br> Below all this is the Smiley Hunting graph. The plots indicate how many games you have played per month and your average score of that month so you can check your progression to be a smiley hunting master."
            return text;
            break;
        case 5: 
            text = "On the High Score page you can check your highest scores you have ever achieved in all its glory. You can also see your previous score that you obtained from your last game."
        default:
            text = "At the menu page you can access the entire game's functionality such as: <br><br> Play: To dive into the smiley hunting ground. <br> Gallery: To see your Trophy collection. <br> Achievements: Access your special smiley hunting analysis and feedback <br> High Score: To see your all time records";
            return text;
            break;
    }
}
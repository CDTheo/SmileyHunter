var faceArray = JSON.parse(localStorage.getItem("faceArray"));
var clearedArray = [];
//first filled the clearedArray with 52 0's
for(var n = 0; n < 52; n++){
    clearedArray[n] = 0;
}
//Once the clearedArray has been filled with zeros, we now go through the face Array to check which ones have been found to be marked intside the clearedArray
for(var n = 0; n < faceArray.length; n++){
    //becuase an array is indexed from zero, and the image ID's are indexed from 0 we need to minus 1; 
    clearedArray[faceArray[n]-1] = 1;
}
//After the previous for loop, there should be 1 marked for all the images that the user has found
//Then we populate the gallery with all the imaages found using jquery and append the images to the body.
$(document).ready(function(){
    //output 52 images 
    for(var n =0; n < 52; n++){
        if(clearedArray[n] == 1){
            //If this image has been found then generate and append it to the imageBox div 
            var $happyImage = $('<img class = "image" src = "../assets/Happy_direct/' + (n+1) + '.jpg"/>');
            $happyImage.appendTo('#imageBox');
        }else{
            //overwise we just fill the space with a black box
            var $blackBox = $('<img class = "image" src = "../assets/Happy_direct/' + 53 + '.jpg"/>');
            $blackBox.appendTo('#imageBox');
        }
    }
});


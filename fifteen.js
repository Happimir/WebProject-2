/*jslint browser: true*/
/*global $, jQuery, alert*/

// global puzzle 2D array to hold divs
var puzzle = [ [], [], [], [] ];

window.onload = function () {
        var name;

    //gets all children of puzzleArea with a div tag in an array
    var children = document.getElementById("puzzleArea").getElementsByTagName("DIV");

    // variables to track x and y position in array and image offset
    var x = 0;
    var y = 0;
    var i = 0;

    // array will add children to 2D array. Will iterate across each column before going to the next row
    for( y = 0; y < 4; y++){
        for( x = 0; x < 4; x++){
            // ensures it doesn't add 16th div that doesn't exist
            if( i < children.length ) {
                // adds current child div to 2d array
                puzzle[x].push(children[i]);

                // sets styling for the child div
                children[i].style.margin = "0";
                children[i].style.float = "left";
                children[i].style.backgroundImage = "url(background.jpg)";
                children[i].style.backgroundPosition = "-100px -100px"//x*-100 + "px " + y*-100 + "px";
                children[i].style.width = "100px";
                children[i].style.height = "100px";

                // iterates to next child div
                i++;
            }
        }
    }

    //iterates through all children
    /*for(child in children){
        //if children is a div then we do something to it
        if(children[child].nodeName=="DIV") {
             //add a class that corresponds to a css to the current div child that we are on
             children[child].classList.add('a'+i);
             i = i + 1;

            puzzle
        }
    }*/
};
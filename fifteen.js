/*jslint browser: true*/
/*global $, jQuery, alert*/

window.onload = function () {
    var name;
    var i = 1;

//gets all children of puzzlearea   
var children = document.getElementById("puzzlearea").childNodes;

//iterates through all children
for(child in children){
   
    //if children is a div then we do something to it
    if(children[child].nodeName=="DIV")
        {
            //add a class that corresponds to a css to the current div child that we are on
            children[child].classList.add('a'+i);  
            i = i + 1;
        }
}
};
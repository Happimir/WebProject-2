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
            document.getElementsByTagName('div')[i].setAttribute("id", "a" + i);
            i = i + 1;
        }
}

for(j = 1; j < 16; j++) {
    document.getElementById("a" + j).addEventListener("click", test);
}


    document.getElementById("a15").onmouseover = function () {

        alert(getOffset(this).top);
        this.style.left = "104px";
    };
};

function test() {
    alert(getOffset(this).left + " " + getOffset(this).top);
    //I think left is X position, while top is Y position.
}

function getOffset(el) {
    el = el.getBoundingClientRect();
    return {
        left: el.left + window.scrollX,
        top: el.top + window.scrollY
    }
}
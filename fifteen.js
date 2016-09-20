/*jslint browser: true*/
/*global $, jQuery, alert*/

// GLOBAL VARIABLES
var children;
var blankTile;
var topAdj;
var bottomAdj;
var leftAdj;
var rightAdj;

window.onload = function () {
    var i = 1;

    //gets all children of puzzlearea with a div tag
    children = document.getElementById("puzzlearea").getElementsByTagName("DIV");

    //iterates through all children
    var j,x,y;
    x = 0;
    y = 0;
    for(j = 0; j < children.length; j++){
        //add a class that corresponds to a css to the current div child that we are on
        children[j].id = "a"+i;
        i++;

        // add an event listener for click
        children[j].addEventListener("click", action);

        // adds absolute tag to all divs
        children[j].style.position = "absolute";

        // sets div's position
        children[j].style.left = x + "px";
        children[j].style.top = y + "px";

        // increments x and resets it if it is too high
        x += 104;
        if( x >= 416 ){
            x = 0;
        }
        //increments y if x number is reset to 0
        if( x == 0 ){
            y += 104;
        }
    }

    // sets the 16th div to be the blank tile
    blankTile = document.getElementById("a16");

    // will find tiles adjacent to the blank tile, and set their class property
    updateAdjacent();
};


function test() {
    // can put code here and set event listener for this function
    // if you want to test a behavior, or read a value at runtime

    /* ------ SHOULD BE DELETED BEFORE SUBMIT ------*/
}


/*
 * This function is called every time a tile is clicked on.
 * Every time an adjacent tile is clicked, it's position must
 * switched with the blank tile and the adjacent tile variables
 * must be updated.
**/
function action(){
    if( this.className == "adjacent" ){

        // current adjacent tile switches pos with blank tile
        switchTiles( this, blankTile );

        // removes old adj tile, and sets new adj tiles
        updateAdjacent();

        // checkWin();
    }
}

// will switch the positions of the two given tiles
function switchTiles( t1, t2 ){
    // will store tile 1's original position
    var x,y;

    // gets original position of tile 1
    x = t1.style.left;
    y = t1.style.top;

    // moves tile 1 to tile 2's position
    t1.style.left = t2.style.left;
    t1.style.top = t2.style.top;

    // moves tile 2 to tile 1's original position
    t2.style.left = x;
    t2.style.top = y;
}

/*
 * Will remove adjacent class from old adj tiles, and add the
 * adjacent class to new adj tiles
 */
function updateAdjacent(){
    // REMOVE OLD ADJACENT
    if( rightAdj != null ){ rightAdj.removeAttribute("class"); }
    if( leftAdj != null ){ leftAdj.removeAttribute("class"); }
    if( topAdj != null ){ topAdj.removeAttribute("class"); }
    if( bottomAdj != null ){ bottomAdj.removeAttribute("class"); }


    // FIND NEW ADJACENT
    var x = getX(blankTile);
    var y = getY(blankTile);

    // find tile to right
    if( x + 104 <= 312 ){
        rightAdj = getTileAt(x+104, y);
        rightAdj.className = "adjacent";
    }else{ // if tile is out of bounds
        rightAdj = null;
    }

    // find tile to left
    if( x - 104 >= 0 ){
        leftAdj = getTileAt(x-104,y);
        leftAdj.className = "adjacent";
    }else{ // if tile is out of bounds
        leftAdj = null;
    }

    // find tile below
    if( y + 104 <= 312 ){
        bottomAdj = getTileAt(x,y+104);
        bottomAdj.className = "adjacent";
    }else{ // if tile is out of bounds
        bottomAdj = null;
    }

    // find tile above
    if( y - 104 >= 0 ){
        topAdj = getTileAt(x,y-104);
        topAdj.className = "adjacent";
    }else{ // if tile is out of bounds
        topAdj = null;
    }
}

/*
 * will make a number of legal moves to 'shuffle' the board
 */
function shuffle(){

}

/*
 * Will return true if pieces are in original order
 */
function checkWin(){

}

/*
 * will return a reference to the div who's x and y pos match given x and y
 */
function getTileAt( x, y ){
    var target = null;
    // loops through all children
    for( i = 0; i <= children.length; i++ ){
        if( getX(children[i]) == x && getY(children[i]) == y ){
            target = children[i];
            break;
        }
    }
    return target;
}

/*
 * Parses given object's left value and returns a float
 */
function getX(obj) {
    return parseFloat(obj.style.left);
}

/*
 * Parses given object's top value and returns a float
 */
function getY(obj) {
    return parseFloat(obj.style.top);
}
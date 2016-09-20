/*jslint browser: true*/
/*global $, jQuery, alert*/
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

    blankTile = document.getElementById("a16");

    updateAdjacent(blankTile);

    // initializes the adjacent variables
    /*document.getElementById("a12").className = "adjacent";
    document.getElementById("a15").className = "adjacent";//*/
};


function test() {
    alert()
    //alert(getOffset(this).left + " " + getOffset(this).top);
    //I think left is X position, while top is Y position.
}


// This function is called whenever a tile is clicked on
function action(){
    if( this.className == "adjacent" ){
        /*var dir = null;

        // checks for which adjacent tile this is
        if( this == leftAdj ){ dir = "right"; }

        if(this == rightAdj ){ dir = "left"; }

        if(this == topAdj ){ dir = "down"; }

        if(this == bottomAdj ){ dir = "up"; }

        if( dir != null ){ moveTile(this, dir); }*/

        var x1,x2,y1,y2;

        // gets top and left styles of both tiles
        x1 = this.style.left;
        y1 = this.style.top;
        x2 = blankTile.style.left;
        y2 = blankTile.style.top;

        // switches the top and left styles of the two tiles
        this.style.left = x2;
        this.style.top = y2;
        blankTile.style.left = x1;
        blankTile.style.top = y1;

        updateAdjacent(blankTile);
    }
}

// will return an array of the tiles adjacent to the given tile
function updateAdjacent(obj){
    // REMOVE OLD ADJACENT
    if( rightAdj != null ){ rightAdj.removeAttribute("class"); }
    if( leftAdj != null ){ leftAdj.removeAttribute("class"); }
    if( topAdj != null ){ topAdj.removeAttribute("class"); }
    if( bottomAdj != null ){ bottomAdj.removeAttribute("class"); }


    // FIND NEW ADJACENT
    var x = getX(obj);
    var y = getY(obj);

    // find tile to right (in bounds)
    if( x + 104 <= 312 ){
        rightAdj = getTileAt(x+104, y);
        rightAdj.className = "adjacent";
    }else{
        rightAdj = null;
    }

    // find tile to left (in bounds)
    if( x - 104 >= 0 ){
        leftAdj = getTileAt(x-104,y);
        leftAdj.className = "adjacent";
    }else{
        leftAdj = null;
    }

    // find tile below (in bounds)
    if( y + 104 <= 312 ){
        bottomAdj = getTileAt(x,y+104);
        bottomAdj.className = "adjacent";
    }else{
        bottomAdj = null;
    }

    // find tile above (in bounds)
    if( y - 104 >= 0 ){
        topAdj = getTileAt(x,y-104);
        topAdj.className = "adjacent";
    }else{
        topAdj = null;
    }
}

// this function will move the given obj(tile) one block in the given direction
function moveTile( obj, dir ){
    switch( dir ){
        case "up":
            obj.style.top = parseFloat(obj.style.top) - 104 + "px";
            break;
        case "down":
            this.style.top = parseFloat(obj.style.top) + 104 + "px";
            break;
        case "left":
            obj.style.left = parseFloat(obj.style.left) - 104 + "px";
            break;
        case "right":
            obj.style.left = parseFloat(obj.style.left) + 104 + "px";
            break;
    }
}

// will return the tile with the top and left coordinates matching x and y
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

// returns the float of the object's left style
function getX(obj) {
    return parseFloat(obj.style.left);
}

// returns the float of the object's top style
function getY(obj) {
    return parseFloat(obj.style.top);
}

function getOffset(el) {
    el = el.getBoundingClientRect();
    return {
        left: el.left + window.scrollX,
        top: el.top + window.scrollY
    }
}
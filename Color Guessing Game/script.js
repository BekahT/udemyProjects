// Selectors
var squares = document.querySelectorAll(".square");
var rgb = document.querySelector("#rgb");
var messageDisplay = document.querySelector("#message");

//Generate 6 Random Colors
var colors = generateRandomColors(6);

var pickedColor = pickColor();

// Assign the goal color to the title
rgb.textContent = pickedColor;

for (var i = 0; i < squares.length; i++) {
    // Assign colors to squares
    squares[i].style.backgroundColor = colors[i];

    // Add click event listenrs to squares
    squares[i].addEventListener("click", function(){
        // Get selected square color
        var clickedColor = this.style.backgroundColor;
        // Compare clickedColor to pickedColor
        if(clickedColor === pickedColor){
            messageDisplay.textContent = "Correct!";
            changeColors(clickedColor);
        } else {
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again";
        }
    });
};

function changeColors(color){
    //Loop through all squares
    for (var i = 0; i < squares.length; i++) {
        // Change each square to passed color
        squares[i].style.backgroundColor = color;
}
};

// Pick random color as the pickedColor
function pickColor(){
    //Random number between 0 and max array index
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
};

// Generate Random Colors array
function generateRandomColors(num){
    // Initialize empty array
    var arr = [];
    //Add random colors to array
    for (var i = 0; i < num; i++){
        arr.push(randomColor());
    }
    // Return final array
    return arr; 
};

// Generate Random Color
function randomColor(){
    // Pick a red value from 0-255
    var r = Math.floor(Math.random() * 256);
    // Pick a green value from 0-255
    var g = Math.floor(Math.random() * 256);
    // Pick a blue value from 0-255
    var b = Math.floor(Math.random() * 256);
    //Return values in RGB format
    return "rgb(" + r + ", " + g + ", " + b + ")";
};
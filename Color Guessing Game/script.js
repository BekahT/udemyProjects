// Selectors
var squares = document.querySelectorAll(".square");
var rgb = document.querySelector("#rgb");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

// Variables
var numSquares = 6;
var colors = generateRandomColors(numSquares);
var pickedColor = pickColor();

// Reset Button Event
resetButton.addEventListener("click", function(){
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    rgb.textContent = pickedColor;
    for (var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
    }
    h1.style.backgroundColor = "steelblue";
});

// Easy Button Event 
easyBtn.addEventListener("click", function(){
    hardBtn.classList.remove("selected");
    easyBtn.classList.add("selected");
    numSquares = 3;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    rgb.textContent = pickedColor;
    for (var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];            
        } else {
            squares[i].style.display = "none";
        }
    };
});

// Hard Button Event
hardBtn.addEventListener("click", function(){
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected");
    numSquares = 6;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    rgb.textContent = pickedColor;
    for (var i = 0; i < squares.length; i++){      
        squares[i].style.backgroundColor = colors[i];            
        squares[i].style.display = "block";        
    };
});

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
            h1.style.backgroundColor = clickedColor;
            resetButton.textContent = "Play Again?";
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
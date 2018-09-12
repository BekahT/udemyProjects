// Variables
var numSquares = 6;
var colors = [];
var pickedColor;

// Selectors
var squares = document.querySelectorAll(".square");
var rgb = document.querySelector("#rgb");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

// Initialize Page
init();

// Reset Button Event
resetButton.addEventListener("click", function(){
    reset();
});

function init(){
    setupModeButtons();
    setupSquares();
    reset();
};

// Change Game Mode Event
function setupModeButtons(){
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            //Use ternary operator instead of if/else
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    };
}

// Set up colored squares
function setupSquares(){
    for (var i = 0; i < squares.length; i++) {
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
}

// Reset the game
function reset(){
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    rgb.textContent = pickedColor;
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";
    for (var i = 0; i < squares.length; i++){
        squares[i].style.display = "block";
        squares[i].style.backgroundColor = colors[i];
        // Remove squares that are not used in selected mode
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
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
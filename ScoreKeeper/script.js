//Selectors
var p1Button = document.querySelector("#p1");
var p2Button = document.querySelector("#p2");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var winningScoreDisplay = document.querySelector("p span");
var resetButton = document.querySelector("#reset");
var numInput = document.querySelector("input");

//Variables
var p1Score = 0;
var p2Score = 0;
var maxScore = 5;
var gameOver = false;

//Change Event for Number Input Field
numInput.addEventListener("change", function(){
    winningScoreDisplay.textContent = this.value;
    maxScore = Number(this.value);
    reset();
});

//Click Event for Player 1 Button
p1Button.addEventListener("click",function(){
    if(!gameOver){
        p1Score++;
        //If Player 1 has won
        if(p1Score === maxScore){
            p1Display.classList.add("winner");
            gameOver = true;
        }
        p1Display.textContent = p1Score;
    }
});

//Click Event for Player 2 Button
p2Button.addEventListener("click",function(){
    if(!gameOver){
        p2Score++;
        //If Player 2 has won
        if(p2Score === maxScore){
            p2Display.classList.add("winner");
            gameOver = true;
        }
        p2Display.textContent = p2Score;
    }
});

//Click Event for Reset Button
resetButton.addEventListener("click", function(){
    reset();
});

//Reset Function
function reset(){
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = 0;
    p2Display.textContent = 0;
    p1Display.classList.remove("winner");
    p1Display.classList.remove("winner");
    gameOver = false;
};

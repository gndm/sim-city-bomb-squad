/*----- constants -----*/
const initialTime = 30;

/*----- app's state (variables) -----*/
//need var to store timer's countdown
let timeRemaining = 0;
//store our timer's setInterval so we can clear it 
let countdown = null;
//boolean for game over
let gameOver = false;
//kepp track of clicked wire
let wireState = {
    blue: false,
    green: false,
    red: false,
    white: false,
    yellow: false,
}
//array of wires that need to clicked to win the game
let wiresToCut = [];

/*----- cached element references -----*/
//event listeners on the wires
let wireboxEl = null;

// backdrop image

// timer
let timerEl = null;

// reset button
let resetButtonEl = null;

//used to countdown the clock
// I want this function to run every second
function updateClock() {
    console.log('countdown the timer!');
    // Decrement timeRemaining, if there is no time left, end the game
    timeRemaining --;
    if(timeRemaining <= 0){
        //end the game
        endGame(false);
        console.log('The game is over, the bomb exploded');
    }
    // Update clock text with the timeRemaining
    timerEl.textContent = "0:00:" + timeRemaining;
}

//runs to set up game state
function initializeGame(){
    // Reset all game state variables
    gameover = false;
    let wiresToCut = [];
    let wireState = {
        blue: false,
        green: false,
        red: false,
        white: false,
        yellow: false,
    }
    

    // set the remaining time variable
    timeRemaining = initialTime;

    // start the countdown interval
   countdown = setInterval(updateClock, 1000);// runs updateClock
   // Randomly select which wires need to be cut
   for(const color in wireState){
      let rand = Math.random();// gives us a random float between 0.0 and 1.0
    if(rand > 0.5){
        wiresToCut.push(color);
    }
  
  
    }
}

//handles reset button click
function resetGame() {
    // Update the gameOver state variable
    //gameOver = false;

    // Display the SimCity bg
    backgroundEl.style.backgroundImage = "url(img/simcity.jpg)";

    // Set the clock text back to red
    timerEl.style.color = "red";

    // Clear any intervals or timeouts
    clearInterval(countdown);


    // invoke initializeGame()
    initializeGame();

}

// function to cute wire and recognize the wire that was cut
//handles reset button click
function cutWire(event){
    let wireColor = event.target.id;
    // If the wire is cuttable, cut it, update game state variables and apply the appropriate cut-wire image
    if(!gameOver && wireState[wireColor] === false){
        //cut the wire
        console.log(event.target.src)
        //chnage the picture to the cut wire
        event.target.src = `img/cut-${wireColor}-wire.png`
        wireState[wireColor] = true;
        //did we cut a good wire or bad wire?
        if(wiresToCut.includes(wireColor)){
            // that was the correct wire
            // remove the wire from the wiresToCut
            wiresToCut.splice(wiresToCut.indexOf(wireColor), 1);
            if(wiresToCut === 0){
                endGame(true);
            }
        }else{
            //that was the wrong wire - end game
            endGame(false);
        }
    }


    // if it is a good cut, update state, if it is a bad cut, you lose the game
  
    // If there's no more wires that need to be cut - win the game


}

//handles game over state
function endGame(isGameWon){
    // Clear the countdown and update gameOver state variable
    clearInterval(countdown);
    gameOver = true;
    // If the passed in isGameWon argument is true, set the timer text to green
    // Otherwise, change the background image to the explosion
    
    if(isGameWon){
        timerEl.style.color = "green";//if we won, change text color to green
    }else{
        backgroundEl.style.backgroundImage = "url(img/explosion.jpg)";//but if we lost, change the background image to the exploded city 
    }

    


}
    console.log('End Game')


/*----- event listeners -----*/

document.addEventListener('DOMContentLoaded', function () {
    console.log('loaded!');
    //main element to manipulate background
    backgroundEl = document.querySelector('main');
    // countdown timer element
    timerEl = document.querySelector('#timer');
    console.log(timerEl);
    // reset button to reset the game 
    resetButtonEl = document.querySelector('#reset');
    resetButtonEl.addEventListener('click', resetGame);
    console.log(resetButtonEl);
    //wirebox and click event listener
    wireboxEl = document.querySelector('#wirebox');
    wireboxEl.addEventListener('click', cutWire);
    //each wire elemenet in an array
    wires = wireboxEl.children;
    //invoking game state
    initializeGame();
})
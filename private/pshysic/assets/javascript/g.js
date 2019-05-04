// array  of letters for the computer to chose from 
var letterBank = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]

var lettersGuessed = []

// variables starting value for tally counter
var wins = 0;
var losses = 0;
var guessesLeft = 6;


var compGuess = letterBank[Math.floor(Math.random() * letterBank.length)];


for (var i = 0; i <= guessesLeft; i++) {

  document.onkeyup = function(event) {
    // var for use of collecting key answers for both user and computer. 

    var userGuess = event.key;
    lettersGuessed.push(userGuess);

    // if statements to get a win or loss 
    if (userGuess === compGuess) {
      guessesLeft = 7;
      alert("You won!")
      compGuess = letterBank[Math.floor(Math.random() * letterBank.length)];
      userGuess = "";
      lettersGuessed = "";
      wins++;
    }

    if (userGuess != compGuess) {
      guessesLeft--;
    }
    
    if (guessesLeft === 0) {
      alert("GAME OVER");
      guessesLeft = 6;
      losses++;
      userGuess = "";

      compGuess = letterBank[Math.floor(Math.random() * letterBank.length)];
    }

    // variables to display a win/loss tally and the computer/user guesses    
    var html =
      "<p> your choice: " + userGuess + "</p>" +
      "<p> losses: " + losses + "</p>" +
      "<p> wins: " + wins + "</p>" +
      "<p> Guesses left: " + guessesLeft + "</p>" +
      "<p> Your Guesses so far:" + lettersGuessed + "</p>";

    // sends info collected from html var to the game div
    document.querySelector("#game").innerHTML = html;
  };

};
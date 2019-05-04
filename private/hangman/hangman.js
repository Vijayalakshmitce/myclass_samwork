// declare computer guessing words
var compChoice = ["cat", "tree", "mic", "red"];
var userGuess =[];
var computerGuess = compChoice[Math.floor(Math.random() * compChoice.length)];

// declare variable for win userguess reveal guesleft

var win =0;
var guessleft = 5;
var userguessReveal =[];
var guessWrong =[];



document.onkeyup = function (event){
    userGuess = [event.key];
document.getElementById("guessReveal").innertext=userguessReveal;
document.getElementById("user-text").innerText = document.getElementById("user-text").innerText+userGuess;
document.getElementById("win").innerText = win;
document.getElementById("guessReveal").innerText = userguessReveal;

if (computerGuess.indexOf(userGuess) > -1) {

    userguessReveal.push(userGuess)
    console.log("This is the reveal" + userguessReveal)
    //document.getElementById("guessReveal").innertext = userguessReveal;
    document.getElementById("guessReveal").innerText =  userguessReveal;

}
else{
    guessWrong.push(userGuess)
    console.log(""+guessWrong)
}

   

};   
    
    








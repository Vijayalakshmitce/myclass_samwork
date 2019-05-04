//alert for user
alert("Let's play!");


// var for computer and user

var userGuess;
var compChoice = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var computerGuess = compChoice[Math.floor(Math.random() * compChoice.length)];

//var for win,loss and guessleft
var win = 0;
var loss = 0;
var guessleft = 9;
var result = false;
var userguess;
var spchar = [".,/;:?>?<!@#$%^&*"];
//gettin user input
function mygame() {

    document.getElementById("win").innerText = win;
    document.getElementById("loss").innerText = loss;
    document.getElementById("left").innerText = guessleft;
}

document.onkeyup = function (event) {
    userGuess = event.key
    var special = [","]
    document.getElementById("user-text").innerText = document.getElementById("user-text").innerText + userGuess + special;
    
    if (computerGuess === userGuess) {
        computerGuess = compChoice[Math.floor(Math.random() * compChoice.length)];


        guessleft--;

        console.log("guessleft1" + guessleft)

        win++;

        result = true;
        console.log("win" + win)
        console.log("" + userGuess)
        document.getElementById("win").innerText = win;

        document.getElementById("left").innerText = guessleft;
        if (result === true) {
            guessleft = 9;

            document.getElementById("left").innerText = guessleft;
            document.getElementById("user-text").innerText = "";

         console.log("" + guessleft);

        }

    }
    else {

        guessleft--;
        console.log("guessleft2" + guessleft)
        console.log("loss" + loss)
        document.getElementById("left").innerText = guessleft;

    }

    if (guessleft === 0) {
        loss++;
        guessleft = 9;

        document.getElementById("loss").innerText = loss;
        document.getElementById("left").innerText = guessleft;
        document.getElementById("user-text").innerText = "";

        console.log("" + guessleft);

    }
// calling function for rolling word
function animateString(id){
    const headText = document.getElementById(id)
    const headNode = headText.childNodes[0];
    let text = headNode.data;

    setInterval(function(){
        text = text[text.length-1] + text.substring(0,text.length-1)
        headNode . data = text
        
    },100);
}

};







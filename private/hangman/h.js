// alert user
alert ("lets play")


// declare variable for computer guess,length

var compChoice = ["cat", "tree", "mic", "red", "mango", "tiger"];
var computerGuess = Math.floor(Math.random() * compChoice.length);
var answer = compChoice[computerGuess];
var mylength = answer.length;

var reveal = [''];

var guessLeft = 6;
var wrongGuess = [];
var pos;
var win =0;
var result = false;

document.onkeyup = function (event){
    userGuess = event.key;
    answer = compChoice[computerGuess];
    
document.getElementById("mylength").innerText = answer;

if(answer.indexOf (userGuess) > -1){
   
    
   
    pos=answer.indexOf(userGuess)
   for (var i=0;i<=answer.length+1;i++){
    
    
       reveal[pos]=userGuess;
   console.log(""+reveal)
   document.getElementById("reveal").innerText = reveal;
   
        console.log("This is the reveal" + reveal)
        
        
}
//guessLeft--;
//document.getElementById("guessleft").innerText = guessLeft;
}

else {
    guessLeft--;
        
        wrongGuess.push(userGuess)
        document.getElementById("wrongguess").innerText =  wrongGuess;
        document.getElementById("guessleft").innerText = guessLeft;
        
}




console.log("rea"+reveal)
console.log("NS"+answer.length)


if (guessLeft=== 0){
    guessLeft = 6;
    wrongGuess=[]
    reveal = answer;
    
 
    document.getElementById("wrongguess").innerText =  wrongGuess;
    document.getElementById("guessleft").innerText = guessLeft;
    document.getElementById("reveal").innerText = reveal;
    
    
    
   
}
if(reveal.join('') === answer) {  
    win++;
console.log(""+win)
  result = true


document.getElementById("win").innerText = win;





if (result === true){

    guessLeft = 6;
    wrongGuess=[]
    computerGuess = Math.floor(Math.random() * compChoice.length);
 answer = compChoice[computerGuess];
    reveal = []
    document.getElementById("wrongguess").innerText =  wrongGuess;
    document.getElementById("reveal").innerText = reveal;
    document.getElementById("mylength").innerText = answer;
    document.getElementById("guessleft").innerText = guessLeft;
    
    alert("lets play again")

}




}
//if((result === true)||(guessLeft===0)){
    //alert("lets play again")
//}

};

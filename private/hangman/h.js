// declare variable for computer guess,length

var compChoice = ["cat", "tree", "mic", "red"];
var computerGuess = Math.floor(Math.random() * compChoice.length);
var answer = compChoice[computerGuess];
var mylength = answer.length;
var reveal = [''];
var wrongGuess = [];
var pos;
var win =0;
document.onkeyup = function (event){
    userGuess = event.key;
    answer = compChoice[computerGuess];
    
document.getElementById("mylength").innerText = answer;





if(answer.indexOf (userGuess) > -1){
   pos=answer.indexOf(userGuess)
   for (var i=0;i<=answer.length;i++){
       reveal[pos]=userGuess;
   console.log(""+reveal)
   document.getElementById("reveal").innerText = reveal;
        console.log("This is the reveal" + reveal)
        
}
} 
else {
        
        wrongGuess.push(userGuess)
        document.getElementById("wrongguess").innerText =  wrongGuess;
        
        
}

console.log("j" +reveal.join(''))
console.log("rea"+reveal)
console.log("NS"+answer.length)

if(reveal.join('') === answer)) {  
        win++;
    console.log(""+win)
    document.getElementById("win").innerText = win;
    document.getElementById("wrongguess").innerText = "";
    document.getElementById("mylength").innerText = "";
    document.getElementById("reveal").innerText = "";
        
}

};
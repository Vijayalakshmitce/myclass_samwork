document.onkeyup = function(event){
    var userGuess;
    userGuess.push(event.key);
    var computerChoices=[" b","c","d","e","f","g","h","i","j","k","l","m","n","o"];
    var y=computerChoices;
    document.getElementById("user-text").innerText= document.getElementById("user-text").innerText + userGuess;
};
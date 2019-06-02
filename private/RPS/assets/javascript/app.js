/*
Requirements:
Only two users can play at the same time.
Both players pick either rock, paper or scissors. 
    After the players make their selection, the game will tell them whether a tie occurred or if one player defeated the other.
The game will track each player's wins and losses.
Users can chat with each other
*/

/// initialise firebase database
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDBDQz3E0PVI6GGRqHFkK5qYzdNYhOhRmY",
    authDomain: "rockpapperscissor-24fb8.firebaseapp.com",
    databaseURL: "https://rockpapperscissor-24fb8.firebaseio.com",
    projectId: "rockpapperscissor-24fb8",
    storageBucket: "rockpapperscissor-24fb8.appspot.com",
    messagingSenderId: "100188123968",
    appId: "1:100188123968:web:effd39a0378c9139"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var playersRef = database.ref("/players");


var player1LoggedIn = false;
var player2LoggedIn = false;
var playerNumber;
///capture submitbutton
$("#submitbtn").on("click", function (event) {
    event.preventDefault();
   
    if (!player1LoggedIn) {
        playerNumber = "1";
        player1LoggedIn = true;
    }else if (!player2LoggedIn) {
        playerNumber = "2";
        player2LoggedIn=true;
    }
    var playerName = $("#Userinput").val();
    console.log("playerName"+playerName);
    database.ref("/players/" + playerNumber).set(playerName);
    database.ref("/players/" + playerNumber).onDisconnect().remove();
    
    
})


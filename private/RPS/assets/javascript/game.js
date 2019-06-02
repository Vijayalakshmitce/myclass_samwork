/*
Requirements:

Only two users can play at the same time.

Both players pick either rock, paper or scissors. 
    After the players make their selection, the game will tell them whether a tie occurred or if one player defeated the other.

The game will track each player's wins and losses.

Users can chat with each other
*/

//#region Firebase init and vars

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB36zKLMLt3n5QT9I1KPmciKQ12d1CQ5KY",
    authDomain: "rock-paper-scissors-5f753.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-5f753.firebaseio.com",
    projectId: "rock-paper-scissors-5f753",
    storageBucket: "rock-paper-scissors-5f753.appspot.com",
    messagingSenderId: "11185586866"
};

firebase.initializeApp(config);

// database connection references
var db = firebase.database();
var playersRef = db.ref("/players");
var chatRef = db.ref("/chat");
var connectedRef = db.ref(".info/connected");

// global vars to keep track of all player data locally
var playerName,
    player1LoggedIn = false,
    player2LoggedIn = false,
    playerNumber,
    playerObject,
    player1Object = {
        name: "",
        choice: "",
        wins: 0,
        losses: 0
    },
    player2Object = {
        name: "",
        choice: "",
        wins: 0,
        losses: 0
    },
    resetId;
//#endregion

//#region Database functions

// handle lost connection
connectedRef.on("value", function (snap) {
    if (!snap.val() && playerNumber) {
        db.ref("/players/" + playerNumber).remove();
        playerNumber = null;

        // reset screen
        showLoginScreen();
    }
}, errorHandler);

// when a chat message is received, add it to the DOM
chatRef.on("child_added", function (chatSnap) {
    let chatObj = chatSnap.val();
    let chatText = chatObj.text;
    let chatLogItem = $("<li>").attr("id", chatSnap.key);

    // style the message based on who sent it
    if (chatObj.userId == "system") {
        chatLogItem.addClass("system");
    } else if (chatObj.userId == playerNumber) {
        chatLogItem.addClass("current-user");
    } else {
        chatLogItem.addClass("other-user");
    }

    // if a username exist, prepend it to teh chat text
    if (chatObj.name) {
        chatText = "<strong>" + chatObj.name + ":</strong> " + chatText;
    }

    chatLogItem.html(chatText);

    $("#chat-log").append(chatLogItem);

    // scroll to the bottom 
    $("#chat-log").scrollTop($("#chat-log")[0].scrollHeight);
}, errorHandler);

// if a chat message is removed, remove it from the DOM
chatRef.on("child_removed", function (chatSnap) {
    $("#" + chatSnap.key).remove();
}, errorHandler);

// when player is added, update respective loggedIn flag and playerObject
playersRef.on("child_added", function (childSnap) {
    window["player" + childSnap.key + "LoggedIn"] = true;
    window["player" + childSnap.key + "Object"] = childSnap.val();
}, errorHandler);

// when player is changed, update respective playerObject and stats
playersRef.on("child_changed", function (childSnap) {
    window["player" + childSnap.key + "Object"] = childSnap.val();

    updateStats();
}, errorHandler);

// when player is removed, reset respective playerObject and loggedIn flag
playersRef.on("child_removed", function (childSnap) {
    chatRef.push({
        userId: "system",
        text: childSnap.val().name + " has disconnected"
    });

    window["player" + childSnap.key + "LoggedIn"] = false;
    window["player" + childSnap.key + "Object"] = {
        name: "",
        choice: "",
        wins: 0,
        losses: 0
    };

    // when both players have left, clear the chat
    if (!player1LoggedIn && !player2LoggedIn) {
        chatRef.remove();
    }
}, errorHandler);

// when general changes are made, perform bulk of game logic
playersRef.on("value", function (snap) {
    // update the player names
    $("#player-1").text(player1Object.name || "Waiting for Player 1");
    $("#player-2").text(player2Object.name || "Waiting for Player 2");

    // update which part of the player box is showing based on whether a selection has been made
    updatePlayerBox("1", snap.child("1").exists(), snap.child("1").exists() && snap.child("1").val().choice);
    updatePlayerBox("2", snap.child("2").exists(), snap.child("2").exists() && snap.child("2").val().choice);

    // display correct "screen" depending on logged in statuses
    if (player1LoggedIn && player2LoggedIn && !playerNumber) {
        loginPending();
    } else if (playerNumber) {
        showLoggedInScreen();
    } else {
        showLoginScreen();
    }

    // if both players have selected their choice, perform the comparison
    if (player1Object.choice && player2Object.choice) {
        rps(player1Object.choice, player2Object.choice);
    }

}, errorHandler);

//#endregion

//#region Click listeners 

// when the login button is clicked, add the new player to the open player slot
$("#login").click(function (e) {
    e.preventDefault();

    // check to see which player slot is available
    if (!player1LoggedIn) {
        playerNumber = "1";
        playerObject = player1Object;
    }
    else if (!player2LoggedIn) {
        playerNumber = "2";
        playerObject = player2Object;
    }
    else {
        playerNumber = null;
        playerObject = null;
    }

    // if a slot was found, update it with the new information
    if (playerNumber) {
        playerName = $("#player-name").val().trim();
        playerObject.name = playerName;
        $("#player-name").val("");

        $("#player-name-display").text(playerName);
        $("#player-number").text(playerNumber);

        db.ref("/players/" + playerNumber).set(playerObject);
        db.ref("/players/" + playerNumber).onDisconnect().remove();
    }
});

// when a selection is made, send it to the database
$(".selection").click(function () {
    // failsafe for if the player isn't logged in
    if (!playerNumber) return;

    playerObject.choice = this.id;
    db.ref("/players/" + playerNumber).set(playerObject);

    $(".p" + playerNumber + "-selections").hide();
    $(".p" + playerNumber + "-selection-reveal").text(this.id).show();
});

// when the send-chat button is clicked, send the message to the database
$("#send-chat").click(function (e) {
    e.preventDefault();

    chatRef.push({
        userId: playerNumber,
        name: playerName,
        text: $("#chat").val().trim()
    });

    $("#chat").val("");
});

//#endregion

//#region Game functions

/**
 * Compares 2 choices and determines a tie or winner
 * @param {string} p1choice rock, paper, scissors
 * @param {string} p2choice rock, paper, scissors
 */
function rps(p1choice, p2choice) {
    $(".p1-selection-reveal").text(p1choice);
    $(".p2-selection-reveal").text(p2choice);

    showSelections();

    if (p1choice == p2choice) {
        //tie
        $("#feedback").text("TIE");
    }
    else if ((p1choice == "rock" && p2choice == "scissors") || (p1choice == "paper" && p2choice == "rock") || (p1choice == "scissors" && p2choice == "paper")) {
        // p1 wins
        $("#feedback").html("<small>" + p1choice + " beats " + p2choice + "</small><br/><br/>" + player1Object.name + " wins!");

        if (playerNumber == "1") {
            playerObject.wins++;
        } else {
            playerObject.losses++;
        }
    } else {
        // p2 wins
        $("#feedback").html("<small>" + p2choice + " beats " + p1choice + "</small><br/><br/>" + player2Object.name + " wins!");

        if (playerNumber == "2") {
            playerObject.wins++;
        } else {
            playerObject.losses++;
        }
    }

    resetId = setTimeout(reset, 3000);
}

/**
 * Reset the round
 */
function reset() {
    clearTimeout(resetId);

    playerObject.choice = "";

    db.ref("/players/" + playerNumber).set(playerObject);

    $(".selection-reveal").hide();
    $("#feedback").empty();
}

/**
 * Update stats for both players based off most recently-pulled data
 */
function updateStats() {
    ["1", "2"].forEach(playerNum => {
        var obj = window["player" + playerNum + "Object"];
        $("#p" + playerNum + "-wins").text(obj.wins);
        $("#p" + playerNum + "-losses").text(obj.losses);
    });

    player1LoggedIn ? $(".p1-stats").show() : $(".p1-stats").hide();
    player2LoggedIn ? $(".p2-stats").show() : $(".p2-stats").hide();
}

/**
 * Update the player box state
 * @param {string} playerNum 1 or 2
 * @param {boolean} exists 
 * @param {boolean} choice 
 */
function updatePlayerBox(playerNum, exists, choice) {
    if (exists) {
        if (playerNumber != playerNum) {
            if (choice) {
                $(".p" + playerNum + "-selection-made").show();
                $(".p" + playerNum + "-pending-selection").hide();
            } else {
                $(".p" + playerNum + "-selection-made").hide();
                $(".p" + playerNum + "-pending-selection").show();
            }
        }
    } else {
        $(".p" + playerNum + "-selection-made").hide();
        $(".p" + playerNum + "-pending-selection").hide();
    }
}

function errorHandler(error) {
    console.log("Error:", error.code);
}

//#endregion

//#region Display functions

function loginPending() {
    $(".pre-connection, .pre-login, .post-login, .selections").hide();
    $(".pending-login").show();
}

function showLoginScreen() {
    $(".pre-connection, .pending-login, .post-login, .selections").hide();
    $(".pre-login").show();
}

function showLoggedInScreen() {
    $(".pre-connection, .pre-login, .pending-login").hide();
    $(".post-login").show();
    if (playerNumber == "1") {
        $(".p1-selections").show();
    } else {
        $(".p1-selections").hide();
    }
    if (playerNumber == "2") {
        $(".p2-selections").show();
    } else {
        $(".p2-selections").hide();
    }
}

function showSelections() {
    $(".selections, .pending-selection, .selection-made").hide();
    $(".selection-reveal").show();
}

//#endregion
$(document).ready(function() {
    // console.log( "ready!" );

    // track which question we are on
    var questionCounter = 0;
    // initial time of 15 seconds for each question
    var time = 15;
    // will keep tally of right guesses for end game
    var correctGuesses = 0;
    //will keep tally of wrong guesses for end game
    var incorrectGuesses = 0;

    // question & answer array
    var questions = [
      {
	    question: "Who is the main character of Uncharted?",
	    choices: ["Nathan Drake", "Aloy", "Master Chief", "Mario"],
	    correctAnswer: "Nathan Drake",
	    image: "<img src='assets/images/nathanDrake.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "What is the name of the fictional English archaeologist in the game Tomb Raider?",
	    choices: ["Cortana", "Lara Croft", "Faith", "Kitana"],
	    correctAnswer: "Lara Croft",
	    image: "<img src='assets/images/laraCroft.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "Black Ops is the subtitle of which game?",
	    choices: ["Call of Duty", "Battlefield", "Operation:", "Sims 4"],
	    correctAnswer: "Call of Duty",
	    image: "<img src='assets/images/blackOps.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "Pikachu is one of the species of creatures in which series of games?",
	    choices: ["Digimon", "Space Invaders", "Rick & Morty", "Pokemon"],
	    correctAnswer: "Pokemon",
	    image: "<img src='assets/images/pikachu.jpg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "What color is Pac-Man?",
	    choices: ["Pink", "Blue", "Burnt Orange", "Yellow"],
	    correctAnswer: "Yellow",
	    image: "<img src='assets/images/pacMan.png' class='img-circle shadow'>"
	  },
	  {
	    question: "Which character from CD Projekt Red's popular series, The Witcher, is known as The Lady of Space and Time?",
	    choices: ["Yennefer of Vengerberg", "Ciri", "Triss Merigold", "Keria Metz"],
	    correctAnswer: "Ciri",
	    image: "<img src='assets/images/ciri.jpg' class='img-circle shadow'>"
	  },
	  {
	    question: "Spyro is a:",
	    choices: ["Fighter Pilot", "Dragon", "Hedgehog", "Race Car"],
	    correctAnswer: "Dragon",
	    image: "<img src='assets/images/spyro.jpg' class='img-circle shadow'>"
	  },
	  {
	    question: "I'm _____ and this is my favorite store on the Citadel:",
	    choices: ["Master Chief", "Darth Revan", "Thor", "Commander Shepard"],
	    correctAnswer: "Commander Shepard",
	    image: "<img src='assets/images/shep.jpg' class='img-circle shadow'>"
	  },
	  {
	    question: "Who is the protagonist of Nintendo's franchise often set in the Kingdom of Hyrule?",
	    choices: ["Zelda", "Mario", "Donkey Kong", "Link"],
	    correctAnswer: "Link",
	    image: "<img src='assets/images/link.png' class='img-circle shadow'>"
	  },
	  {
	    question: "Which game is most likely to never come out?",
	    choices: ["Half Life 3", "Half Life 3", "Half Life 3", "Half Life 3"],
	    correctAnswer: "Half Life 3",
	    image: "<img src='assets/images/halfLife.jpg' class='img-circle shadow'>"
	  },
	  {
	    question: "Joel and Ellie are two companions in what video game?",
	    choices: ["Dragon Quest VIII", "Final Fantsay XIII", "The Last of Us", "Dragon Age: Origins"],
	    correctAnswer: "The Last of Us",
	    image: "<img src='assets/images/lastOfUs.jpg' class='img-circle shadow'>"
	  },
	  {
	    question: "In which game can you find tears, vigors and robotic patriots?",
	    choices: ["Bioshock: Infinite", "Modern Warfare", "Wolfenstein", "Civilization IV"],
	    correctAnswer: "Bioshock: Infinite",
	    image: "<img src='assets/images/bioshock.jpg' class='img-circle shadow'>"
	  },
	  {
	    question: "Who developed the Mass Effect series? ",
	    choices: ["Bethesda", "Bioware", "Ubisoft", "2K Games"],
	    correctAnswer: "Bioware",
	    image: "<img src='assets/images/bioware.jpg' class='img-circle shadow'>"
	  },
	  {
	    question: "Inhabitants of which fictional town find themselves under the influence of the doctrines of The Order?",
	    choices: ["Raccoon City", "Silent Hill", "Bright Falls", "Rapture"],
	    correctAnswer: "Silent Hill",
	    image: "<img src='assets/images/silentHill.jpg' class='img-circle shadow'>"
	  },
	  {
	    question: "Which of these characters can't jump in any of their games?",
	    choices: ["Link", "Agent 47", "Pac Man", "James Bond"],
	    correctAnswer: "Agent 47",
	    image: "<img src='assets/images/hitman.jpg' class='img-circle shadow'>"
	  }];
	  

	// create question contents according to question count
	function questionContent() {
		// a for loop would be cool here...
    	$("#gameScreen").append("<p><strong>" + 
    		questions[questionCounter].question + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[0] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[1] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[2] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[3] + 
    		"</strong></p>");
	}

	// user guessed correctly
	function userWin() {
		$("#gameScreen").html("<p>You got it right!</p>");
		correctGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user guessed incorrectly
	function userLoss() {
		$("#gameScreen").html("<p>Nope, that's not it!</p>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user ran out of time
	function userTimeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>You ran out of time!</p>");
			incorrectGuesses++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
				correctAnswer + 
				"</span></p>" + 
				questions[questionCounter].image);
			setTimeout(nextQuestion, 4000);
			questionCounter++;
		}
	}

	// screen that shows final score and nice message :)
	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "Perfection! Might want to go outside more tho";
			var bottomText = "#nerdalert!";
		}
		else if (correctGuesses > incorrectGuesses) {
			var endMessage = "Good work! But do better you can...";
			var bottomText = "all your base are belong to us";
		}
		else {
			var endMessage = "You seem to have taken an arrow to the knee";
			var bottomText = "#scrub";
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
			correctGuesses + "</strong> right.</p>" + 
			"<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
		$("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
		$("#bottomText").html(bottomText);
		gameReset();
		$("#start").click(nextQuestion);
	}

	// game clock currently set to 15 seconds
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}

	// moves question counter forward to show next question
	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 15;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}
	// console.log(questionCounter);
	// console.log(questions[questionCounter].correctAnswer);
	}

	// reset score and counter parameters on restart
	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    	$("#start").hide();
    	// $("#gameScreen").append("<div id='question'>");
    	// var nextQuestion = questionContent(questionCounter);
    	// $("#gameScreen").append(nextQuestion);

		// $("#gameScreen").append("<p>" + questions[questionCounter].question + "</p><p>" + questions[questionCounter].choices[0] + "</p><p>" + questions[questionCounter].choices[1] + "</p><p>" + questions[questionCounter].choices[2] + "</p><p>" + questions[questionCounter].choices[3] + "</p>");
		// questionCounter++;
		questionContent();
    	timer();
    	userTimeout();
    }

    // this starts the game
    $("#start").click(nextQuestion);

    // click function to trigger right or wrong screen
	$("#gameScreen").on("click", ".choices", (function() {
		// alert("clicked!");
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});
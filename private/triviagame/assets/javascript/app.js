
// declare the variables 
var timer = 30;
var userGuess;
var correctAnswer = 0;
var incorrectAnswer = 0;
var unAnswered = 0;
var clock;
var showQuestion;
var showAnswerClick;
var showNextQuestion;
var currentQuestion = 0;
// declare the question anser choice in object
var imageTimeOut="<img src='../triviagame/assets/image/timeout.gif'>";
var questionPackage = [{
    question: "Who invented the telephone?",
    choice: ["Tommy", "Bell", "BObby"],
    answer: "Bell",
    image: "<img src='../triviagame/assets/image/bell.gif'>",
    wimage:"<img src='../triviagame/assets/image/wrong1.gif'>"

}, {
    question: "Who discovered penicillin?",
    choice: ["Fleming", "Gransan", "Robert"],
    answer: "Fleming",
    image: "<img src='../triviagame/assets/image/fleming1.gif'>",
    wimage:"<img src='../triviagame/assets/image/wrong3.gif'>"
}, {
    question: "What did Joseph Priesley discover in 1774?",
    choice: ["Hydrogen", "Nitrogen", "Oxygen"],
    answer: "Oxygen",
    image: "<img src='../triviagame/assets/image/oxygen.gif'>",
    wimage:"<img src='../triviagame/assets/image/wrong1.gif'>"
}, {
    question: "Who said E=mc2?",
    choice: ["Einstein", "Thomas", "Gremmy"],
    answer: "Einstein",
    image: "<img src='../triviagame/assets/image/einstein.gif'>",
    wimage:"<img src='../triviagame/assets/image/wrong3.gif'>"
}, {
    question: "Who starts first in chess?",
    choice: ["Black", "white", "Black or White"],
    answer: "white",
    image: "<img src='../triviagame/assets/image/chess.gif'>",
    wimage:"<img src='../triviagame/assets/image/wrong1.gif'>"
}, {
    question: "What’s the Hungarian word for pepper?",
    choice: ["paprika", "Pepperiziz", "Paperrr"],
    answer: "paprika",
    image: "<img src='../triviagame/assets/image/pepper1.gif'>",
    wimage:"<img src='../triviagame/assets/image/wrong3.gif'>"
}
];


/// which div should get display
$(function () {
    $(".counter").hide();
    $(".question").hide();
    $(".choice1").hide();
    $("message").hide();
    $("#startGame").hide();
    $('#start').click(function () {
        timerDisplay();

        $(this).hide();
        $(".counter").show();
        $(".question").show();
        $(".choice1").show();
        $("#startGame").show();
        $("message").show();
    });
});


///how the timer get decreament and setinterval of timer timer less than 1 condition shows
function timerDisplay() {
    clock = setInterval(countDown, 1000);

    showQuestion = setTimeout(questionDisplay, 1000);
    //questionDisplay();

    function countDown() {
        if (timer > 0) {
            timer--;
        }
        if (timer == 0) {
            alert("timesup");
            unAnswered++;

            console.log(questionPackage[currentQuestion].answer);
            $(".message").html("<h3>Ooppss...Times up:<br>" + questionPackage[currentQuestion].answer + "</h3><br>" +imageTimeOut);


        }
        console.log(timer);
        $(".counter").html("<h2>"+timer+"</h2><br>");
        if (timer < 1) {
            console.log("-1" + timer);
            $(".choice1").empty();
            $(".question").empty();

            clearInterval(clock);
            setTimeout(showNextQuestion, 3000);

        }
    }
};

//// question display in the div and choice of the question
function questionDisplay() {
    var i;

    $(".question").html("<br><h4>Question:"+questionPackage[currentQuestion].question+"</h4><br>");

    //loop for print choice for current question
    for (i = 0; i < (questionPackage[currentQuestion].choice).length; i++) {
        $(".choice1").append("<br><h4 id='choice1'class=''>" + questionPackage[currentQuestion].choice[i] + "</h4><br><br>");
        console.log(questionPackage[currentQuestion].choice[i]);
    }

    userClick();

};

// function for displaying next question
function showNextQuestion() {
//if currentquestion less than object length excute this condition
    if (currentQuestion < questionPackage.length) {  

        timer = 30;
        console.log("next qn" + currentQuestion);

        currentQuestion++;

        $(".choice1").html("");
        $(".question").html("");

        $(".message").empty();
        timerDisplay();
    }
//if current question equal to object length show result screen
    if (currentQuestion == questionPackage.length) {

        currentQuestion = 0;
        clearInterval(clock);
        clearTimeout(showQuestion);
        $(".choice1").hide();
        $(".question").hide();
        $(".message").empty();

        $(".message").append("<h3>Result<br>" + "Correct Answer:" + correctAnswer + "<br>Incorrect Answer:" + incorrectAnswer + "<br>Unanswered:" + unAnswered+"</h3><br><br><br>");
        reStart();
    }


};

// function for user click the answer for the current question
function userClick() {
    console.log("click000" + userGuess)
    $(".choice1").on("click", "#choice1", function (evt) {

        userGuess = $(this).text();
        console.log("click" + userGuess);
        evt.stopImmediatePropagation();
        if (userGuess == questionPackage[currentQuestion].answer) {
            console.log("win");
            correctAnswer++;
            clearInterval(clock);
            $(".question").html("");
            $(".choice1").html("");


            $(".message").append("<h3>Yes You choose correct answer is :" + questionPackage[currentQuestion].answer + "</h3><br>" + "<br>" + questionPackage[currentQuestion].image);
            setTimeout(showNextQuestion, 4000);
        }
        else {
            console.log("loss");
            incorrectAnswer++;
            clearInterval(clock);
            $(".question").html("");
            $(".choice1").html("");
            $(".message").append("<h3>Nope..Correct answer is :" + questionPackage[currentQuestion].answer + "</h3><br>" + "<br>" + questionPackage[currentQuestion].wimage);
            setTimeout(showNextQuestion, 4000);
        }
    });
};

// function for restart for the result screen start button
function reStart() {
   
$(".message").append("<br><button id='startGame'>Start</button><br>");
   
$('#startGame').click(function () {
        
setTimeout(timerDisplay, 1000);

        $(".choice1").show();
        $(".question").show();
        $(".message").empty();
        
        incorrectAnswer = 0;
        correctAnswer = 0;
        unAnswered = 0;

    });
}
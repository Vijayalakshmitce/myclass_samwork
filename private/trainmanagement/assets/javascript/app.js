// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA2f1XTaKNocQnx2veZeoTDoSPqytWvLqo",
    authDomain: "homework-383cf.firebaseapp.com",
    databaseURL: "https://homework-383cf.firebaseio.com",
    projectId: "homework-383cf",
    storageBucket: "homework-383cf.appspot.com",
    messagingSenderId: "969293150946",
    appId: "1:969293150946:web:0e397c9d314e96f9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#add-train-btn").on("click",function(event){
    event.preventDefault();
    var trainName = $("#Train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTime = $("#trainTime-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    ///////Train time calculation//////////

    var firstTimeConverted = moment(trainTime, "hh:mm A").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));
    var nextArrTrain = moment(nextTrain).format("hh:mm A");
    var firsttrainTime = moment(trainTime,"hh:mm A").format("hh:mm ");
    //////////////////////////////
   var newEmp = {
     name : trainName,
     dest : destination,
     TTime : firsttrainTime,
     freq : frequency,
     nextArrival: nextArrTrain,
     minutesAway:tMinutesTillTrain,
     createdAt: firebase.database.ServerValue.TIMESTAMP
   }

   database.ref().push(newEmp);
   $("#Train-name-input").val("");
   $("#destination-input").val("");
   $("#trainTime-input").val("");
   $("#frequency-input").val("");



  })


database.ref().on("child_added",function(reteriveValue){
  var trainName = reteriveValue.val().name;
  var destination = reteriveValue.val().dest;
  var trainTime = reteriveValue.val().TTime;
  var frequency = reteriveValue.val().freq;
  var nextTrain = reteriveValue.val().nextArrival;
  var minutesAwy = reteriveValue.val().minutesAway;

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(trainTime),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minutesAwy)
    
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
})

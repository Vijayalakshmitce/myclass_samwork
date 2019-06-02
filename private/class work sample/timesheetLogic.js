 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyB_8XUeCW1Mh9-J-imOApgVRW6REGiannM",
    authDomain: "week7-3-cbd9a.firebaseapp.com",
    databaseURL: "https://week7-3-cbd9a.firebaseio.com",
    projectId: "week7-3-cbd9a",
    storageBucket: "week7-3-cbd9a.appspot.com",
    messagingSenderId: "281302723201",
    appId: "1:281302723201:web:878afa6515616bf4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  var database = firebase.database();

  $("#add-employee-btn").on("click",function(){
      var eName = $("#employee-name-input").val();
      var role = $("#role-input").val();
      var startDate = $("#start-input").val();
      var monthRate = $("#rate-input").val();

      database.ref().push({
          employeeName : eName,
          role : role,
          startdate :startDate,
          monthrate :monthRate
      })

  })

  database.ref().on("child_added",function(reteriveValue){
      var EName = reteriveValue.val().employeeName;
      var Role = reteriveValue.val().role;
      var StartDate = reteriveValue.val().startdate;
      var MonthRate = reteriveValue.val().monthRate;





$("#name-display").append(EName+"<br><hr>");

  })
// The code in add.js handles what happens when the user clicks the "Add a book" button.

// When user clicks add-btn
$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // Make a newGuest object
  var newGuest = {
    name: $("#name")
      .val()
      .trim(),
    age: $("#age")
      .val()
      .trim(),
    sex: $("#sex")
      .val()
      .trim(),
    shelter: $("#shelter")
      .val()
      .trim(),
    date: $("#date")
      .val()
      .trim()
  };
  console.log(newGuest);
  // Send an AJAX POST-request with jQuery
  $.post("/api/guest", newGuest)
    // On success, run the following code
    .then(function() {
      var div = $("<div>");
      div.addClass("guest");
      div.append("<p>" + newGuest.name + "</p>");
      div.append("<p>" + newGuest.age + "</p>");
      div.append("<p>" + newGuest.sex + "</p>");
      div.append("<p>" + newGuest.shelter + "</p>");
      div.append("<p>" + newGuest.date + "</p>");

      $("/api/guest").prepend(div);
      // Log the data we found
      console.log(data);
    });

  // Empty each input box by replacing the value with an empty string
  $("#name").val("");
  $("#age").val("");
  $("#sex").val("");
  $("#shelter").val("");
  $("#date").val("");
});

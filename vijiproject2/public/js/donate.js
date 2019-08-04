// The code in add.js handles what happens when the user clicks the "Add a book" button.

// When user clicks add-btn
$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // Make a newBook object
  var newBook = {
    title: $("#title").val().trim(),
    author: $("#author").val().trim(),
    genre: $("#genre").val().trim(),
    pages: $("#pages").val().trim()
  };

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newBook)
    // On success, run the following code
    .then(function(data) {
      // Log the data we found
      console.log(data);
    });

  // Empty each input box by replacing the value with an empty string
  $("#title").val("");
  $("#author").val("");
  $("#genre").val("");
  $("#pages").val("");

});

var data = [{
  name: "WYCA Central Carolinas",
  capacity: 40,
  opensAt: '17:00',
  female: true,
  male: false,
},
{
  name: "HHRO North Carolinas",
  capacity: 40,
  opensAt: '17:00',
  female: false,
  male: true,
},
{
  name: "Urban Ministry Center",
  capacity: 40,
  opensAt: '17:00',
  female: true,
  male: true,
},
{
  name: "Uptown shelter",
  capacity: 40,
  opensAt: '17:00',
  female: true,
  male: true,
}
]


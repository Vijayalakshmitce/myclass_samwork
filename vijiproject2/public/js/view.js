// Make an AJAX get request to our api
$.get("/api/shelters", function (data) {
  console.log(data);
  // Call our renderShelters function to add our books to the page
  fetchShelters(data);
 });
 
 function fetchShelters(data) {
  if (data.length !== 0) {
    for (var i = 0; i < data.length; i++) {
      var div = $("<div>");
      div.append("<h2>" + data[i].Shelter_name + "</h2>");
      div.append("<p>Address: " + data[i].address + "</p>");
      div.append("<p>Gender: " + data[i].gender + "</p>");
      div.append("<p>Capacity: " + data[i].capacity + "</p>");
      div.append("<p>Phone Number: " + data[i].phone_number + "</p>");
      div.append()
      $("#shelters").append(div);
    };
  };
};
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
}];

$('#female').on('click', function () {
var filteredArray = data.filter(each => each.female === true)
console.log(filteredArray);
$("#shelters").empty()
$("#shelters").append(`<h2>Female only shelters</h2>`)
displayShelters(filteredArray)
})

$('#male').on('click', function () {
var filteredArray = data.filter(each => each.male === true)
console.log(filteredArray);
$("#shelters").empty()
$("#shelters").append(`<h2>Male only shelters</h2>`)
displayShelters(filteredArray)
})

$('#both').on('click', function () {
var filteredArray = data.filter(each => each.female === true && each.male === true)
console.log(filteredArray);
$("#shelters").empty()
$("#shelters").append(`<h2>Shelters for both genders</h2>`)
displayShelters(filteredArray)
})

function displayShelters(array) {
for (let i = 0; i < array.length; i++) {
  var newShelter = $(`<div>${array[i].name}</div>`)
  $("#shelters").append(newShelter)
}
};
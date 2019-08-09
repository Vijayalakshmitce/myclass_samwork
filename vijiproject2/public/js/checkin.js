// The code in add.js handles what happens when the user clicks the "Add a book" button.

$.get("/api/shelters",function(data){
  var drD = $("<select>");
  drD.addClass("form-control mySelect selectpicker");
for(var i=0; i< data.length;i++){

drD.append("<option value ='"+data[i].id+"'>"+data[i].Shelter_name+"</option>");

}

$("#dropdown").append(drD);
  
});



// When user clicks add-btn
$("#add-btn").on("click", function(event) {
  event.preventDefault();
console.log($(".mySelect option:selected").val())
  // Make a newGuest object
  var guest_Flag;
  var newGuest = {
    guest_Name: $("#name")
      .val()
      .trim(),
      age: $("#age")
      .val()
      .trim(),
      gender: $("#sex")
      .val()
      .trim(),
      shelter_id: $(".mySelect option:selected").val(),
      shelter_Name: $(".mySelect option:selected")
      .html(),
      entry_Date: $("#date")
      .val(),
      guest_Flag : 1
     
  };


  $.post("/api/guest", newGuest)
  
    .then(function(result) {
     
      alert("added succesfully");
    
    });
////post end closure here
var id = $(".mySelect option:selected").val()
var shelter_id = $(".mySelect option:selected").val();
$.get("/api/joins/"+shelter_id+"/"+id,function(result){
   console.log(result[0].id)
   console.log(result[0].capacity)
   var updateCapacity = result[0].capacity - 1 ;
   var id = result[0].id;
 
  var newUpdate = {
        capacity : updateCapacity
  }

  $.ajax({
    method: "PUT",
    url: "/api/updateShelter/"+ id,
    data: newUpdate
}).then(function(){
  console.log("update the capacity");
});
  
});
///////update////
 
  $("#name").val("");
  $("#age").val("");
  $("#sex").val("");
  $("#shelter").val("");
  
  guest_Flag = 0;
  $("#date").val("");

});


$("#submit").on("click",function(event){
    event.preventDefault();
     
    var newShelterData = {
        Shelter_name : $("#ShelterName").val(),
        address: $("#address").val(),
        gender: $("#gender").val(),
        capacity:$("#capacity").val(),
        phone_number:$("#phoneNumber").val()
    }

    $.post("/api/shelter",newShelterData).then(function(){
        console.log("newEntry created");
                location.reload();
    })


});
//submit end closure here
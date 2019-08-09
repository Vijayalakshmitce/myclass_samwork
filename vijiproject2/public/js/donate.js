$.get("/api/bank", function (data) {
  if (data.length === 0){
$.get("/post/bankBulk",function(data){
  console.log("bulk insert");
  });
}
});
///bank bulk create end closure here




///dropdown list for shelter generator from database

$.get("/api/shelters",function(data){
  var drD = $("<select>");
  drD.addClass("form-control mySelect selectpicker");
for(var i=0; i< data.length;i++){

drD.append("<option value ='"+data[i].id+"'>"+data[i].Shelter_name+"</option>");

}

$("#dropdown").append(drD);
  
});
///dropdown data fill end closure here




$("#submit-btn").on("click", function(event) {
  event.preventDefault();
  var shelterId = $(".mySelect option:selected").val();
  var shelterName = $(".mySelect option:selected") .html();
  var userName = $("#userName").val();
  var passWord = $("#passWord").val();
  var bankCode = $("#cardNumber").val();
  var donateAmount = $("#donateAmount").val();
  console.log("username"+userName)
  var err =[]; 
  var alert_err = 0;
  $.get("/api/bank",function(data){
    console.log(data);
    console.log(data.id);
    console.log(data[0].id);
    for(var i=0; i<data.length; i++){
      if((bankCode == data[i].bank_code) || (userName == data[i].bank_UserName) || (passWord == data[i].bank_code)) {
      
        if (data[i].amount_Availablity > donateAmount){
           
          var subAmount = data[i].amount_Availablity - donateAmount;
          console.log("subAmount:"+subAmount);
          var newUpdate = {
            amount_Availablity : subAmount
      }

          $.ajax({
            method: "PUT",
            url: "/api/updatebank/"+ shelterId,
            data: newUpdate
        }).then(function(){
          console.log("update the capacity");
        });
          
        //update back amount end closure here
          
          var newDonate = {
            shelter_Id : shelterId,
            shelter_Name : shelterName,
            donation_Done : donateAmount
          }
    
          $.post("/api/donatePost",newDonate).then(function(data){
            console.log("inserted into donation page");
          });
          //post donation end closure here
        }
        else if (data[i].amount_Availablity === 0){
          alert("Amount is insufficent in your Acount");
        }
      //else if end closure here
      
      }
       else {
       
       alert_err = 1;
       err.push(alert_err);
       }
           
    }
    //first for loop end closure here
    


  });
$("#name").val("");

$("#userName").val("");
$("#passWord").val("");
$("#cardNumber").val("");
$("#donateAmount").val("");

  
});
///add submit button closure here


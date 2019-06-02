//declare variable for Movie array

var animalsArray=["cat","dogs"];



// Submit button on click function
$("#submitBtn").on('click',function(event){
    event.preventDefault();
var userInput = $("#UserInput").val();
animalsArray.push(userInput);
bttnDisplay();
$("#UserInput").val("");
});


$("#cleargiphy").on('click',function(event){
    event.preventDefault();
    console.log("i click clear")
    $("#testResult").empty();
})
// function for display the user input in function 

function bttnDisplay(){
    $("#displayBtn").empty();
for(var i=0; i<animalsArray.length; i++){
    var userButton = $("<button class='m-1'>");
    userButton.addClass("divBttn");
    userButton.attr("data-name",animalsArray[i]);
    userButton.text(animalsArray[i]);
    $("#displayBtn").append(userButton);
    
}

}
bttnDisplay();
// GIPHY button click

  //giphyDisplay();

/// funciton for animalsARRAY button api key=F4Tcm25Pr8Vfjh5Ho0I1669Ckud0vTW9

function giphyDisplay(){
    $("#displayBtn").on("click",".divBttn",function(){
        var searchName = $(this).attr("data-name");
        console.log(searchName);
  var queryURL="https://api.giphy.com/v1/gifs/search?q=" +searchName +"&api_key=F4Tcm25Pr8Vfjh5Ho0I1669Ckud0vTW9&limit=6&rating=pg";
  $.ajax({
     url:queryURL,
           method:"GET"
    }).then(function(response){
 console.log(response.data);
 console.log(response);
 $("#testResult").empty();
var result = response.data;
var gifDiv = $("<div>");
    
gifDiv.addClass("row");
for (var j=0; j<result.length;j++){
    var rating = result[j].rating;
     
   
    var gifCol =$("<div>");
    gifCol.addClass("col-md-4")
    
    
    var ratingDsiplay= $("<p>");
    ratingDsiplay.text("Rating:"+rating);
    var resultImage= $("<img>");
    resultImage.addClass("resultImg");
    resultImage.attr("data-state","still");
    resultImage.attr("src",result[j].images.fixed_height_still.url);
    resultImage.attr("data-still",result[j].images.fixed_height_still.url);
    resultImage.attr("data-animate",result[j].images.fixed_height.url);
    
    gifClick();
     gifDiv.prepend(gifCol);
      gifCol.prepend(ratingDsiplay);
      gifCol.prepend(resultImage);
    //  $("#testResult").prepend(gifDiv);
    //$("#testResult").prepend(ratingDsiplay);

    //$("#testResult").prepend(resultImage);


}


$("#testResult").prepend(gifDiv);   
    });
});
}
giphyDisplay();

function gifClick(){
    $("#testResult").on("click",".resultImg",function(evt){
        var state = $(this).attr("data-state");
        evt.stopImmediatePropagation();
        console.log("i am clicked")
      if(state==="still"){
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state","animate");
        console.log("i am clicked")
        
      }
      else{
          $(this).attr("src",$(this).attr("data-still"));
          $(this).attr("data-state","still");
          
          console.log("i am clicked1")
      }
      
    
    });
}
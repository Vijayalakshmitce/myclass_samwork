//declare counter variable
var counter = 30;
var $count = $('.counter')



//
$('#start').on("click",Start)


function Start(){
    counter--;
    $(".counter").html("hello");
    console.log(counter);
}
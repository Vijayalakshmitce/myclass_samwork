function maxInArray(numArray){
    var maxNum = numArray[0];///not understand this step
    for(var i=0; i<numArray.length;i++) {
        if(maxNum < numArray[i]){
maxNum = numArray[i];
        }
    }
    return maxNum;//not understand
}
var numbers = [1,5,3,7];
var maxNumber =  maxInarray(numbers);
    console.log("mzxNumber");
    console.log(maxNumber);
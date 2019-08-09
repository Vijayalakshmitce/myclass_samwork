
//bulk create for standard data
$.get("/api/shelters", function (data) {
  if (data.length === 0){
$.get("/post/dataBulk",function(data){
  console.log("bulk insert");
  });
}
});
  
  
   ////showing the data in the div..
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
  
  
  ///googlechart barchart .. functionality
  window.onload = function() {

    $.get("/api/shelters", function (data) {
      console.log(data);
      // Call our renderShelters function to add our books to the page
      fetchShelters(data);
     });
    google.charts.load('current', {'packages':['corechart']});
    
    var options = {
      title: 'Shelter Availability'
    };
  
    google.charts.setOnLoadCallback(function() {
      getChartData(function(result) {
        renderChart(result, options);
        
        window.onresize = function() {
          renderChart(result, options);
        };
      });
    });
  };
  
  
  
  // --- UTIL FUNCTIONS ---
  function getChartData(callback) {
    // makes the API call
    $.get("/api/googleChrat",function(result){
      console.log(result);
      callback(result);
    });
  }
  
  function renderChart(data, options) {
    
    // create a bar chart object
    // render chart
  
    var dTable = new google.visualization.DataTable();
  
    // add colums to data table
    dTable.addColumn('string','Shelter_name'); 
    dTable.addColumn('number','capacity'); 
  
    // add each row of data using a for loop
    for(i=0; i < data.length;i++){
      var currentObj = data[i];
      dTable.addRow([currentObj.Shelter_name,currentObj.capacity]);
    }
  
    var chart = new google.visualization.BarChart(document.getElementById('piechart'));
  
    chart.draw(dTable, options);
  
  }
  
  
  
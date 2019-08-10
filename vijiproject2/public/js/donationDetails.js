$.get("/api/donatePost",function(data){

var table = $("<table>");
table.addClass("tableBody");

table.append("<tr> <th> shelter ID </th> <th>shelter Name</th><th>Donation Amount</th> <th> Donation Done Date and time</th></tr>");

//table header declare end closure here
for (var i=0;i<data.length;i++){

table .append("<tr><td>"+data[i].shelter_Id +"</td> <td>"+ data[i].shelter_Name+"</td> <td>"+data[i].donation_Done+"</td> <td>"+data[i].createdAt+"</td></tr>")
}

$("#tableDisplay").append(table);

});
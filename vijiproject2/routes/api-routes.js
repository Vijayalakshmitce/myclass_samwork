var shelterGuestDb = require("../models");





module.exports = function (app) {
app.get("/post/dataBulk",function(req,res){
//insert data
var data = [
  {
    Shelter_name: 'The Salvation Army Center of Hope Shelter',
    address: '534 Spratt St, Charlotte, NC 28206',
    gender: 'Women and Youth',
    capacity: 40,
    phone_number: 7043482560
},{
  Shelter_name: 'Mens Shelter of Charlotte',
  address: '1210 N Tryon St, Charlotte, NC 28206',
  gender: 'Men',
  capacity: 30,
  phone_number: 7043343187
},{
  Shelter_name: 'The Relatives, Inc.',
  address: '1100 East Blvd. Charlotte, NC 28203',
  gender: 'Female',
  capacity: 30,
  phone_number: 7043770602
},{
  Shelter_name: 'Urban Ministry Center',
  address: '945 North College Street Charlotte, NC 28206',
  gender: 'Women and Men',
  capacity: 20,
  phone_number: 7043470278
},{
  Shelter_name: 'Hoskins Park Ministries',
  address: '107 Cromer St Charlotte, NC 28104',
  gender: 'Men',
  capacity: 78,
  phone_number: 7043913303
},{
  Shelter_name: 'My Sisters House',
  address: '3239 Beatties Ford Road Charlotte, NC 28216',
  gender: 'Women',
  capacity: 57,
  phone_number: 7042002807
},{
  Shelter_name: 'Charlotte Family Housing',
  address: '2410 The Plaza, Charlotte, NC 28205',
  gender: 'Women',
  capacity: 60,
  phone_number: 7043355488
},{
  Shelter_name: 'Charlotte Mens Shelter',
  address: '3410 Statesville Ave, Charlotte, NC 28206',
  gender: 'Men',
  capacity: 33,
  phone_number: 7043343187
}
      
];
shelterGuestDb.Shelter.bulkCreate(data,{
  fields:["Shelter_name", "address","gender","capacity","phone_number"] ,
  updateOnDuplicate: ["Shelter_name"] 
} ,{
  individualHooks: true
}).then(function(response){
  res.json(response)
}).catch(function(error){
  res.json(error);
});



});
//post bulk insert end closure here
  app.get("/api/guest", function (req, res) {

    shelterGuestDb.Guest.findAll({}).then(function (results) {
      console.log(JSON.stringify(results))
      res.json(results);

     
    });
  });
  //get guest end closure here
  app.get("/api/shelters", function (req, res) {
    shelterGuestDb.Shelter.findAll({}).then(function (results) {
      res.json(results);
         
    });

  });
  //shelter get all end closure here

  app.post("/api/guest", function (req, res) {

    shelterGuestDb.Guest.create({
      guest_Name: req.body.guest_Name,
      age: req.body.age,
      gender: req.body.gender,
      shelter_id: req.body.shelter_id,
      shelter_Name: req.body.shelter_Name,
      entry_Date: req.body.entry_Date,
      guest_Flag: req.body.guest_Flag
    }).then(function (results) {
      res.json({
        id: results.insertId
      });
    });
  });
//guest entry end closure here

  app.post("/api/shelter",function(req,res){
    shelterGuestDb.Shelter.create({
      Shelter_name: req.body.Shelter_name,
      address: req.body.address,
      gender: req.body.gender,
      capacity: req.body.capacity,
      phone_number: req.body.phone_number

    }).then(function(results){
      res.json({
        id: results.insertId
      });
    })
  })
  ///adding shelter end closure  here

  app.get("/api/joins/:shelter_id/:id",function(req,res){
   
    shelterGuestDb.Shelter.findAll({
      where:{
        id : req.params.id
      }
    },{
      include : [{
        model : shelterGuestDb.Guest,
        where : {
          shelter_id : req.params.shelter_id
        }
      }]
    }).then(function(results){
      res.json(results);
      console.log("Api routes..");
      console.log(JSON.stringify(results));
    })

  });
  ///end closure here
   app.put("/api/updateShelter/:id",function(req,res){
    
    shelterGuestDb.Shelter.update({
      capacity : req.body.capacity
    },{
      where:{
        id : req.params.id
      }
    }).then(function(result){
      res.json(result)
      console.log(result);
    })
   });
  //put end closure here
  app.get("/api/googleChrat",function(req,res){
      shelterGuestDb.Shelter.findAll({
        attributes: ['Shelter_name','capacity']
      }).then(function(result){
        res.json(result);
        console.log(JSON.stringify(result));
      })
  });
  //google chart api end closure here

  app.get("/api/bank", function (req, res) {
    shelterGuestDb.Bank.findAll({}).then(function (results) {
      res.json(results);
  });

  });

///get all bank details

app.get("/post/bankBulk",function(req,res){
  //insert data
  var data = [
    {
      bank_UserName: 'vijayalakshmi',
      bank_Password: 'viji',
      bank_code: 12345,
      amount_Availablity: 300
      
    },{
      bank_UserName: 'gaberial',
      bank_Password: 'gaberial',
      bank_code: 12121,
      amount_Availablity: 500
  },{
    bank_UserName: 'marikia',
      bank_Password: 'marikia',
      bank_code: 13131,
      amount_Availablity: 300
  },{
    bank_UserName: 'steve',
      bank_Password: 'steve',
      bank_code: 14141,
      amount_Availablity: 1000
  },{
    bank_UserName: 'robert',
      bank_Password: 'robert',
      bank_code: 15151,
      amount_Availablity: 876
  }];
  shelterGuestDb.Bank.bulkCreate(data,{
    fields:["bank_UserName", "bank_Password","bank_code","amount_Availablity"] ,
    updateOnDuplicate: ["bank_UserName"] 
  } ,{
    individualHooks: true
  }).then(function(response){
    res.json(response)
  }).catch(function(error){
    res.json(error);
  });
});
//bulk bank details create

app.put("/api/updatebank/:id",function(req,res){
    
  shelterGuestDb.Bank.update({
    amount_Availablity : req.body.amount_Availablity
  },{
    where:{
      id : req.params.id
    }
  }).then(function(result){
    res.json(result)
    console.log(result);
  })
 });
 ///update bank amount end closure here

app.post("/api/donatePost",function(req,res){
  shelterGuestDb.donation.create({
    shelter_Id : req.body.shelter_Id,
    shelter_Name : req.body.shelter_Name,
    donation_Done : req.body.donation_Done
  }).then(function(response){
    res.json({
      id: response.insertId
    });
  });
});
///post into the donation page end closure
app.get("/api/donatePost", function(req, res) {
  shelterGuestDb.donation.findAll({}).then(function (result) {
    res.json(result);
  });
 });
 // api donation get all end closure here
};
//module export end closure here


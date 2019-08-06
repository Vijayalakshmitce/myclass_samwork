var shelterGuestDb = require("../models");

module.exports = function (app) {

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
};
//module export end closure here


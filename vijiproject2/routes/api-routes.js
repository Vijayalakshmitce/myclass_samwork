var shelterGuestDb = require("../models");

module.exports = function (app) {

  app.get("/api/guest", function (req, res) {

    shelterGuestDb.Guest.findAll({}).then(function (results) {

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
      shelter_Name: req.body.shelter_Name,
      entry_Date: req.body.entry_Date
    }).then(function (results) {
      res.json({
        id: result.insertId
      });
    });
  });


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
};
//module export end closure here


// *********************************************************************************

var path = require("path");



module.exports = function(app) {
  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname,"../public/view.html"));
  });
  //donate file path
  app.get("/donate", function(req, res) {
    res.sendFile(path.join(__dirname,"../public/donate.html"));
  });
  //admin file path
  app.get("/admin", function(req, res) {
    res.sendFile(path.join(__dirname,"../public/admin.html"));
  });
  //checkin file path
  app.get("/checkin", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/checkin.html"));
  });
  //donation details file path
  app.get("/donationDetails", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/donationDetails.html"));
  });
};

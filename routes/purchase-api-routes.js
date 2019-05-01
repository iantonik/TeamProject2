var db = require("../models");
const Sequelize = require('sequelize');


module.exports = function (app) {
  app.get("/api/purchase/all", function(req, res){
    db.Purchase.findAll({

    }).then(function(response){
        res.json(response);
    })
  })

  app.post("/api/purchase/new", function (req, res) {
    console.log(req.body)
    db.Purchase.create(req.body).then(function (dbPackage) {
      res.json(dbPackage);
    });
  });

}
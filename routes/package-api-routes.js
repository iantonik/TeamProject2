var db = require("../models");
const Sequelize = require('sequelize');


module.exports = function (app) {

  app.get("/api/package/all", function(req, res){
    db.Package.findAll({

    }).then(function(response){
        res.json(response);
        // return response
        // res.render("package", {package: response})
    })
  })

  app.post("/api/package/new", function (req, res) {
    console.log(req.body)
    db.Package.create(req.body).then(function (dbPackage) {
      res.json(dbPackage);
    });
  });

  app.put("/api/package/:id", function (req, res) {
    console.log(req.body)

    var id = req.params.id;
    var updateObj = {};
    if (req.body.inactive) updateObj.inactive = req.body.inactive;
    if (req.body.name) updateObj.workout_type = req.body.name;
    if (req.body.price) updateObj.price = req.body.price;
    if (req.body.count) updateObj.session_count = req.body.count;

    db.Package.update(updateObj, {
        where: {
          id: id
        }
      }).then(function (dbPackage) {
        res.json(dbPackage);
      });
  });

  app.delete("/api/package/:id", function(req, res) {
    db.Package.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });

  });
}
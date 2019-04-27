var db = require("../models");
const Sequelize = require('sequelize');


module.exports = function (app) {

    app.post("/api/package/new", function (req, res) {
        console.log(req.body)
        db.Package.create(req.body).then(function (dbPackage) {
            res.json(dbPackage);
        });
    });

    app.put("/api/package", function(req, res){
        console.log(req.body)

        db.Package.update({
            inactive: req.body.inactive,
          }, {
            where: {
              id: req.body.id
            }
          }).then(function(dbPackage) {
            res.json(dbPackage);
          });
    })
}
var db = require("../models");
var moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (app) {
    app.get("/api/clients", function(req, res) {
        db.Client.findAll().then(result => res.json(result));
    });

    app.post("/api/clients/new", function(req, res) {
        console.log("heres a new client");
        db.Client.create(req.body).then(function(dbClients) {
            res.json(dbClients);
          });
    });

    //omar: added another put method for inline edit functionality
    app.put("/api/clients/:id", function (req, res) {
      console.log("updateClient function called... passthru to PUT");
  
      var id = req.params.id;
      var clientObj = {};
      if (req.body.first_name) clientObj.first_name = req.body.first_name;
      if (req.body.last_name) clientObj.last_name = req.body.last_name;
      if (req.body.email) clientObj.email = req.body.email;
      if (req.body.address) clientObj.address = req.body.address;
      if (req.body.phone_number) clientObj.phone_number = req.body.phone_number;
      if (req.body.gender) clientObj.gender = req.body.gender;
      if (req.body.age) clientObj.age = req.body.age;
      if (req.body.weight) clientObj.weight = req.body.weight;
  
      db.Client.update(clientObj, {
          where: {
            id: id
          }
        }).then(function (dbClient) {
          res.json(dbClient);
        });
    });


    //omar: not used?
    app.put("/api/clients/edit/:id", function(req, res) {
        console.log("editing a client");
        db.Client.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(function(dbClients) {
            res.json(dbClients);
        });
    })
    app.delete("/api/clients/:id", function(req, res) {
        db.Client.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(dbClients) {
          res.json(dbClients);
        });
      });
    
}
;







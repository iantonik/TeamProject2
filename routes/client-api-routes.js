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
        db.client.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(dbclients) {
          res.json(dbclients);
        });
      });
    
}
;







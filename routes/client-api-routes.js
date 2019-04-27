var db = require("../models");
var moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (app) {
    //  All clients witn the session belongs to them 
    app.get("/api/clients/all", function(req, res) {
        console.log("all clients");
        db.Client.findAll({
        where:{
            id:{[Op.lt]: 10}}
                // include: [db.Session]
    })  .then(function(dbClient){
            res.json(dbClient)
        });
    });

    app.get("/api/clients/:id", function(req, res) {
        console.log("specific client");
        // db.Client.findOne({
        //     where: {
        //       id: req.params.id
        //     },
        //     include: [db.session]
        //   }).then(function(dbClient) {
        //     res.json(dbClient);
        //   });
        });
      
 

    app.post("/api/clients/new", function(req, res) {
        console.log("heres a new client");
        // db.Client.create(req.body).then(function(dbClient) {
        //     res.json(dbClient);
        //   });
    });

    app.put("/api/clients/edit", function(req, res) {
        console.log("editing a client");
        // db.Client.update(
        //     req.body,
        //     {
        //       where: {
        //         id: req.body.id
        //       }
        //     }).then(function(dbPost) {
        //     res.json(dbClient);
        //   });
        // });

    });
}
var moment = require('moment');
var db = require("../models");
const sequelize = require('../models/index.js').sequelize;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var path = require("path");


module.exports = function (app) {
    app.get("/", function (req, res) {

        var promise1 = db.Session.findAll({
            include: [
                {
                    model: db.Client, 
                }
               
            ]
        });

        var promise2 = db.Session.findAll({

            attributes: ['Session.PurchaseId',  [Sequelize.fn('COUNT', Sequelize.col('Session.executed_date')), 'UsedSessionCount']],
      
            include: [
              {model: db.Purchase, attributes: ['Id', 'ClientId', 'session_count', 'workout_type']}, 
              {model: db.Client, attributes: ['first_name', 'last_name']}
            ],
      
            group: ['Session.PurchaseId', 'Client.Id'],
            raw: true
          });

        Promise.all([promise1, promise2]).then((results) => {

            const retVal = results[0].map(r => {
                return {
                    title: r.Client.first_name +" " + r.Client.last_name,
                    start: r.schedule_date,
                    end: new Date(new Date(r.schedule_date).setHours(new Date(r.schedule_date).getHours() + 1))
                }
            })

            var sessionInfo = results[1];
            const retVal2 = sessionInfo.map(element => {
                return {
                    ClientName: `${element['Client.first_name']} ${element['Client.last_name']}`,
                    WorkoutType: element['Purchase.workout_type'],
                    SessionCount: element['Purchase.session_count'],
                    UsedSessionCount: element.UsedSessionCount
                };
            });

            res.render("index", {schedule: retVal, sessionUsage: retVal2});

        }).catch((err) => {
            res.status(500).send(err.message);
        });

    });
        

    app.get("/clients/new"), function(req, res){
        console.log("it is working")
      res.render("add-new-clients", {})
    }

    app.get("/clients/all", function(req, res) {
        db.Client.findAll({}).then(function(data) {
            res.render("table-view", {client: data});
        });
    });

    app.get("/clients/:id", function(req, res) {
        var id = req.params.id;
        db.Client.findAll({where: {
            id: id
        }}).then(function(data) {
            res.render("edit-view", {client: data});
        });
    });

    app.get("/packages/all", function(req, res){
        db.Package.findAll({

        }).then(function(response){
            // res.json(response);
            res.render("package", {package: response})
        })
    });

    app.get("/sessions/all", function(req, res) {
        db.Session.findAll({
        include: {
            model: db.Client
        }}).then(function (response) {
            res.render("table-view", {session: response});
        });
    });

    app.get("/sessions/:id", function(req, res) {
        var id = req.params.id
        db.Session.findAll({where: {
            id: id
        }}).then(function (response) {
            res.render("edit-view", {session: response});
        });
    });

    app.get("/forms", function(req,res){
        res.sendFile(path.join(__dirname, "formclient.html"));
    })
};
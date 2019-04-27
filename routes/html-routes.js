var moment = require('moment');
var db = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



module.exports = function (app) {
    app.get("/", function (req, res) {
        
        db.Session.findAll({
            include: [
                {
                    model: db.Client, 
                }
               
            ]
        }).then(function (response) {
            const retVal = response.map(r => {
                return {
                    title: r.Client.first_name +" " + r.Client.last_name,
                    start: r.schedule_date,
                    end: new Date(new Date(r.schedule_date).setHours(new Date(r.schedule_date).getHours() + 1))
                }
            })
            // res.json(retVal)
            res.render("index", {schedule: retVal});
        });
    });

    app.get("/clients/all", function(req, res) {
        console.log("a view of all clients");
    });

};
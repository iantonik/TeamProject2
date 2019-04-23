var db = require("../models");
var moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (app) {
    app.get("/", function (req, res) {
        db.Session.findAll({
            limit: 5,
            where:{
                schedule_date:{
                    [Op.gt]: moment().format()
                }
            },
            include: [
                {
                    model: db.Package, 
                    include:[{
                        model: db.Client
                    }]
                }
               
            ]
        }).then(function (response) {
            // res.json(response)
            res.render("index", {schedule: response});
        });
    });


}




var db = require("../models");
var moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (app) {
    app.get("/", function (req, res) {
        db.Session.findAll({
            limit: 5,
            where: {
                schedule_date: {
                    [Op.gt]: moment().format()
                }
            }
        }).then(function (response) {
            res.render("index", {schedule: response});
        });
    });


}




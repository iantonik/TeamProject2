var db = require("../models");
var moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (app) {


    app.post("/api/clients/new", function(req, res) {
        console.log("heres a new client");
    });

    app.put("/api/clients/edit/:id", function(req, res) {
        console.log("editing a client");
    });

};




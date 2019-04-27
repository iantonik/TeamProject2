var db = require("../models");
var moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (app) {

    app.get("/api/clients/:id", function(req, res) {
        console.log("specific client");
    });

    app.post("/api/clients/new", function(req, res) {
        console.log("heres a new client");
    });

    app.put("/api/clients/edit", function(req, res) {
        console.log("editing a client");
    });

};




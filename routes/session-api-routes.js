var db = require("../models");
var moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (app) {

app.get("/api/packages/:clientid", function(req, res) {
    console.log("a package");
})

app.get("/api/packages/:id/sessions", function(req, res) {
    console.log("specific packages sessions");
});

app.get("/api/sessions/:id", function(req, res) {
    console.log("specific session");
});

};
var db = require("../models");
var moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (app) {

app.post("/api/sessions/new", function(req, res) {
    
})

app.get("/api/packages/:id/sessions", function(req, res) {
    console.log("specific packages sessions");
});

app.get("/api/sessions/:id", function(req, res) {
    console.log("specific session");
});

};
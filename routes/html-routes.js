var moment = require('moment');

module.exports = function (app) {
    app.get("/", function(req, res) {
        res.send("A Home page");
    });

    app.get("/clients/all", function(req, res) {
        res.render("all-clients");
    });

};
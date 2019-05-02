var db = require("../models");
var moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (app) {

app.post("/api/sessions/new", function(req, res) {
    db.Session.create(req.body).then(function(data) {
        res.json(data);
    });
});

app.get("/api/sessions/client/:client_id", function(req, res) {
        var client_id = req.params.client_id
        db.Session.findAll({
            attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "client"]],
            group: ["ClientId"],
            where: {
                ClientId: client_id
            } 
        })
        .then(function(data) {
            res.json(data);
        });
    });

app.put("/api/sessions", function(req, res) {
    var id = req.body.id;
    db.Session.update(req.body,
        { where: {
            id: id
        }})
        .then(function(data) {
        res.json(data);
    });
});

app.delete("/api/sessions/:id", function(req, res) {
    var id = req.params.id;
    db.Session.destroy({
        where: {
            id: id
        }
    }).then(function(data) {
        res.json(data);
    });
})

};
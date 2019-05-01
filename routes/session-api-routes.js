var db = require("../models");
var moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (app) {

app.post("/api/sessions/new", function(req, res) {
    console.log("print req.body "+req.body);
    var promises = [];
    req.body.data.forEach(element => {
        promises.push(db.Session.create(element));
    });
    Promise.all(promises).then(responses => res.json(responses));
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
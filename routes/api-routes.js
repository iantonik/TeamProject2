var db = require("../models");

module.exports = function (app){
    app.get("/", function(req, res){
        db.Team.findAll({}).then(function(dbTeam){
            //res.json(dbTeam)
            res.render("index", {member: dbTeam})
        })
    })
}
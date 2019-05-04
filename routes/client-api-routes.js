var db = require("../models");
var moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (app) {
  app.get("/api/clients", function (req, res) {
    db.Client.findAll().then(result => res.json(result));
  });

  app.post("/api/clients/new", function (req, res) {
    console.log("heres a new client");
    db.Client.create(req.body).then(function (dbClient) {
      res.json(dbClient);
    });
  });

  //omar: added another put method for inline edit functionality
  app.put("/api/clients/:id", function (req, res) {
    console.log("updateClient function called... passthru to PUT");

    var id = req.params.id;
    var clientObj = {};
    if (req.body.first_name) clientObj.first_name = req.body.first_name;
    if (req.body.last_name) clientObj.last_name = req.body.last_name;
    if (req.body.email) clientObj.email = req.body.email;
    if (req.body.address) clientObj.address = req.body.address;
    if (req.body.phone_number) clientObj.phone_number = req.body.phone_number;
    if (req.body.gender) clientObj.gender = req.body.gender;
    if (req.body.age) clientObj.age = req.body.age;
    if (req.body.weight) clientObj.weight = req.body.weight;

    db.Client.update(clientObj, {
      where: {
        id: id
      }
    }).then(function (dbClient) {
      res.json(dbClient);
    });
  });


  //omar: not used?
  app.put("/api/clients/edit/:id", function (req, res) {
    console.log("editing a client");
    db.Client.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    ).then(function (dbClients) {
      res.json(dbClients);
    });
  });

  app.delete("/api/clients/:id", function (req, res) {
    db.Client.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbClient) {
      res.json(dbClient);
    });
  });


  app.get("/api/count", function (req, res) {
    db.Client.findAll({
      attributes: ['id', 'first_name', 'last_name'],
      include: [{
        model: db.Session,
        attributes: ['PurchaseId', [Sequelize.fn('COUNT', 'if(Sessions.executed_Date is null, null, 1)'), 'UsedSessionCount']],
      }],
      group: ['id','PurchaseId'],
      raw: true

    }).then(function (data) {
      res.json(data)
    });
  });

app.get("/api/count2", function(req, res){
  db.Client.findAll({
    attributes: ['id', 'first_name', 'last_name'],
    
    include: [{
      model: db.Purchase,
      attributes: ['id','workout_type', 'session_count'],
      
      include: [{
        model: db.Session,
        attributes: ['PurchaseId', [Sequelize.fn('COUNT', 'if(Sessions.executed_Date is null, null, 1)'), 'UsedSessionCount']]
        
      }]
    }],
    group: ['Client.id', Sequelize.col('Purchase.id'), Sequelize.col('Session.PurchaseId')],
  }).then(function(data){
    res.json(data)
  })
})

  

  app.get("/api/ab", function(req, res){
    db.Session.findAll({

      attributes: ['Session.PurchaseId',  [Sequelize.fn('COUNT', Sequelize.col('Session.executed_date')), 'UsedSessionCount']],

      include: [
        {model: db.Purchase, attributes: ['Id', 'ClientId', 'session_count', 'workout_type']}, 
        {model: db.Client, attributes: ['first_name', 'last_name']}
      ],

      group: ['Session.PurchaseId', 'Client.Id']

    }).then(function (data) {
      res.json(data)
    });
    
  })

  app.get("/api/a", function(req, res){
    db.Session.findAll({

      attributes: ['Session.PurchaseId',  [Sequelize.fn('COUNT', Sequelize.col('Session.executed_date')), 'UsedSessionCount']],

      include: [{model: db.Purchase, attributes: ['Id', 'ClientId', 'session_count']}
      ],

      group: ['Session.PurchaseId']

    }).then(function (data) {
      res.json(data)
    });
    
  })

};







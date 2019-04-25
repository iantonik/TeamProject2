const express= require ('express');

const port = process.env.PORT || 8080;
const app = express();

const db = require("./models")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//handlebars
const exphbs = require ('express-handlebars')
app.set('views', "public/views/")
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var handlebars = require('handlebars');
handlebars.registerHelper('moment', require('helper-moment'));

// Routes
require("./routes/html-routes.js")(app);
require("./routes/client-api-routes.js")(app);
require("./routes/session-api-routes.js")(app);



db.sequelize.sync().then(function() {
    app.listen(port, function() {
      console.log(`Running server on port ${port}`);
    });
  });
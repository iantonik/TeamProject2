const express= require ('express');

const port = process.env.PORT || 8080;
const app = express();

const db = require("./models")
const path = require('path')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('public'))
app.use('/node_modules', express.static(path.join(__dirname,'node_modules')));

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
require("./routes/package-api-routes.js")(app);
require("./routes/purchase-api-routes")(app);



db.sequelize.sync().then(function() {
    app.listen(port, function() {
      console.log(`Running server on port ${port}`);
    });
  });
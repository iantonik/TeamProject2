var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "mwgmw3rs78pvwk4e.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "a1gikt10mwn4f5js",
        password: "wvfjc72ushaohjer"
    });
};

connection.connect();
module.exports = connection;
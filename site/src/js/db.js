// module de connection à la bdd

const mysql = require('mysql');
const dbConfig = require('../../config/db_config.js');

const co = mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

co.connect(function(err){
    if(err) throw err;
    console.log("connexion réussie");
});

module.exports();

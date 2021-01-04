var mysql = require("mysql");

var con = mysql.createConnection({
    host:"localhost",
    port: "3306",
    user: "admin",
    password: "0000",
    database:"tshare"
});

con.connect(function(err){
    if(err) throw err;
    console.log("Connected");

    var req = "DROP TABLE Notes;";

    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Notes droped");
        
    });

    var req = "DROP TABLE Location;";

    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Location droped");
        
    });

    var req = "DROP TABLE Vetement;";

    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Vetement droped");
        
    });

    var req = "DROP TABLE Type;";

    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Type droped");
        
    });

    var req = "DROP TABLE Utilisateur;";

    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Utilisateur droped");
        con.end();
    });

});
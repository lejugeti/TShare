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

    var req = "DELETE FROM Notes;";
    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Notes deleted");
        con.query("ALTER TABLE Notes AUTO_INCREMENT = 1;", function(err, result){
            if(err) throw err;
        });
    });

    var req = "DELETE FROM Location;";
    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Location deleted");
        con.query("ALTER TABLE Location AUTO_INCREMENT = 1;", function(err, result){
            if(err) throw err;
        });
    });

    var req = "DELETE FROM Vetement;";
    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Vetement deleted");
        con.query("ALTER TABLE Vetement AUTO_INCREMENT = 1;", function(err, result){
            if(err) throw err;
        });
    });

    var req = "DELETE FROM Type;";
    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Type deleted");
        con.query("ALTER TABLE Type AUTO_INCREMENT = 1;", function(err, result){
            if(err) throw err;
        });
    });

    var req = "DELETE FROM Utilisateur;";
    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Utilisateur deleted");
        con.query("ALTER TABLE Utilisateur AUTO_INCREMENT = 1;", function(err, result){
            if(err) throw err;
        });
        con.end();
    });

});
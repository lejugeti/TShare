var mysql = require("mysql");

var con = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"admin",
    password:"0000",
    database:"tshare"
});

con.connect(function(err){
    if(err) throw err;
    console.log("connected");

    var req = "INSERT INTO Utilisateur VALUES(0, 'homme', 'parize', 'antoine', 23, 'maison', 'aparize@ensc.fr', 36303630);";

    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Utilisateur créé");
    });

    req = "INSERT INTO Utilisateur VALUES(0, 'femme', 'esquirol', 'juliette', 21, 'maison2', 'jesquirol@ensc.fr', 36303630);";
    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Utilisateur créé");
    });

    req = "INSERT INTO Notes VALUES(0, 1, 2, 5, 'bof','2020-10-20 20:20:2020');"
    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Note créée");
    });
    
    con.end();
});
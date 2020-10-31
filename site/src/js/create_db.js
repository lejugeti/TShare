var mysql = require("mysql")

// création bdd
var con = mysql.createConnection({
    host:"localhost",
    // port: "8080",
    user: "aparize",
    password: "0000"
});

con.connect(function(err){
    if(err) throw err;
    console.log("Connected");
    con.query("CREATE DATABASE tshare", function(err, result){
        if(err) throw err;
        console.log("Database created");
    });
});

con.end();

// création des tables de la bdd
var con = mysql.createConnection({
    host: "localhost",
    user: "aparize",
    password: "0000",
    database: "TShare"
});

// con.connect(function(err){
//     if(err) throw err;
//     console.log("Connected");

//     var req = "CREATE TABLE Utilisateur (idUtilisateur INT NOT NULL AUTO_INCREMENT,\
//         genre VARCHAR(100),\
//         nom VARCHAR(100) NOT NULL,\
//         prenom VARCHAR(100) NOT NULL,\
//         age INT,\
//         adresse VARCHAR(100),\
//         email VARCHAR(100) NOT NULL,\
//         telephone INT,\
//         PRIMARY KEY (idUtilisateur)";
    
//     con.query(req, function(err, result){
//         if(err) throw err;
//         console.log("Table Utilisateur created");
//     });

//     req = "CREATE TABLE Notes (idNote INT NOT NULL AUTO_INCREMENT,\
//         idEmetteur INT NOT NULL,\
//         idRecepteur INT NOT NULL,\
//         note INT NOT NULL,\
//         commentaire VARCHAR(500),\
//         dateNote DATETIME NOT NULL DEFAULT GETDATE(),\
//         PRIMARY KEY (idNote),\
//         FOREIGN KEY (idEmetteur) REFERENCES Utilisateur(idUtilisateur),\
//         FOREIGN KEY (idRecepteur) REFERENCES Utilisateur(idUtilisateur)";

//     con.query(req, function(err, result){
//         if(err) throw err;
//         console.log("Table Notes created");
//     });
// });
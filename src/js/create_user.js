var mysql = require("mysql");

var con = mysql.createConnection({
    host:"localhost",
    port: "3306",
    user: "root",
    password: "",
    database:"tshare"
});

con.connect(function(err){
    if(err) throw err;
    console.log("connected");
    
    con.query("CREATE USER admin IDENTIFIED BY '0000'", function(err){
        if(err) throw err;
        console.log("User created");
        
    });
    
    con.query("GRANT ALL ON tshare.* to admin", function(err){
        if(err) throw err;
        console.log("Privileges granted");
        console.log("Now endind connexion");
        con.end();
    })
});
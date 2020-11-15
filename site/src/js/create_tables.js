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

    var req = "CREATE TABLE IF NOT EXISTS Utilisateur\
    (\
        idUtilisateur INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        genre VARCHAR(100) NOT NULL,\
        nom VARCHAR(100) NOT NULL,\
        prenom VARCHAR(100) NOT NULL,\
        age INT NOT NULL,\
        adresse VARCHAR(100) NOT NULL,\
        email VARCHAR(100) NOT NULL,\
        telephone INT\
    );";

    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Table Utilisateur created");
    });

    req = "CREATE TABLE IF NOT EXISTS Notes\
    (\
        idNote INT NOT NULL AUTO_INCREMENT,\
        idEmetteur INT NOT NULL,\
        idRecepteur INT NOT NULL,\
        note INT NOT NULL,\
        commentaire VARCHAR(500),\
        dateNote DATETIME NOT NULL,\
        PRIMARY KEY (idNote),\
        FOREIGN KEY (idEmetteur) REFERENCES Utilisateur(idUtilisateur),\
        FOREIGN KEY (idRecepteur) REFERENCES Utilisateur(idUtilisateur)\
    )";

    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Table Notes created");
    });

    req = "CREATE TABLE IF NOT EXISTS Type\
    (\
        idType INT NOT NULL AUTO_INCREMENT,\
        label VARCHAR(100) NOT NULL,\
        idTypeParent INT,\
        PRIMARY KEY (idType)\
    )";
    //FOREIGN KEY (idTypeParent) REFERENCES Type (idType) ON DELETE SET NULL ON UPDATE SET NULL\

    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Table Type created");
    });

    con.query("INSERT INTO Type VALUES(0, 'Vêtements', null)", function(err, result){
        if(err) throw err;
        console.log("Type racine inséré");
    });

    con.query("ALTER TABLE Type ADD FOREIGN KEY(idTypeParent) REFERENCES Type(idType) ON DELETE SET NULL ON UPDATE SET NULL;", function(err, result){
        if(err) throw err;
        console.log("Clé étrangère Type ajoutée");
    })

<<<<<<< HEAD
    req = "CREATE TABLE IF NOT EXISTS Notes\
    (\
        idNote INT NOT NULL AUTO_INCREMENT,\
        idEmetteur INT NOT NULL,\
        idRecepteur INT NOT NULL,\
        note INT NOT NULL,\
        commentaire VARCHAR(500),\
        dateNote DATETIME NOT NULL,\
        PRIMARY KEY (idNote),\
        FOREIGN KEY (idEmetteur) REFERENCES Utilisateur(idUtilisateur),\
        FOREIGN KEY (idRecepteur) REFERENCES Utilisateur(idUtilisateur)\
    )";

    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Table Notes created");
    });

=======
>>>>>>> api_paul
    req = "CREATE TABLE IF NOT EXISTS Vetement\
    (\
        idVetement INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        idProprietaire INT NOT NULL,\
        idType INT NOT NULL,\
        dateDebutDispo DATETIME NOT NULL,\
        dateFinDispo DATETIME,\
        taille VARCHAR(100) NOT NULL,\
        etat VARCHAR(100) NOT NULL,\
        genre VARCHAR(100) NOT NULL,\
        description VARCHAR(500),\
        prix DOUBLE NOT NULL,\
        conditionRetour VARCHAR(100) NOT NULL,\
        caution INT NOT NULL DEFAULT 0,\
        disponible BOOLEAN NOT NULL DEFAULT true,\
        photo VARCHAR(100),\
        marque VARCHAR(100),\
        FOREIGN KEY (idProprietaire) REFERENCES Utilisateur(idUtilisateur),\
        FOREIGN KEY (idType) REFERENCES Type(idType)\
    )";
<<<<<<< HEAD

=======

>>>>>>> api_paul
    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Table Vetement created");
    });

    req = "CREATE TABLE IF NOT EXISTS Location\
    (\
        idLocation INT NOT NULL AUTO_INCREMENT,\
        idProprietaire INT NOT NULL,\
        idLocataire INT NOT NULL,\
        idVetement INT NOT NULL,\
        dateDemande DATETIME,\
        dateAcceptation DATETIME,\
        dateDebut DATETIME NOT NULL,\
        dateFinPrevue DATETIME NOT NULL,\
        dateRendu DATETIME,\
        etatDebut VARCHAR(100) NOT NULL,\
        etatFin VARCHAR(100),\
        PRIMARY KEY (idLocation),\
        FOREIGN KEY (idProprietaire) REFERENCES Utilisateur(idUtilisateur),\
        FOREIGN KEY (idLocataire) REFERENCES Utilisateur(idUtilisateur),\
        FOREIGN KEY (idVetement) REFERENCES Vetement(idVetement)\
    )";
<<<<<<< HEAD

=======

>>>>>>> api_paul
    con.query(req, function(err, result){
        if(err) throw err;
        console.log("Table Location created");
        console.log("Now ending connexion");
        con.end();
    });
});
<<<<<<< HEAD

=======
>>>>>>> api_paul

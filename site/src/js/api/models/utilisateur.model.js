const sql = require('../../db.js');

// constructeur

const Utilisateur = function(utilisateur){
    this.idUtilisateur = utilisateur.idUtilisateur,
    this.genre = utilisateur.genre,
    this.nom = utilisateur.nom,
    this.prenom = utilisateur.prenom,
    this.age = utilisateur.age,
    this.adresse = utilisateur.adresse,
    this.email = utilisateur.email,
    this.telephone = utilisateur.telephone
};

Utilisateur.create = (newUtilisateur, result) => {
    sql.query("INSERT INTO Utilisateur SET ?", newUtilisateur, (err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null);
            return;
        }

        console.log("utilisateur créé : ", {idUtilisateur: newUtilisateur.idUtilisateur, ...newUtilisateur});
    })
};

Utilisateur.getAll = result => {
    sql.query("SELECT * FROM Utilisateur", (err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null);
            return;
        }

        console.log("utilisateurs:", res);
        result(null, res);
        return;
    });
};

Utilisateur.findById = (id, result) => {
    sql.query("SELECT * FROM Utilisateur WHERE idUtilisateur = ?", id, (err, res) => {
        if(err){
            console.log("error : ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("found utilisateur", res[0]);
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    })
};

Utilisateur.updateById = (id, utilisateur, result) => {
    sql.query("UPDATE Utilisateur SET genre=?, nom=?, prenom=?, age=?, adresse=?, email=?, telephone=? WHERE idUtilisateur=?",
             [utilisateur.genre, utilisateur.nom, utilisateur.prenom, utilisateur.age, utilisateur.adresse, utilisateur.email, utilisateur.telephone, utilisateur.idUtilisateur], 
             (err, res) => {
                if(err){
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                if(res.affectedRows == 0){
                    result({kind: "not_found"}, null);
                    return;
                }

                console.log("updated Utilisateur:", {idUtilisateur: id, ...utilisateur});
                result(null, {idUtilisateur: id, ...utilisateur});  
             
            }
    );
};

Utilisateur.remove = (id, result) => {
    sql.query("DELETE FROM Utilisateur WHERE idUtilisateur = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Utilisateur with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted utilisateur with id: ", id);
      result(null, res);
    });
  };
  
  Utilisateur.removeAll = result => {
    sql.query("DELETE FROM Utilisateur", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} utilisateur`);
      result(null, res);
    });
  };
  
  module.exports = Utilisateur;
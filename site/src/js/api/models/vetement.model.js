const sql = require("../../db.js");

// constructeur

const Vetement = function (vetement) {
  (this.idVetement = vetement.idVetement),
    (this.idProprietaire = vetement.idProprietaire),
    (this.idType = vetement.idType),
    (this.dateDebutDispo = vetement.dateDebutDispo),
    (this.dateFinDispo = vetement.dateFinDispo),
    (this.taille = vetement.taille),
    (this.etat = vetement.etat),
    (this.genre = vetement.genre),
    (this.description = vetement.description),
    (this.prix = vetement.prix),
    (this.conditionRetour = vetement.conditionRetour),
    (this.caution = vetement.caution),
    (this.couleur = vetement.couleur),
    (this.disponible = vetement.disponible),
    (this.photo = vetement.photo),
    (this.marque = vetement.marque),
    (this.categorie = vetement.categorie);
};

Vetement.create = (vetement, result) => {
  sql.query("INSERT INTO Vetement SET ?", vetement, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    console.log("vetement créé : ", {
      idVetement: vetement.idVetement,
      ...vetement
    });
  });
};

Vetement.getAll = result => {
  sql.query("SELECT * FROM Vetement", (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    console.log("vetements:", res);
    result(null, res);
    return;
  });
};

Vetement.getMarques = result => {
  sql.query("SELECT DISTINCT(marque) FROM Vetement WHERE marque IS NOT NULL", (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    console.log("marques:", res);
    result(null, res);
    return;
  });
};

Vetement.getTailles = result => {
  sql.query(
    "SELECT DISTINCT(taille) FROM Vetement WHERE taille IS NOT NULL",
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      console.log("tailles:", res);
      result(null, res);
      return;
    }
  );
};

Vetement.getCouleurs = result => {
  sql.query(
    "SELECT DISTINCT(couleur) FROM Vetement WHERE couleur IS NOT NULL",
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      console.log("couleurs:", res);
      result(null, res);
      return;
    }
  );
};

Vetement.findById = (id, result) => {
  sql.query("SELECT * FROM Vetement WHERE idVetement = ?", id, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found vetement", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Vetement.updateById = (id, vetement, result) => {
  sql.query(
    "UPDATE Vetement SET idType=?, dateDebutDispo=?, dateFinDispo=?, taille=?, etat=?, genre=?, description=?, prix=?,\
     conditionRetour=?, caution=?, disponible=?, photo=?, marque=?, categorie=? WHERE idVetement =? ",
    [
      vetement.idType,
      vetement.dateDebutDispo,
      vetement.dateFinDispo,
      vetement.taille,
      vetement.etat,
      vetement.genre,
      vetement.description,
      vetement.prix,
      vetement.conditionRetour,
      vetement.caution,
      vetement.disponible,
      vetement.photo,
      vetement.marque,
      vetement.categorie,
      id
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Vetement:", { idVetement: id, ...vetement });
      result(null, { idVetement: id, ...vetement });
    }
  );
};

Vetement.remove = (id, result) => {
  sql.query("DELETE FROM Vetement WHERE idVetement = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Vetement with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted vetement with id: ", id);
    result(null, res);
  });
};

Vetement.removeAll = result => {
  sql.query("DELETE FROM Vetement", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} vetement`);
    result(null, res);
  });
};

module.exports = Vetement;

const sql = require("../../db.js");

// constructeur

const Location = function(location) {
  (this.idLocation = location.idLocation),
    (this.idProprietaire = location.idProprietaire),
    (this.idLocataire = location.idLocataire),
    (this.idVetement = location.idVetement),
    (this.dateDemande = location.dateDemande),
    (this.dateAcceptation = location.dateAcceptation),
    (this.dateDebut = location.dateDebut),
    (this.dateFinPrevue = location.dateFinPrevue),
    (this.dateRendu = location.dateRendu),
    (this.etatDebut = location.etatDebut),
    (this.etatFin = location.etatFin);
};

Location.create = (newLocation, result) => {
  sql.query("INSERT INTO Location SET ?", newLocation, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    console.log("location créée : ", {
      idLocation: newLocation.idLocation,
      ...newLocation
    });
  });
};

Location.getAll = result => {
  sql.query("SELECT * FROM Location", (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    console.log("locations:", res);
    result(null, res);
    return;
  });
};

Location.findById = (id, result) => {
  sql.query("SELECT * FROM Location WHERE idLocation = ?", id, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found location", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Location.updateById = (id, location, result) => {
  sql.query(
    "UPDATE Location SET dateDemande=?, dateAcceptation=?, dateDebut=?, dateFinPrevue=?, dateRendu=?, etatDebut=?, etatFin=? WHERE idLocation=?",
    [
      location.dateDemande,
      location.dateAcceptation,
      location.dateDebut,
      location.dateFinPrevue,
      location.dateRendu,
      location.etatDebut,
      location.etatFin,
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

      console.log("updated Location:", { idLocation: id, ...location });
      result(null, { idLocation: id, ...location });
    }
  );
};

Location.remove = (id, result) => {
  sql.query("DELETE FROM Location WHERE idLocation = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Location with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted location with id: ", id);
    result(null, res);
  });
};

Location.removeAll = result => {
  sql.query("DELETE FROM Location", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} location`);
    result(null, res);
  });
};

module.exports = Location;

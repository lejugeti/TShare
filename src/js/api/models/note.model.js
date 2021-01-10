const sql = require('../../db.js');

const Note=function(note){
  this.idNote = note.idNote;
  this.idEmetteur = note.idEmetteur;
  this.idRecepteur = note.idRecepteur;
  this.note = note.note;
  this.commentaire = note.commentaire;
  this.dateNote = note.dateNote;
};

Note.create = (newNote, result) => {
  sql.query("INSERT INTO Notes SET ?", newNote, (err, res) => {
    if(err){
      console.log("error: ",err);
      result(err,null);
      return;
    }

    console.log("Created customer: ", {idNote: newNote.idNote, ...newNote});
  });
};

Note.getAll = result => {
  sql.query("SELECT * FROM Notes", (err, res) =>  {
    if(err){
      console.log("error :", err);
      result(err, null);
      return;
    }

    console.log("Notes: ", res);
    result(null, res);
    return;
  });
};

Note.findById = (id, result) => {
  sql.query("SELECT * FROM Notes WHERE idNote = ?", id, (err,res) => {
    if(err){
      console.log("error: ",err);
      result(err, null);
      return;
    }

    if(res.length){
      console.log("found note", res[0]);
      result(null, res[0]);
      return;
    }

    result({kind: "not_found"}, null);

  });
};

Note.findByUserId = (id, result) => {
  sql.query("SELECT * FROM Notes WHERE idRecepteur = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Notes: ", res);
    result(null, res);
    return;
  });
};

Note.findReceived = (id,result) => {
  sql.query("SELECT (SELECT CONCAT(prenom,' ',nom) FROM utilisateur WHERE idUtilisateur = idEmetteur) as 'Emetteur', note as 'Note', commentaire as 'Commentaire', dateNote as 'Date' FROM notes WHERE idRecepteur = ?", id, (err,res) => {
    if(err){
      console.log("error: ",err);
      result(err, null);
      return;
    }

    console.log("found notes", res);
    result(null,res);

  });
}
Note.findSended = (id,result) => {
  sql.query("SELECT (SELECT CONCAT(prenom,' ',nom) FROM utilisateur WHERE idUtilisateur = idRecepteur) as 'Recepteur', note as 'Note', commentaire as 'Commentaire', dateNote as 'Date' FROM notes WHERE idEmetteur = ?", id, (err,res) => {
    if(err){
      console.log("error: ",err);
      result(err, null);
      return;
    }

    console.log("found notes", res);
    result(null,res);
  });
}

Note.updateById = (id, note, result) => {
  sql.query(
    "UPDATE Notes SET idRecepteur = ?, idEmetteur = ?, note = ?, commentaire = ?, dateNote = ? WHERE idNote = ?",
    [note.idRecepteur, note.idEmetteur, note.note, note.commentaire, note.dateNote, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated note: ", { id: id, ...note });
      result(null, { id: id, ...note });
    }
  );
};

Note.remove = (id, result) => {
  console.log("id :: "+id);
  sql.query("DELETE FROM Notes WHERE idNote = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted note with id: ", id);
    result(null, res);
  });
};

Note.removeAll = result => {
  sql.query("DELETE FROM Notes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} notes`);
    result(null, res);
  });
};

module.exports = Note;

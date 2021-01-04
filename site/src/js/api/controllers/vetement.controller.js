const Vetement = require("../models/vetement.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Créer un vetement
  const vetement = new Vetement({
    idVetement: req.body.idVetement,
    idProprietaire: req.body.idProprietaire,
    idType: req.body.idType,
    titre: req.body.titre,
    dateDebutDispo: req.body.dateDebutDispo,
    dateFinDispo: req.body.dateFinDispo,
    taille: req.body.taille,
    etat: req.body.etat,
    genre: req.body.genre,
    description: req.body.description,
    prix: req.body.prix,
    conditionRetour: req.body.conditionRetour,
    caution: req.body.caution,
    disponible: req.body.disponible,
    photo: req.body.photo,
    marque: req.body.marque,
    categorie: req.body.categorie,
    localisation: req.body.localisation,
    couleur: req.body.couleur
  });

  // Save vetement in the database
  Vetement.create(vetement, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating vetement."
      });
    else res.send(data);
  });
};

exports.getAll = (req, res) => {
  Vetement.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "error lors de la récupération des vetements"
      });
    else res.send(data);
  });
};

exports.getById = (req, res) => {
  Vetement.findById(req.params.idVetement, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found vetement with id ${req.params.idVetement}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving vetement with id " + req.params.idVetement
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Vetement.updateById(
    req.params.idVetement,
    new Vetement(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Vetement with id ${req.params.idVetement}.`
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Vetement with id " + req.params.idVetement
          });
        }
      } else res.send(data);
    }
  );
};

exports.deleteById = (req, res) => {
  Vetement.remove(req.params.idVetement, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Vetement with id ${req.params.idVetement}.`
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Vetement with id " + req.params.idVetement
        });
      }
    } else res.send({ message: `Vetement was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Vetement.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Vetements."
      });
    else res.send({ message: `All Vetements were deleted successfully!` });
  });
};

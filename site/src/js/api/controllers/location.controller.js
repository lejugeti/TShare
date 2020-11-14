const Location = require("../models/location.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Créer une location
  const location = new Location({
    idLocation: req.body.idLocation,
    idProprietaire: req.body.idProprietaire,
    idLocataire: req.body.idLocataire,
    idVetement: req.body.idVetement,
    dateDemande: req.body.dateDemande,
    dateAcceptation: req.body.dateAcceptation,
    dateDebut: req.body.dateDebut,
    dateFinPrevue: req.body.dateFinPrevue,
    dateRendu: req.body.dateRendu,
    etatDebut: req.body.etatDebut,
    etatFin: req.body.etatFin
  });

  // Save location in the database
  Location.create(location, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating location."
      });
    else res.send(data);
  });
};

exports.getAll = (req, res) => {
  Location.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "error lors de la récupération des locations"
      });
    else res.send(data);
  });
};

exports.getById = (req, res) => {
  Location.findById(req.params.idLocation, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found location with id ${req.params.idLocation}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving location with id " + req.params.idLocation
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

  Location.updateById(
    req.params.idLocation,
    new Location(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Location with id ${req.params.idLocation}.`
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Location with id " + req.params.idLocation
          });
        }
      } else res.send(data);
    }
  );
};

exports.deleteById = (req, res) => {
  Location.remove(req.params.idLocation, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Location with id ${req.params.idLocation}.`
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Location with id " + req.params.idLocation
        });
      }
    } else res.send({ message: `Location was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Location.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Locations."
      });
    else res.send({ message: `All Locations were deleted successfully!` });
  });
};

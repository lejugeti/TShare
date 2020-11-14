const Type = require("../models/type.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Créer un type
    const type = new Type({
        idType: req.body.idType,
        label: req.body.label,
        idTypeParent: req.body.idTypeParent
    });
  
    // Save type in the database
    Type.create(type, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating type."
        });
      else res.send(data);
    });
};

exports.getAll = (req, res) => {
    Type.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "error lors de la récupération des types"
        });
        else res.send(data);
    });
};

exports.getById = (req, res) => {
    Type.findById(req.params.idType, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found type with id ${req.params.idType}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving type with id " + req.params.idType
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

    Type.updateById(
        req.params.idType,
        new Type(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Type with id ${req.params.idType}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Type with id " + req.params.idType
            });
            }
        } else res.send(data);
        }
    );
};

exports.deleteById = (req, res) => {
    Type.remove(req.params.idType, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Type with id ${req.params.idType}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Type with id " + req.params.idType
          });
        }
      } else res.send({ message: `Type was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Type.removeAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all Types."
        });
        else res.send({ message: `All Types were deleted successfully!` });
    });
};
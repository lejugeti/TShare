const Utilisateur = require("../models/utilisateur.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Créer un utilisateur
    const utilisateur = new Utilisateur({
        idUtilisateur: req.body.idUtilisateur,
        genre: req.body.genre,
        nom: req.body.nom,
        prenom: req.body.prenom,
        dateDeNaissance: req.body.dateDeNaissance,
        adresse: req.body.adresse,
        email: req.body.email,
        telephone: req.body.telephone,
        motDePasse: req.body.motdepasse
    });

    Utilisateur.isMailUsed(utilisateur.email, (err, data) => {
      if(data === 0) {
        // Save utilisateur in the database
        Utilisateur.create(utilisateur, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating utilisateur."
            });
          else res.send(data);
        });
      }
      else res.send({
        message: "Email address already used"
      });
    });
  
};

exports.getAll = (req, res) => {
    Utilisateur.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "error lors de la récupération des utilisateurs"
        });
        else res.send(data);
    });
};

exports.getById = (req, res) => {
    Utilisateur.findById(req.params.idUtilisateur, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found utilisateur with id ${req.params.idUtilisateur}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving utilisateur with id " + req.params.idUtilisateur
          });
        }
      } else res.send(data);
    });
};

exports.tryFindUser = (req, res) => {
  if(!req.query) {
    res.status(400).send({
    message: "Content can not be empty!"
    });
  }
  else{
    Utilisateur.userExistWithEmail(req.query.email, req.query.motdepasse, (err, data) => {
      if(err){
        if(err.kind === "not_exist")
          res.send({
            message: "Invalid information"
          });
        else
          res.status(500).send({
            message: "Error searching profil for connexion with email " + req.query.email
          });
      }else res.send(data)
    });
  }
};

// UPDATE 

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    Utilisateur.updateById(
        req.params.idUtilisateur,
        new Utilisateur(req.body),
        (err, data) => {
          if (err) {
              if (err.kind === "not_found") {
              res.status(404).send({
                  message: `Not found Utilisateur with id ${req.params.idUtilisateur}.`
              });
              } else {
              res.status(500).send({
                  message: "Error updating Utilisateur with id " + req.params.idUtilisateur
              });
              }
          } else res.send(data);
        }
    );
};

exports.updateRow = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if(req.params.row === "email"){
    
    Utilisateur.userExistWithId(req.params.idUtilisateur,req.body.mdp, (err, data) => {
      if(err){
        if(err.kind === "not_exist")
          res.send({
            message: "Invalid information"
          });
        else
          res.status(500).send({
            message: "Error searching profil for connexion with email " + req.query.email
          });
      } else {
        Utilisateur.updateRowById(
          req.params.idUtilisateur,
          req.params.row,
          req.body.modif,
          (err, data) => {
            if (err) {
              if (err.kind === "not_found")
                res.status(404).send({
                  message: `Not found Utilisateur with id ${req.params.idUtilisateur}.`
                });
              else
                res.status(500).send({
                  message: "Error updating Utilisateur with id " + req.params.idUtilisateur
                });
            } else res.send(data);
          });
      }
    });
  } else {
    Utilisateur.updateRowById(
      req.params.idUtilisateur,
      req.params.row,
      req.body.modif,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found")
            res.status(404).send({
              message: `Not found Utilisateur with id ${req.params.idUtilisateur}.`
            });
          else
            res.status(500).send({
              message: "Error updating Utilisateur with id " + req.params.idUtilisateur
            });
        } else res.send(data);
      });
  }
};

exports.deleteById = (req, res) => {
    Utilisateur.remove(req.params.idUtilisateur, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Utilisateur with id ${req.params.idUtilisateur}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Utilisateur with id " + req.params.idUtilisateur
          });
        }
      } else res.send({ message: `Utilisateur was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Utilisateur.removeAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all Utilisateurs."
        });
        else res.send({ message: `All Utilisateurs were deleted successfully!` });
    });
};
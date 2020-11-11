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
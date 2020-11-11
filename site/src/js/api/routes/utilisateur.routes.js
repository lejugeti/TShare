module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controller.js");

    app.post("/utilisateur", utilisateur.create);

    app.get("/utilisateur", utilisateur.getAll);

    app.get("/utilisateur/:idUtilisateur", utilisateur.getById);

    app.put("utilisateur/:idUtilisateur", utilisateur.update);

    app.delete("/utilisateur", utilisateur.deleteAll);

    app.delete("/utilisateur/:idUtilisateur", utilisateur.deleteById);
};
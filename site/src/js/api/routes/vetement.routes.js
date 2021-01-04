module.exports = app => {
    const vetement = require("../controllers/vetement.controller.js");

    app.post("/vetement", vetement.create);

    app.get("/vetements", vetement.getAll);

    app.get("/vetement/marques", vetement.getMarques);

    app.get("/vetement/tailles", vetement.getTailles);

    app.get("/vetement/couleurs", vetement.getCouleurs);

    app.get("/vetement/:idVetement", vetement.getById);

    app.put("/vetement/:idVetement", vetement.update);

    app.delete("/vetements", vetement.deleteAll);

    app.delete("/vetement/:idVetement", vetement.deleteById);
};
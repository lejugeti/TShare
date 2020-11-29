module.exports = app => {
    const location = require("../controllers/location.controller.js");

    app.post("/location", location.create);

    app.get("/locations", location.getAll);

    app.get("/location/:idLocation", location.getById);

    app.put("/location/:idLocation", location.update);

    app.delete("/locations", location.deleteAll);

    app.delete("/location/:idLocation", location.deleteById);
};
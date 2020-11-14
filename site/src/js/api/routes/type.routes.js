module.exports = app => {
    const type = require("../controllers/type.controller.js");

    app.post("/type", type.create);

    app.get("/type", type.getAll);

    app.get("/type/:idType", type.getById);

    app.put("/type/:idType", type.update);

    app.delete("/type", type.deleteAll);

    app.delete("/type/:idType", type.deleteById);
};
module.exports = app => {
  const note = require("../controllers/note.controller.js");

  app.post("/note", note.create);

  app.get("/note", note.findAll);

  app.get("/note/:noteId", note.findOne);

  app.get("/note/received/:idUtilisateur", note.findReceivedBy);

  app.get("/note/sended/:idUtilisateur", note.findSendedBy);

  app.put("/note/:noteId", note.update);

  app.delete("/note/:noteId", note.delete);

  app.delete("/note", note.deleteAll);
};

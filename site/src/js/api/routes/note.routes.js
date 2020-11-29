module.exports = app => {
  const note = require("../controllers/note.controller.js");

  // Create a new Customer
  app.post("/note", note.create);

  // Retrieve all note
  app.get("/note", note.findAll);

  // Retrieve a single Customer with customerId
  app.get("/note/:noteId", note.findOne);

  // Retrieve the note of a specific user
  app.get("/noteUser/:userId", note.findUser);

  // Update a Customer with customerId
  app.put("/note/:noteId", note.update);

  // Delete a Customer with customerId
  app.delete("/note/:noteId", note.delete);

  // Create a new Customer
  app.delete("/note", note.deleteAll);
};

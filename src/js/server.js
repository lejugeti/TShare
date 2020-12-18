const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

//cors config
app.use(cors({
  origin: "http://localhost:8080"
}));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
res.json({ message: "C'est chi c'est po c'est chipo" });
});

// defines the routes for the server
require("./api/routes/type.routes.js")(app);
require("./api/routes/note.routes.js")(app);
require("./api/routes/utilisateur.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
console.log("Server is running on port 3000.");
});

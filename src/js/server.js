const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

//cors config
app.use(cors({
  origin: "http://localhost:8080",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200
}));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
res.json({ message: "C'est chi c'est po c'est chipo" });
});

// stockage images
app.use(function(err, req, res, next) {
  if(err.code==="LIMIT_FILE_TYPES"){
      res.status(422).json({error: "Only images are allowed"})
      return;
  }
  if(err.code==="LIMIT_FILE_SIZE"){
      res.status(422).json({error: `Too large. Max size is ${500000/1000}Kb`})
      return;
  }
});

// defines the routes for the server
require("./api/routes/type.routes.js")(app);
require("./api/routes/note.routes.js")(app);
require("./api/routes/utilisateur.routes.js")(app);
require("./api/routes/location.routes.js")(app);
require("./api/routes/vetement.routes.js")(app);
require("./api/routes/upload.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
console.log("Server is running on port 3000.");
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
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

// stockage images
const fileFilter = function(req, file, cb){
  const allowedTypes = ["image/jpeg", "image/png"];

  if(!allowedTypes.includes(file.mimetype)){
      const error = new Error("Wrong file type");
      error.code = "LIMIT_FILE_TYPES";
      return cb(error, false);
  }
  cb(null, true);
}

var storage = multer.diskStorage({
  destination: function(req, file, cb){
      cb(null, "./src/assets/vetements/");
  },
  filename: function(req, file, cb){
      cb(null, file.originalname)
  }

})
var upload = multer({
  storage: storage,
  fileFilter,
  limits:{
      fileSize: 200000
  }
});

app.post("/upload", upload.single("file"), (req, res)=> console.log("bonjour"));

app.use(function(err, req, res, next){
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

// set port, listen for requests
app.listen(3000, () => {
console.log("Server is running on port 3000.");
});

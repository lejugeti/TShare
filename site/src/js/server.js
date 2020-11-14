const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require("path"); 
var multer = require("multer");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());
  
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
    origin: "http://localhost:8080",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

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

// defines the routes for the server
require("./api/routes/type.routes.js")(app);
require("./api/routes/note.routes.js")(app);
require("./api/routes/utilisateur.routes.js")(app);
require("./api/routes/location.routes.js")(app);
require("./api/routes/vetement.routes.js")(app);
require("./api/routes/type.routes.js")(app);

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
})
// set port, listen for requests
app.listen(3000, () => {
console.log("Server is running on port 3000.");
});

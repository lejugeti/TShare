module.exports = (app) => {
  const multer = require("multer");

  const fileFilter = function(req, file, cb){
    const allowedTypes = ["image/jpeg", "image/png"];

    if(!allowedTypes.includes(file.mimetype)){
        //const error = new Error("Wrong file type");
        //error.code = "LIMIT_FILE_TYPES";
        req.res.send({ error: "Wrong file type"})
        //return cb(error, false);
    }
    cb(null, true);
  }

  const storage = multer.diskStorage({
    destination: function(req, file, cb){
      if(req.query.type == 'profil'){
        cb(null, "../assets/profils/");
      } else {
        cb(null, "../assets/vetements/");
      }
    },
    filename: function(req, file, cb){
        if(req.query.type == 'profil'){
          if(file.mimetype == 'image/png'){
            cb(null, req.query.id + '.png');
          } else if(file.mimetype == 'image/jpeg'){
            cb(null, req.query.id + '.jpeg');
          }
        } else {
          cb(null, file.originalname);
        }
    }
  })

  const upload = multer({
    storage: storage,
    fileFilter,
    limits:{
        fileSize: 10000000
    }
  });
  
  app.post("/upload", upload.single("file"), function (req, res, next) {
    res.send({message: "Image " + req.file.originalname + " upload", filename: req.file.filename});
    console.log(req.file);
  });
};
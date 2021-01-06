module.exports = (app) => {
  const multer = require("multer");

  const fileFilter = function(req, file, cb){
    const allowedTypes = ["image/jpeg", "image/png"];
  
    if(!allowedTypes.includes(file.mimetype)){
        const error = new Error("Wrong file type");
        error.code = "LIMIT_FILE_TYPES";
        return cb(error, false);
    }
    cb(null, true);
  }

  const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "../assets/vetements/");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
  })

  const upload = multer({
    storage: storage,
    fileFilter,
    limits:{
        fileSize: 200000
    }
  });
  
  app.post("/upload", upload.single("file"), function (req, res, next) {
    console.log("req.file");
  });
};
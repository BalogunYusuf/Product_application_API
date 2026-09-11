const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
})

const upload = multer({storage: storage});

module.exports = upload

//run
//npm install multer cloudinary

//multer is an express node js. middleware that is used to handle file upload
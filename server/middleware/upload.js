const upload = multer({storage});

//Speicherort festlegen
const storage = multer.diskStorage({
    destination: "../../images/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

module.exports = multer({storage});
const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();

app.use(express.json());
// Frontend an client ausliefern
app.use(express.static(path.join(__dirname, "../client")));


//Speicherort festlegen
const storage = multer.diskStorage({
    destination: "../images/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage});


app.post("/image/upload", upload.single("bild"), (req, res) => {
    console.log(req.file);  //Bild ist hier drin
    res.json({ success: true });
});


app.listen(3000, () => console.log("Server läuft auf Port 3000"));
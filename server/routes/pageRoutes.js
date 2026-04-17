//Liefert die html Seiten aus

const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/index.html"));
});

router.get("/upload", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/imageUpload.html"));
});

module.exports = router;
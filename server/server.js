const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// Frontend an client ausliefern
app.use(express.static(path.join(__dirname, "../client")));

app.post("/image/upload", (req, res) => {
    console.log(req.body);
    res.json({ success: true });
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
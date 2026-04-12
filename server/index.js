const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

app.use("/image", require("./routes/imageRoutes"));

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
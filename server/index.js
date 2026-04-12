const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

app.use("/", require("./routes/pageRoutes"));  //Start seite
app.use("/image", require("./routes/imageRoutes")); //Image upload seite

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
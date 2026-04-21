const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

// schickt HTML zurück → Browser zeigt eine Seite an
app.use("/", require("./routes/pageRoutes"));

// kein sichtbarer Seitenwechsel, nur Daten im Hintergrund
app.use("/image", require("./routes/imageRoutes"));

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
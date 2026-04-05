const express = require("express");

const server = express();

server.listen(5000, () => {
  console.log("Server läuft auf Port 5000");
});
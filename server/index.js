const express = require("express");
const path = require("path");
const app = express();
const port = 9999;

app.use(express.static(path.join(__dirname, "../public/dist")));

app.listen(port, console.log(`Listening on port ${port}...`));

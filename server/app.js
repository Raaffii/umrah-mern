const express = require("express");
const multer = require("multer");
const cors = require("cors");
const routerApi = require("./src/routes/Api.js");
const path = require("path");
const methodOverride = require("method-override");
// Express setup
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//setup method override
app.use(methodOverride("_method"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "An error occurred during the upload." });
});

app.use("/api", routerApi);

app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});

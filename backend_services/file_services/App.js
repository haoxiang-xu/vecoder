const express = require("express");
const http = require("http");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const { doc } = require("prettier");
require("dotenv").config();

const insertFilesController = require("./CONTROLLERs/insertFilesController");
const getFilesController = require("./CONTROLLERs/getFilesController");

const app = express();
const PORT = process.env.BACKEND_FILE_SERVICES_PORT;
const cors_options = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("[SERVER ERROR]");
});

connect_to_database();

app.use(express.json());
app.use(cors(cors_options));

app.use("/insertFiles", insertFilesController);
app.use("/getFiles", getFilesController);

http.createServer(app).listen(PORT, () => {
  console.log("[SERVER RUNNING ON " + PORT + "]");
});

async function connect_to_database() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[DATABASE CONNECTED]");
  } catch (err) {
    console.error("[DATABASE CONNECTION ERROR: " + err + "]");
    process.exit(1);
  }
}

const express = require("express");
const http = require("http");
const cors = require("cors");
const multer = require("multer");
const { doc } = require("prettier");
require("dotenv").config();

const openAIController = require("./CONTROLLERs/openAIController");
const ASTController = require("./CONTROLLERs/ASTController");

const app = express();
const PORT = process.env.BACKEND_CODE_SERVICES_PORT;
const cors_options = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("[SERVER ERROR]");
});

app.use(express.json());
app.use(cors(cors_options));

app.use("/openAI", openAIController);
app.use("/AST", ASTController);

http.createServer(app).listen(PORT, () => {
  console.log("[SERVER RUNNING ON " + PORT + "]");
});

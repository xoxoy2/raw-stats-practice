const express = require("express"); // import express from 'express'
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = 3000;
const playerRoutes = require("./routes/playerRoutes.js");
const sequelize = require("./config/connection.js");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/players", playerRoutes);

// app.use(errorHandler)

sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

const express = require("express"); // import express from 'express'
const cors = require("cors");
const app = express();
const port = 3000;
const playerRoutes = require("./routes/playerRoutes.js");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/players", playerRoutes);

// app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

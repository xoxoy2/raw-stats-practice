const express = require("express"); // import express from 'express'
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = 3000;
const playerRoutes = require("./routes/playerRoutes.js");
const collegeRoutes = require("./routes/collegeRoutes.js");
const positionRoutes = require("./routes/positionRoutes.js");
const userRoutes =require("./routes/userRoutes.js");
const sequelize = require("./config/connection.js");
const {User}=require("./models")
console.log (User)

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/players", playerRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/colleges", collegeRoutes);
app.use ("/api/users", userRoutes);
// app.use(errorHandler)

sequelize.sync({force:false}).then(() => {
  console.log("Database synced");
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

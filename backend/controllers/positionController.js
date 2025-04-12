const { Position } = require("../models");

const getAllPositions = async (req, res) => {
  // get all positions using Position model
  const positions = await Position.findAll();
  res.json(positions);
};

module.exports = { getAllPositions};
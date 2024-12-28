const { College } = require("../models");

const getAllColleges = async (req, res) => {
  // get all colleges using College model
  const colleges = await College.findAll();
  res.json(colleges);
};

module.exports = { getAllColleges};
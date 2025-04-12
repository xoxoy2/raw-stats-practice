const { College } = require("../models");

const getAllColleges = async (req, res) => {
  // get all colleges using College model
  const colleges = await College.findAll();
  res.json(colleges);
};

const createCollege = async (req, res) => {
  // Add a colleges using College model
  const college= await College.create(req.body)
  res.json(college);
};

module.exports = { getAllColleges,createCollege};
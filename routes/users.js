const User = require('../models/users');

async function create(req, res, next) {
  try {
    const user = new User(req.body);
    await user.save(); // To store user data into db
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
}

module.exports = {create};
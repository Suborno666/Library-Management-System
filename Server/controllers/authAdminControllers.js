require('dotenv').config();

const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = models.user;

exports.login = async(req,res,next) => {
  const user = await models.admin.findOne({ where: { username: req.body.username } });
  if (user) {
    const password_valid = await bcrypt.compare(req.body.password, user.password);
    if (password_valid) {
      const token = jwt.sign(
        {
          username: req.body.username
        },
        process.env.SECRET
      );
      res.status(200).json({ 
        message:"Logged in successfully",
        token: token 
      });
    } else {
      res.status(404).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ error: "Anonymous user" });
  }
}


exports.getUser = async (req,res,next) => {
  try {
    const user = await models.admin.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ["password"] },
    });
    if (user === null) {
      res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.sendStatus(500).json({ msg: "Cannot retrieve user data" });
  }
}
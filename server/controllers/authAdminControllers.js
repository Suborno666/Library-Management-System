require('dotenv').config();

const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async(req,res,next) => {
    const user = await models.User.findOne({ where: { username: req.body.username } });
    if (user) {
      const password_valid = await bcrypt.compare(req.body.password, user.password);
      if (password_valid) {
        const token = jwt.sign(
          {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            age: user.age,
            role: user.role
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
      res.status(404).json({ error: "Anonymous admin" });
    }
}







const models = require('../models');
const bcrypt =  require('bcrypt');

exports.findAll = async (req, res) => {
    try {
        const users = await models.User.findAll({where:{role:"admin"}})
        res.status(200).json(users); // Send the users as a JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAdmin = async (req, res, next) => {
    try {
      const user = await models.User.findOne({
        where: { id: req.params.id }, // You should use req.params.id to get the user ID
        attributes: { exclude: ["password"] },
      });
      if (user === null) {
        res.status(404).json({ msg: "User not found" });
      } else {
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json({ msg: "Could not retrieve user data", error: err.message });
    }
  };

exports.create = async (req, res) => {
    try {
        if (req.body.username != undefined || req.body.username != null) {
            const possibleExistingUser = await models.User.findOne({
                where: { username: req.body.username },
            });
            if (possibleExistingUser != null) {
                return res.status(500).json({error:'the username is taken'});
            }
        }
        else{
            return res.status(401).json({
                message:"User does not exist"
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const create_admin = await models.User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            role: req.body.role,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            age: req.body.age
        });
        res.status(201).json({
            message:"Created sucessfully",
            user: create_admin
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(400).json({ error: "Admin creation failed",details:error.message }); // Send an error response with a meaningful message
    }
};

exports.update = async (req, res, next) => {
    try {
        const id = await req.params.id;
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            req.body.password = hashedPassword;
        }
        const [updatedRowCount] = await models.User.update(req.body, { where: { id: id } });

        if (updatedRowCount > 0) {
            res.status(200).send({ message: "Data updated successfully" });
        }
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({
            message: "An error occurred",
            error: err.message // Include the error message for debugging
        });
    }
}



exports.delete = async (req, res, next) => {
    try {
        const id = await req.params.id;
        const num = await models.User.destroy({
            where: { id: id }
        });

        if (num === 1) {
            res.json({
                message: "Deleted"
            });
        } else {
            res.status(404).json({ message: "admin not found" });
        }
    } catch (err) {
        res.status(500).json({
            message: "An error occurred",
            error: err.message // Include the error message for debugging
        });
    }
};
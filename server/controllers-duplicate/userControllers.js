
const models = require('../models');
const bcrypt =  require('bcrypt');

class User {
    constructor(parameters) {
        
    }

    findAll = async (req, res) => {
        try {
            const users = await models.User.findAll()
            res.status(200).json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    getUser = async (req, res) => {
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

    create = async (req, res) => {
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
            const create_user = await models.User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                age: req.body.age
            });
            res.status(201).json({
                message:"Created sucessfully",
                user: create_user
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "User creation failed",details:error.message }); // Send an error response with a meaningful message
        }
    };

    update = async (req, res) => {
        try {
            const id = await req.params.id;
            if (req.body.password) {
                const hashedPassword = await bcrypt.hash(req.body.password, 12);
                req.body.password = hashedPassword;
            }
            const [updatedRowCount] = await models.User
            .update(req.body, { where: { id: id } });

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

    delete = async (req, res) => {
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
                res.status(404).json({ message: "user not found" });
            }
        } catch (err) {
            res.status(500).json({
                message: "An error occurred",
                error: err.message
            });
        }
    };
}

module.exports = User;
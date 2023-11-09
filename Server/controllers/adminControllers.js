
const models = require('../models');
const bcrypt =  require('bcrypt');

exports.findAll = async (req, res) => {
    try {
        const users = await models.User.findAll({where:{
            role:'admin'
        }})
        res.status(200).json(users); // Send the users as a JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.create = async (req, res) => {
    try {
        if (req.body.username != undefined || req.body.username != null) {
            const possibleExistingUser = await models.admin.findOne({
                where: { username: req.body.username },
            });
            if (possibleExistingUser != null) {
                return res.status(500).json({error:'the username is taken'});
            }
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const create_user = await models.admin.create({
            username: req.body.username,
            password: hashedPassword,
        });
        res.status(201).json({
            message:"Created sucessfully",
            user: create_user
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(400).json({ error: "User creation failed",details:error.message }); // Send an error response with a meaningful message
    }
};

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const role = req.body.role;
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            req.body.password = hashedPassword;
        }

        const [updatedRowCount] = await models.User.update(req.body, {
            where: { id: id, role: {[models.Sequelize.Op.or]: ['admin', 'Admin']} }
        });

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
            res.status(404).json({ message: "user not found" });
        }
    } catch (err) {
        res.status(500).json({
            message: "An error occurred",
            error: err.message // Include the error message for debugging
        });
    }
};
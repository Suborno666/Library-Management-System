const models = require('../models');

exports.findAll = async (req,res)=>{
    try{
        const books = await models.Book.findAll()
        res.status(200).json(books)
    }
    catch (err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

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
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const create_user = await models.User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            age: req.body.age,
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
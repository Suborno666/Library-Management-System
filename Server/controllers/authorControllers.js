const models = require('../models');

exports.findAll = async (req,res) =>{
    try {
        const authors = await models.Author.findAll();
        res.status(200).json(authors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Message: "System error" });
    }
    
}
exports.create = async (req, res) => {
    try {
        if (req.body.name!=undefined||req.body.name!=null){
            let possiblyExistinguser = await models.Author.findOne({where:{name:req.body.name}})
            if(possiblyExistinguser!=null){
                return res.status(409).json({ "message": "name taken" });

            }
        }
        const create_Author = await models.Author.create({
            name: req.body.name
        });
        res.status(201).json({
            message:"Created sucessfully",
            user: create_Author
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(400).json({ error: "User creation failed",details:error.message }); // Send an error response with a meaningful message
    }
};
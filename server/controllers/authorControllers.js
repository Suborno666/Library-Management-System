const models = require('../models');

exports.findAll = async (req,res) =>{
    try {
        const authors = await models.Author.findAll();
        res.status(200).json(authors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Message: "System error", error: err.message });
    }
    
}
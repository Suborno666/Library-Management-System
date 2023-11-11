const models = require('../models');

function capitalise(word) {
    return word.split(/\s+/)
               .map(word => word.charAt(0).toUpperCase() + word.slice(1))
               .join(' ');
  } 

exports.findAll = async (req,res)=>{
    try{
        const books = await models.Book.findAll()
        const author = await models.Author.findAll()
        res.status(200).json({books:books,author:author})

    }
    catch (err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Inside the create function
exports.create = async (req, res) => {
    try {
        if (req.body.name != undefined && req.body.name != null) {
            const possibleExistingBook = await models.Book.findOne({
                where: { name: req.body.name },
            });
 
            if (possibleExistingBook != null) {
                return res.status(409).json({ error: 'The book name is taken' });
            } else {
                let author;
                if (req.body.authorName != undefined && req.body.authorName != null) {
                   author = await models.Author.findOne({
                       where: { authorName: req.body.authorName },
                   });
 
                   if (author == null) {
                       const capitalizedAuthor = capitalise(req.body.authorNam)
                       author = await models.Author.create({
                           authorName: capitalizedAuthor
                       });
                   }
                } else {
                   return res.status(400).json({ error: 'Author name is required' });
                }

                const capitalizedBook = capitalise(req.body.name)
                const create_book = await models.Book.create({
                   name: capitalizedBook,
                   stock: req.body.stock,
                   authorId: author.id
                });
 
                res.status(201).json({
                   message: "Created successfully",
                   book: create_book,
                   author: author.authorName
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "User creation failed", details: error.message });
    }
 };
 
const Author = require('../models/Author')

module.exports = async (req, res, next) => {
    const author = await Author.findById(req.session.userID);
    try {
        if (!author) {
            return res.redirect('/')
        }
        next()
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
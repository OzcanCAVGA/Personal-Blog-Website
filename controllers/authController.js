const bcrypt = require('bcrypt');
const Author = require('../models/Author')


exports.createAuthor = async (req, res) => {
    try {
        const user = await Author.create(req.body);
        res.status(201).json(user)
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

exports.loginUser = async (req, res) => {

    const { username, password } = req.body;

    const user = await Author.findOne({ username })
    if (user) {
        bcrypt.compare(password, user.password, (err, same) => {

            //USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect('/')
        })
    }
}





exports.logoutUser = (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Oturum sonlandırılırken bir hata oluştu.")
            }
            // Oturum kimliğini temizle
            res.clearCookie('sid')
            res.redirect('/')
        })
    } else {
        res.redirect('/')
    }
}




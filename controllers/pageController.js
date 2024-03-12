const Column = require('../models/Column');
const Author = require('../models/Author')

exports.getIndexPage = (req, res) => {
    res.status(200).render('index', {
        page_name: 'index'
    })
}

exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name: 'contact'
    })
}

exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name: 'login'
    })
}

exports.getSignPage = (req, res) => {
    res.status(200).render('signup', {
        page_name: 'signup'
    })
}


exports.getAddPostPage = async (req, res) => {

    //const author = await Author.findById(req.session.userID)
    console.log("Ben burdayımssss")
    res.status(200).render('add-post', {
        page_name: 'add-post',
        //author
    })

}


exports.createColumn = async (req, res) => {
    try {
        const userID = req.session.userID;


        const column = await Column.create({
            title: req.body.title,
            content: req.body.content,
            author: userID
        })
       
        await column.save();
        const author = await Author.findById(userID);
        if (author) {
            author.columns.push(column._id); 
            await author.save(); 
        }
        res.redirect('/')

    } catch {
        res.status(400).json({
            status: 'fail',
            // message: error.message
        })
    }
}


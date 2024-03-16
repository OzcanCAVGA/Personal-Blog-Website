const Column = require('../models/Column');
const Author = require('../models/Author')
const About = require('../models/About')
exports.getIndexPage = async (req, res) => {
    const about = await About.find();
    res.status(200).render('index', {
        page_name: 'index',
        about,
      })
}


exports.getAboutEdit = async (req, res) => {
    try {
        const about = await About.find({ _id: req.params.id });
        res.status(200).render('about-edit', {
            page_name: 'index',
            about
        });
    } catch (error) {
        console.error("Error fetching about data:", error);
        res.status(500).send("An error occurred while fetching about data.");
    }
};

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
    res.status(200).render('add-post', {
        page_name: 'add-post',
        //author
    })

}

exports.createAbout = async (req, res) => {
    const about = await About.create({
        title: req.body.title,
        content: req.body.content

    })
    await about.save();
    //res.redirect('/')
}

exports.updateAbout = async (req, res) => {
    try {
        const aboutId = req.params.id;
        const updateData = {
            title: req.body.title,
            content: req.body.content
        };

        const updatedAbout = await About.findByIdAndUpdate(aboutId, updateData, { new: true });

        if (!updatedAbout) {
            return res.status(404).send("The about page with the given ID was not found.");
        }

        res.status(200).redirect('/');
    } catch (error) {
        console.error("Error updating about data:", error);
        res.status(500).send("An error occurred while updating about data.");
    }
};

exports.createColumn = async (req, res) => {
    try {
        const userID = req.session.userID;


        const column = await Column.create({
            title: req.body.title,
            miniContent: req.body.miniContent,
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


const Column = require('../models/Column');
const Author = require('../models/Author')

exports.getColumnsPage = async (req, res) => {
    const query = req.query.search

    let filter = {}

    if (query) {
        filter = { name: { $regex: '.*' + query + '.*', $options: 'i' } };
    }

    if (!query) {
        filter.name = ""
    }

    const columns = await Column.find().sort('-date').populate('author')
    res.status(200).render('posts', {
        page_name: 'posts',
        columns,

    })
}

exports.getSingleColumnPage = async (req, res) => {
    const columnID = req.params.id

    const column = await Column.findById(columnID).populate('author')
    const author = await Author.findById(req.session.userID)

    // console.log("kose yazisi", column)
    res.status(200).render('single-post', {
        page_name: 'posts',
        column
    })
}





exports.getAllColumns = async (req, res) => {
    try {
        const query = req.query.search

        let filter = {}

        filter = { title: query }
        if (!query) {
            filter.name = ""
        }

        const column = await Column.find({
            name: { $regex: '.*' + filter.name * '.*', $option: 'i' }
        }).sort('-date')

        res.status(200).render('')
    } catch (error) {

    }
}
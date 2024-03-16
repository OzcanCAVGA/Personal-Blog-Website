const Column = require('../models/Column');
const Author = require('../models/Author')


exports.getEditColumnPage = async (req, res) => {
    try {
        const column = await Column.findById(req.params.id);
        if (!column) {
            return res.status(404).send('The column with the given ID was not found.');
        }
        res.render('edit', {
            column,
            page_name: 'post'
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getColumnsPage = async (req, res) => {
    const query = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const columnsPerPage = 4;

    let filter = {};
    if (query) {
        filter = { name: { $regex: '.*' + query + '.*', $options: 'i' } };
    }

    try {
        const totalColumns = await Column.countDocuments(filter);
        const columns = await Column.find(filter)
            .sort('-date')
            .skip((page - 1) * columnsPerPage)
            .limit(columnsPerPage)
            .populate('author');

        const pages = Math.ceil(totalColumns / columnsPerPage);

        res.status(200).render('posts', {
            page_name: 'posts',
            columns,
            pages,
            currentPage: page
        });
    } catch (err) {
        res.status(500).send(err);
    }
};
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

exports.deleteColumnPage = async (req, res) => {
    await Column.findByIdAndDelete(req.params.id)
    res.redirect('/columns')
}


exports.updateColumnPage = async (req, res) => {
    const column = await Column.findById(req.params.id)

    const columnID = req.params.id;
    const updatedData = {
        title: req.body.title,
        miniContent: req.body.miniContent,
        content: req.body.content

    };


    Column.findByIdAndUpdate(columnID, updatedData, { new: true })
        .then(updatedColumn => {
            if (!updatedColumn) {
                return res.status(404).send('Güncellenen belge bulunamadı.');
            }
            res.status(200).redirect('/')
        })
        .catch(error => {
            console.error('Belge güncellenirken bir hata oluştu:', error);
            res.status(500).send('Belge güncellenirken bir hata oluştu.');
        });

}


exports.getAllColumns = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const columnsPerPage = 4;
        const totalColumns = await Column.find().countDocuments()

        const column = await Column.find()
            .sort('-date')
            .skip((page - 1) * columnsPerPage)
            .limit(columnsPerPage)

        res.status(200).render('posts', {
            columns: columns,
            current: page,
            pages: Math.ceil(totalColumns / columnsPerPage)
        })
    } catch (error) {
        res.status(500).send(error);

    }
}
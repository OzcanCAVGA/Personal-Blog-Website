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
            page_name: 'ozcan'
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

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

exports.deleteColumnPage = async (req, res) => {
    await Column.findByIdAndDelete(req.params.id)
    res.redirect('/columns')
}


exports.updateColumnPage = async (req, res) => {
    const column = await Column.findById(req.params.id)
    // if (!column) {
    //     return res.status(404).send('The column with the given ID was not found.');
    // }

    // column.title = req.body.title
    // column.miniContent = req.body.miniContent
    // column.content = req.body.content
    // await column.save()

    // res.redirect(`/columns/${req.params.id}`)


    // Güncellenecek column belgesinin ID'si ve güncellenecek verileri içeren bir obje alınır (örneğin req.body üzerinden)
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
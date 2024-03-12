const express = require('express');
const columnController = require('../controllers/columnController')

const router = express.Router();

router.route('/').get(columnController.getColumnsPage)
router.route('/:id').get(columnController.getSingleColumnPage)


// add-post butonuna basinca hata veriyor, coz bunu!


module.exports = router;
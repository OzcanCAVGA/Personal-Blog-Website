const express = require('express');
const columnController = require('../controllers/columnController')

const router = express.Router();

router.route('/').get(columnController.getColumnsPage)
router.route('/:id').get(columnController.getSingleColumnPage)
router.route('/:id').delete(columnController.deleteColumnPage)
router.route('/edit/:id').get(columnController.getEditColumnPage)
router.route('/edit/:id').post(columnController.updateColumnPage)





module.exports = router;
const express = require('express');
const columnController = require('../controllers/columnController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

router.route('/').get(columnController.getColumnsPage)
router.route('/:id').get(columnController.getSingleColumnPage)
router.route('/:id').delete(authMiddleware, columnController.deleteColumnPage)
router.route('/edit/:id').get(authMiddleware, columnController.getEditColumnPage)
router.route('/edit/:id').post(authMiddleware, columnController.updateColumnPage)





module.exports = router;
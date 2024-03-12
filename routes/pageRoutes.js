const express = require('express')
const pageController = require('../controllers/pageController')
const router = express.Router();

router.route('/').get(pageController.getIndexPage)
router.route('/login').get(pageController.getLoginPage);
router.route('/signup').get(pageController.getSignPage);
router.route('/contact').get(pageController.getContactPage)
router.route('/add-post').get(pageController.getAddPostPage)
router.route('/add-post').post(pageController.createColumn)





module.exports = router
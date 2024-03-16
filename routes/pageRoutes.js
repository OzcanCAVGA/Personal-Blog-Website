const express = require('express')
const pageController = require('../controllers/pageController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router();

router.route('/').get(pageController.getIndexPage)
router.route('/about-edit/:id').get(pageController.getAboutEdit)

router.route('/about-edit/:id').put(pageController.updateAbout)

router.route('/login').get(pageController.getLoginPage);
router.route('/signup').get(pageController.getSignPage);
router.route('/contact').get(pageController.getContactPage)
router.route('/contact').post(pageController.sendMail)
router.route('/add-post').get(authMiddleware, pageController.getAddPostPage)
router.route('/add-post').post(authMiddleware, pageController.createColumn)





module.exports = router
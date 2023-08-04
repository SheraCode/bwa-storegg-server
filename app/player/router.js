var express = require('express');
var router = express.Router();
const { landingPage, detailPage, category, checkout, history, detail, dashboard, profile, editProfile } = require('./controller');
const { isLoginPlayer } = require('../middleware/auth')
const multer = require('multer');
const os = require('os')

/* GET home page. */

router.get('/landingpage',landingPage);
router.get('/:id/detail',detailPage);
router.get('/category',category);
router.post('/checkout',isLoginPlayer,checkout);
router.get('/history/:id/detail',isLoginPlayer,detail);
router.get('/history',isLoginPlayer,history);
router.get('/dashboard',isLoginPlayer,dashboard);
router.get('/profile',isLoginPlayer,profile);
router.put('/profile/edit'
,multer({dest: os.tmpdir()}).single('avatar')
,isLoginPlayer
,editProfile);

module.exports = router;

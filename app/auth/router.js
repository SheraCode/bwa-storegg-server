var express = require('express');
var router = express.Router();
const { signup, signin } = require('./controller');
const multer = require('multer');
const os = require('os')

/* GET home page. */
router.post('/signup', multer({dest: os.tmpdir()}).single('image'),signup);
router.post('/signin',signin);
// router.get('/:id/detail',detailPage);
// router.get('/create',viewCreate);
// router.post('/create',actionCreate);
// router.get('/edit/:id',viewEdit);
// router.put('/edit/:id',ActionEdit);
// router.delete('/delete/:id',deleteCategory);

module.exports = router;

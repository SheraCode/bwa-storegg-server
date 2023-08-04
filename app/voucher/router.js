var express = require('express');
var router = express.Router();
const { index , viewCreate , actionCreate , viewEdit , ActionEdit , StatusDisabled , StatusEnabled , deleteVoucher} = require('./controller');
const multer = require('multer');
const os = require('os')
const {isLoginAdmin} = require('../middleware/auth')

router.use(isLoginAdmin)

/* GET home page. */
router.get('/',index);
router.get('/create',viewCreate);
router.post('/create', multer({dest: os.tmpdir()}).single('thumbnial'), actionCreate);
router.get('/edit/:id',viewEdit);
router.get('/disable/:id',StatusDisabled);
router.get('/enabled/:id',StatusEnabled);
router.put('/edit/:id', multer({dest: os.tmpdir()}).single('thumbnial'), ActionEdit);
router.delete('/delete/:id',deleteVoucher);

module.exports = router;

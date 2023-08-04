var express = require('express');
var router = express.Router();
const {index , viewCreate , actionCreate , viewEdit , ActionEdit, deleteBank} = require('./controller');
const {isLoginAdmin} = require('../middleware/auth')

router.use(isLoginAdmin)

/* GET home page. */
router.get('/',index);
router.get('/create',viewCreate);
router.post('/create',actionCreate);
router.get('/edit/:id',viewEdit);
router.put('/edit/:id',ActionEdit);
router.delete('/delete/:id',deleteBank);

module.exports = router;

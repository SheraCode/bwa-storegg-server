var express = require('express');
var router = express.Router();
const {index, actionSignin , actionLogout } = require('./controller');

/* GET home page. */
router.get('/',index);
router.get('/logout', actionLogout);
router.post('/',actionSignin);
// router.post('/create',actionCreate);
// router.get('/edit/:id',viewEdit);
// router.put('/edit/:id',ActionEdit);
// router.delete('/delete/:id',deleteCategory);

module.exports = router;

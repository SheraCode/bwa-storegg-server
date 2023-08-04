var express = require('express');
var router = express.Router();
const {index , tolak , terima } = require('./controller');
const {isLoginAdmin} = require('../middleware/auth')

router.use(isLoginAdmin)

/* GET home page. */
router.get('/',index);
// router.get('/create',viewCreate);
// router.post('/create',actionCreate);
// router.get('/edit/:id',viewEdit);
router.put('/tolak/:id',tolak);
router.put('/terima/:id',terima);
// router.delete('/delete/:id',deleteBank);

module.exports = router;

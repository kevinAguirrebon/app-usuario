const { Router} = require('express');
const router = Router();
const { renderIndex, renderLogin, renderRegister } = require('../controllers/login.controller')

router.get('/', renderIndex);
router.get('/login',  renderLogin);
router.get('/register',  renderRegister);
router.post('/login', (req,res) => { })
router.get('/register', (req,res) => {})
router.post('/register', (req,res) => {})

module.exports = router;
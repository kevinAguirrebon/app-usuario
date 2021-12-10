const { Router} = require('express');
const router = Router();
const passport = require('passport');
const { renderIndex, renderLogin, renderRegister } = require('../controllers/login.controller')

router.get('/', renderIndex);
router.get('/login',  renderLogin);
router.get('/register',  renderRegister);
router.get('/salir', (req,res)=>{
    req.logout();
    res.redirect('/login');
})
router.post('/login',(req,res,next) => {
    const {username, password} = req.body;
    if(username && password){
        next();
    }else{
        req.flash('mensaje', 'Ingrese todos los datos');
        res.redirect('/login');
    }
},passport.authenticate('local-login',{
    successRedirect: '/users',
    failureRedirect: '/login',
    passReqToCallback: true
}))

router.post('/register',(req,res,next) => {
    const {username, password} = req.body;
    if(username && password){
        next();
    }else{
        req.flash('mensaje', 'Ingrese todos los datos');
        res.redirect('/register');
    }
},passport.authenticate('local-register',{
    successRedirect: '/',
    failureRedirect: '/register',
    passReqToCallback: true
}))

module.exports = router;
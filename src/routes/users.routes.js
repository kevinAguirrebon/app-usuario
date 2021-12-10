const { Router} = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
const isAuth = require('../helpers/isAuth');

const { 
    renderFormAdd, 
    createNewUser, 
    renderAllUsers, 
    renderDetalle, 
    deleteUser 
} = require('../controllers/users.controller')

router.get('/user/new-user', isAuth, renderFormAdd);
router.post('/user/new-user', isAuth,
    check('correo', 'El correo es requerido').isEmail().withMessage('El correo debe ser valido'),
    check('usuario', 'El usuario es requrido').not().isEmpty(),
    check('nombre', 'El nombre debe ser requerido').not().isEmpty(),
    check('apellido', 'El nombre debe ser requerido').not().isEmpty()
,(req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.session.errors = errors.array();
            req.session.data = req.body;
            res.redirect('/user/new-user')
        }else{
           next();
        }
    
},createNewUser);

router.get('/users',isAuth, renderAllUsers);

router.get('/user/detalle/:id',isAuth, renderDetalle);

router.delete('/user/delete/:id',isAuth, deleteUser);


module.exports = router;
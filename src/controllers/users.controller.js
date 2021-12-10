const User = require('../models/users')

//vistas
const renderFormAdd = (req,res) => {
    res.render('users/new-user', {
        errors: req.session.errors,
        warning: req.session.warning,
        data: req.session.data
    });
    req.session.errors = null;
    req.session.warning = null;
    req.session.data = null;
}

const renderAllUsers = async (req,res) => {
    const users = await User.find().lean();
    res.render('users/all-users', { users });
}

const renderDetalle = async(req,res) => {
    const id = req.params.id;
    const users = await User.findById(id).lean();
    res.render('users/detalle-user', { users })
}
//funciones

const createNewUser = async (req,res) => {
    const { nombre, apellido, usuario, correo } = req.body;

    const usuario_exit = await User.findOne({usuario});
    if(!usuario_exit){
        const correo_exit = await User.findOne({correo});
        if(!correo_exit){
            const userEnd = await User.find().sort({$natural:-1}).limit(1);
            const id_autoincrement = parseInt(userEnd[0] ? userEnd[0].user_id : 0) + 1;
            const userModel = new User({user_id: id_autoincrement, nombre, apellido, usuario, correo});
            await userModel.save();
            console.log('gurdado');
            res.redirect('/users')
           
        }else{
            req.session.warning = 'El correo ya existe';
            req.session.data = req.body;
            res.redirect('/user/new-user')
        }
    }else{
        req.session.data = req.body;
        req.session.warning = 'El usuario ya existe'
        res.redirect('/user/new-user')
    } 
};


const deleteUser = async (req,res) => {
    const id = req.params.id;
    const response = await User.findByIdAndDelete(id);
    if(!response){
        res.json({status: false, message: 'No se pudo eliminar'})
    }else{
        res.json({status: true, message: 'Eliminado'})
    }
    
}


module.exports = { renderFormAdd, createNewUser, renderAllUsers, renderDetalle, deleteUser};



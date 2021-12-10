const User = require('../models/users')

//vistas
const renderFormAdd = (req,res) => {
    res.render('users/new-user');
}

const renderAllUsers = async (req,res) => {
    const users = await User.find().lean();
    res.render('users/all-users', { users });
}

const renderUpdate = (req,res) => {
    res.render('users/detalle-user')
}
//funciones

const createNewUser = async (req,res) => {
    const { nombre, apellido, usuario, correo } = req.body;
    const userEnd = await User.find().sort({$natural:-1}).limit(1);
    const id_autoincrement = parseInt(userEnd[0] ? userEnd[0].user_id : 0) + 1;
    const userModel = new User({user_id: id_autoincrement, nombre, apellido, usuario, correo});
    await userModel.save();
    res.send('user save');
};

const updateUser = (req,res) => {
    res.send('actualizar usuarios');
}

const deleteUser = (req,res) => {
    res.send('eliminar usuarios');
}


module.exports = { renderFormAdd, createNewUser, renderAllUsers, renderUpdate, updateUser, deleteUser};



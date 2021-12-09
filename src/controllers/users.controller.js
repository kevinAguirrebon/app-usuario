//vistas
const renderFormAdd = (req,res) => {
    res.render('users/new-user');
}

const renderAllUsers = (req,res) => {
    res.send('ver usuarios');
}

const renderUpdate = (req,res) => {
    res.send('ver update usuario')
}
//funciones

const createNewUser = (req,res) => {
    const { nombre, apellido, usuario, correo } = req.body;
    res.send(data);
};

const updateUser = (req,res) => {
    res.send('actualizar usuarios');
}

const deleteUser = (req,res) => {
    res.send('eliminar usuarios');
}


module.exports = { renderFormAdd, createNewUser, renderAllUsers, renderUpdate, updateUser, deleteUser};



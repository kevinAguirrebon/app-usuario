//vistas

const renderIndex = (req,res) => {
    res.render('login');
}

const renderRegister = (req,res) => {
    res.render('register');
}

const renderLogin = (req,res) => {
    res.render('login');
}

//funciones




module.exports = {
    renderIndex, 
    renderLogin, 
    renderRegister
}
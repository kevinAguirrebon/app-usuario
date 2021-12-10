const passport = require('passport');
const strategy =  require('passport-local').Strategy;

const Auth = require('../models/auth')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) =>{
    const user = await Auth.findById(id);
    done(null,user)
  });
  

passport.use('local-register', new strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true 
},async (req, username, password, done) => {
    const user = await Auth.findOne({username: username});
    if(user){
        return done(null,false, req.flash('mensaje', 'El usuario ya existe'))
    }else{
        const newUser = new Auth();
        newUser.username = username;
        newUser.password = newUser.encryPass(password);
        await newUser.save();
        done(null,newUser);
    }
}))

passport.use('local-login', new strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true 
},async (req, username, password, done)=>{
    const user = await Auth.findOne({username: username});
    if(!user){
        done(null,false, req.flash('mensaje', 'usuario no encontrado'))
    }else{
        if(!user.decryPass(password)){
            done(null,false, req.flash('mensaje', 'usuario o contraseña incorrecta'))
        }else{
            done(null,user);
        }
    }
}))
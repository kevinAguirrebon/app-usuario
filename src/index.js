const express = require('express');
const { engine }  = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();
require('./database');
require('./helpers/local-auth');

const app = express();

//static
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'keysession',
    resave: false,
    saveUninitialized: false,
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//config motor de plantilla
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//conect flahs
app.use(function(req, res, next){
    res.locals.mensaje= req.flash('mensaje');
    res.locals.user = req.user;
    next();
});

//routes
app.use(require('./routes/login.routes'))
app.use(require('./routes/users.routes'))



app.listen(app.get('port'), (req, res) => {
    console.log(`listening on port ${app.get('port')}`)
})


const express = require('express');
const { engine }  = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();
require('./database');
const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('port', process.env.PORT || 3000);

//static
app.use(express.static(path.join(__dirname, 'public')));

//config motor de plantilla
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//routes
app.use(require('./routes/login.routes'))
app.use(require('./routes/users.routes'))



app.listen(app.get('port'), (req, res) => {
    console.log(`listening on port ${app.get('port')}`)
})


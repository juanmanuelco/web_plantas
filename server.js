//Establecemos la crecaión del servidor de elementos__________________________________________________________________________________________
cookieParser = require('cookie-parser')
bodyParser = require('body-parser')
exphbs = require('express-handlebars')
flash = require('connect-flash')
session = require('express-session')
path = require('path')
passport = require('passport')
LocalStrategy = require('passport-local').Strategy
express = require('express')
mongoose = require('mongoose')
servidor = express()
////=======================descomentar la linea de abajo para conectar a la base de datos ======================//
mongoose.connect('mongodb://Admin:Abc123.....@ds253821.mlab.com:53821/plantas', { server: { reconnectTries: Number.MAX_VALUE } });

//var puerto=Math.floor(Math.random() * (5000 - 3000)) + 3000
puerto=3000;
http = require('http').Server(servidor),
port = process.env.PORT || puerto;

//Inicializamos el servidor
http.listen(port);

routes = require('./rutas/index');


//Definimos que se usará tecnología hbs para modificar la vista de una página
servidor.set('views', path.join(__dirname, 'views'));
servidor.engine('handlebars', exphbs({ defaultLayout: 'estatico' }));
servidor.set('view engine', 'handlebars');

//Permitimos el reconocimiento de JSON en el sistema 
servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: false }));
servidor.use(cookieParser());

//Aqui se define donde estarán los estilos y scripts tanto globales como modulares
servidor.use(express.static(path.join(__dirname, 'recursos')));

//Con esto nos aseguramos que se usen sesiones e inicios de sesión con encriptación
servidor.use(session({ secret: 'secret', saveUninitialized: true, resave: true }));
servidor.use(passport.initialize());
servidor.use(passport.session());


//Es necesario el poder enviar mensajes automáticos desde el servidor
servidor.use(flash());

//Establecemos variables globales para el envío de datos
servidor.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//usamos las rutas creadas anteriormente
servidor.use('/', routes);


//Controlamos el error de página no encontrada
servidor.use( (req, res)=>{
  res.status('404');
  res.render('errores/404')
});

//Controlamos el error de fallos en el servidor
servidor.use( (err, req, res, next)=> {
  res.status(500);
  res.render('errores/500', { error: err });
});

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const pkg = require('../package.json');
const helmet = require('helmet');
require('./database/Connection')
const app = express();

//rutas
const v1Router = require('./v1/routes');
const v1UsuarioRouter = require('./v1/routes/usuarioRoutes');
const v1AuthRouter = require('./v1/routes/authRoutes');
const v1EquipoRouter = require('./v1/routes/equipoRoutes');
const v1ReporteRouter = require('./v1/routes/reporteRoutes');



app.set('pkg', pkg);
app.set('json spaces', 4);

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
}));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rutas
app.use('/api/v1', v1Router);
app.use('/api/v1/usuarios', v1UsuarioRouter);
app.use('/api/v1/auth', v1AuthRouter);
app.use('/api/v1/equipos', v1EquipoRouter);
app.use('/api/v1/reportes', v1ReporteRouter);


module.exports = app;
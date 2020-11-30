import express from 'express';
import morgan from 'morgan';
import path from 'path';
import indexRoutes from './routes/index';

const app = express();

//Configuracion
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Rutas
app.use('/api', indexRoutes);

//Uploads
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;

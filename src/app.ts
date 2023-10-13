import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import { dbconfig } from './config/database.config';
import router from './router';

mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.url);
mongoose.connection.on('open', () => {
    console.log('Connecté à la base de données MongoDB');
});
mongoose.connection.on('error',(error) => {
    console.error('Erreur de connexion à la base de données:', error);
});

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", 'true'); 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Authorization, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/', router());

app.get('/' , (req : express.Request , res : express.Response)=>{
    res.send('Hello world !');
})



export default app;
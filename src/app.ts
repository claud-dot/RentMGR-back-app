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

const allowedOrigins: string[] = ['http://localhost:4200', 'https://rentmanager14.netlify.app' , 'https://rent-mgr-front-app.vercel.app'];

const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow: boolean) => void) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", 'true'); 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Authorization, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(compression());
app.use(bodyParser.json());

app.use('/', router());

app.get('/' , (req : express.Request , res : express.Response)=>{
    res.send('Hello world !');
})



export default app;
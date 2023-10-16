import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
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

const allowedOrigins: string[] = ['http://localhost:4200', 'https://rentmanager14.netlify.app' , 'https://rent-mgr-front-app.vercel.app' , 'https://realese-production--rentmanager14.netlify.app'];

const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow: boolean) => void) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  }
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/', router());

app.get('/' , (req : express.Request , res : express.Response)=>{
    res.send('Hello world !');
})



export default app;
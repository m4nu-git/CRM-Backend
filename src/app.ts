import express, { Express, Request, Response } from 'express';
import ServerConfig from './config/server.config';
import apiRouter from './routes';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";


const app : Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.use('/api', apiRouter)

app.get('/ping', (req: Request, res: Response) => {
    return res.status(200).json({msg: 'ok'})
})

export default app;
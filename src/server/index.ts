import express, { Request, Response, Router, Express } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import router from './route';
import errorHandler from './middlewares/error';

const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));
app.get('/', (req: Request, res: Response) => {
  res.sendFile('/dist/index.html');
});

const routes: Router[] = Object.values(router);
app.use('/api', routes);

app.use(errorHandler);

const port = Number(process.env.PORT) || 8050;

const server = app.listen(port, () => {
  console.log(`App listening on ${port}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

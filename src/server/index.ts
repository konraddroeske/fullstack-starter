import express, { Request, Response, Router } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import router from './route';
import errorHandler from './middlewares/error';

const app = express();

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

const PORT = Number(process.env.PORT) || 8050;

const server = app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

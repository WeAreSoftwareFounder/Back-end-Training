import express from 'express';
import morgan from 'morgan';
const app = express();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import methodOverride from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'log.txt'),
  { flags: 'a' }
);
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :date[web]',
    { stream: accessLogStream }
  )
);
app.use('/', express.static(__dirname + '/Public'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke');
});

app.use(bodyParser.json());
app.use(methodOverride());

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
  // logic
});

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/movies', (req, res) => {
  let find = app.get('/movies.json', (req, res));
  console.log(find);
});
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

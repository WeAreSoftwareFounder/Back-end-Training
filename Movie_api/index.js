import express from 'express';
import morgan from 'morgan';
const app = express();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let topMov = {
  Titles: [
    'Blind Date',
    'The Electric Horseman',
    'Robotech: Love Live Alive',
    'Rocket Gibraltar',
    'Arizona Gang Busters',
    'Jealous Husbands',
    'The Old Maid',
    'The International',
    'Sphere',
    'Cheap Kisses',
  ],
};

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

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

//returns ovject from json, not sure why
app.get('/movies', (req, res) => {
  res.json(topMov);
});
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

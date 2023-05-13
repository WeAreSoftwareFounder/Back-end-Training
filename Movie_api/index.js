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
  Titles: {
    name: 'BlindDate',
    genre: 'RomCom',
    discription:
      'Blind Date is a 1987 American romantic comedy film directed by Blake Edwards and starring Bruce Willis (in his first credited lead role) and Kim Basinger. ',
    director: 'Blake Edwards',
    imgurl:
      'https://upload.wikimedia.org/wikipedia/en/2/22/Blinddateposter.jpg',
    name: 'TheElectricHorseman',
    name: 'RobotechLoveLiveAlive',
    name: 'RocketGibraltar',
    name: 'ArizonaGangBusters',
    name: 'JealousHusbands',
    name: 'TheOldMaid',
    name: ' TheInternational',
    name: 'Sphere',
    name: 'CheapKisses',
  },
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
  if ('genre' in topMov) {
    res.json(topMov.hasOwnProperty('name'));
  }
});
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

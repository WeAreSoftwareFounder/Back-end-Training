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

let topMov = [
  {
    name: 'BlindDate',
    genre: 'RomCom',
    discription:
      'Blind Date is a 1987 American romantic comedy film directed by Blake Edwards and starring Bruce Willis (in his first credited lead role) and Kim Basinger. ',
    director: 'Blake Edwards',
    imgurl:
      'https://upload.wikimedia.org/wikipedia/en/2/22/Blinddateposter.jpg',
  },
  {
    name: 'TheElectricHorseman',
    genre: '',
    discription:
      'Blind Date is a 1987 American romantic comedy film directed by Blake Edwards and starring Bruce Willis (in his first credited lead role) and Kim Basinger. ',
    director: 'Blake Edwards',
    imgurl:
      'https://upload.wikimedia.org/wikipedia/en/2/22/Blinddateposter.jpg',
  },
  {
    name: 'RobotechLoveLiveAlive',
    genre: '',
    discription:
      'Blind Date is a 1987 American romantic comedy film directed by Blake Edwards and starring Bruce Willis (in his first credited lead role) and Kim Basinger. ',
    director: 'Blake Edwards',
    imgurl:
      'https://upload.wikimedia.org/wikipedia/en/2/22/Blinddateposter.jpg',
  },
  {
    name: 'RocketGibraltar',
    genre: 'RomCom',
    discription:
      'Blind Date is a 1987 American romantic comedy film directed by Blake Edwards and starring Bruce Willis (in his first credited lead role) and Kim Basinger. ',
    director: 'Blake Edwards',
    imgurl:
      'https://upload.wikimedia.org/wikipedia/en/2/22/Blinddateposter.jpg',
  },
  {
    name: 'ArizonaGangBusters',
    genre: '',
    discription:
      'Blind Date is a 1987 American romantic comedy film directed by Blake Edwards and starring Bruce Willis (in his first credited lead role) and Kim Basinger. ',
    director: 'Blake Edwards',
    imgurl:
      'https://upload.wikimedia.org/wikipedia/en/2/22/Blinddateposter.jpg',
  },
  {
    name: 'JealousHusbands',
    genre: '',
    discription:
      'Blind Date is a 1987 American romantic comedy film directed by Blake Edwards and starring Bruce Willis (in his first credited lead role) and Kim Basinger. ',
    director: 'Blake Edwards',
    imgurl:
      'https://upload.wikimedia.org/wikipedia/en/2/22/Blinddateposter.jpg',
  },
  {
    name: 'TheOldMaid',
    genre: '',
    discription:
      'Blind Date is a 1987 American romantic comedy film directed by Blake Edwards and starring Bruce Willis (in his first credited lead role) and Kim Basinger. ',
    director: 'Blake Edwards',
    imgurl:
      'https://upload.wikimedia.org/wikipedia/en/2/22/Blinddateposter.jpg',
  },
  {
    name: ' TheInternational',
    genre: '',
    discription:
      'Blind Date is a 1987 American romantic comedy film directed by Blake Edwards and starring Bruce Willis (in his first credited lead role) and Kim Basinger. ',
    director: 'Blake Edwards',
    imgurl:
      'https://upload.wikimedia.org/wikipedia/en/2/22/Blinddateposter.jpg',
  },
  {
    name: 'Sphere',
    genre: '',
    discription:
      'Blind Date is a 1987 American romantic comedy film directed by Blake Edwards and starring Bruce Willis (in his first credited lead role) and Kim Basinger. ',
    director: 'Blake Edwards',
    imgurl:
      'https://upload.wikimedia.org/wikipedia/en/2/22/Blinddateposter.jpg',
  },
  {
    name: 'CheapKisses',
    genre: '',
    discription:
      'Blind Date is a 1987 American romantic comedy film directed by Blake Edwards and starring Bruce Willis (in his first credited lead role) and Kim Basinger. ',
    director: 'Blake Edwards',
    imgurl:
      'https://upload.wikimedia.org/wikipedia/en/2/22/Blinddateposter.jpg',
  },
];
let result = topMov.find((item) => (item.genre = 'RomCom'));

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
  if (result in topMov) {
    res.send(topMov.result.name);
  } else {
    res.send('nothing found yet');
  }
});
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import { title } from 'process';
//variables
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let users = [
  {
    id: 1,
    name: 'Robert',
    favorateMovie: [],
  },
  {
    id: 2,
    name: 'kim',
    favorateMovie: [],
  },
];
let movies = [
  {
    title: 'Black Adam',
    genre: {
      name: 'Action',
      description:
        'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods--and imprisoned just as quickly--Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.',
    },
    director: { name: 'Jaume Collet-Serra' },
    image:
      'https://www.imdb.com/title/tt6443346/mediaviewer/rm2091778049/?ref_=tt_ov_i',
  },
  {
    title: 'Venom',
    genre: {
      name: 'Action',
      description:
        'A failed reporter is bonded to an alien entity, one of many symbiotes who have invaded Earth. But the being takes a liking to Earth and decides to protect it.',
    },
    director: { name: 'Ruben Fleischer' },
    image:
      'https://www.imdb.com/title/tt1270797/mediaviewer/rm629808385/?ref_=tt_ov_i',
  },
  {
    title: 'Black Panther : Wakanda Forever',
    genre: {
      name: 'Action',
      description:
        'The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King TChalla.',
    },
    director: { name: 'Ryan Coogler' },
    image:
      'A failed reporter is bonded to an alien entity, one of many symbiotes who have invaded Earth. But the being takes a liking to Earth and decides to protect it.',
  },
  {
    title: 'Spiderman : No Way Home',
    genre: 'Action',
    director: {
      name: 'Action',
      description:
        'With Spider-Mans identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.',
    },

    image:
      'https://www.imdb.com/title/tt10872600/mediaviewer/rm3936939521/?ref_=tt_ov_i',
  },
  {
    title: 'Avatar',
    genre: {
      name: 'Action',
      description:
        'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    },
    director: { name: 'James Cameron' },

    image: '',
  },
  {
    title: 'John Wick',
    genre: { name: 'Action', description: '' },
    director: {
      name: 'https://www.imdb.com/title/tt0499549/mediaviewer/rm2864126209/?ref_=tt_ov_i',
    },

    image: '',
  },
  {
    title: 'The Matrix : Ressurections',
    genre: {
      name: 'Action',
      description:
        'Return to a world of two realities: one, everyday life; the other, what lies behind it. To find out if his reality is a construct, to truly know himself, Mr. Anderson will have to choose to follow the white rabbit once more.',
    },
    director: { name: 'Lana Wachowski' },
    image:
      'https://www.imdb.com/title/tt10838180/mediaviewer/rm3704744193/?ref_=tt_ov_i',
  },
  {
    title: 'Avengers : Endgame',
    genre: {
      name: 'Action',
      description:
        'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.',
    },
    director: { name: 'Anthony Russo', name: 'Joe Russo' },
    image:
      'https://www.imdb.com/title/tt4154796/mediaviewer/rm2775147008/?ref_=tt_ov_i',
  },
  {
    title: 'Tenet',
    genre: {
      name: 'action',
      description:
        'Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
    },
    director: { name: 'Christopher Nolan' },
    image: '',
  },
  {
    title: 'Venom: Let there be carnage',
    genre: {
      name: 'Action',
      description:
        'Eddie Brock attempts to reignite his career by interviewing serial killer Cletus Kasady, who becomes the host of the symbiote Carnage and escapes prison after a failed execution.',
    },
    director: { name: 'Andy Serkis' },
    image:
      'https://www.imdb.com/title/tt7097896/mediaviewer/rm980350465/?ref_=tt_ov_i',
  },
];

//logging system
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'public/log.txt'),
  { flags: 'a' }
);

//Middleware
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :date[web]',
    { stream: accessLogStream }
  )
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Error checking
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke');
});

//Routing
app.use('/', express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile('index.html');
});
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

//Create data

//New users
app.post('/users', (req, res) => {
  const newUser = req.body;
  if (newUser.name) {
    newUser.id = uuidv4;
    users.push = newUser;
    res.status(201).json(newUser);
  } else {
    res.send(400).send('Users need names');
  }
});

//Update user
app.put('/users/:id/:movieTitle', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);
  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('user not found');
  }
});

//Post user movie
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);
  if (user) {
    user.favorateMovie.push(movieTitle);
    res
      .status(200)
      .send(`${movieTitle} has been added to ${id} array`);
  } else {
    res.status(400).send('user not found');
  }
});

//Delete user movie
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);
  if (user) {
    user.favorateMovie = user.favorateMovie.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from ${id}s array`);
  } else {
    res.status(400).send('user not found');
  }
});

//Deletes user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  let user = users.find((user) => user.id == id);

  if (user) {
    user = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send('user not found');
  }
});

//Read data
//Search by title
app.get('/movies/:title', (req, res) => {
  res.sendFile('/public/documentation.html');
  const { title } = req.params;
  const movie = movies.find((movie) => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('movie not found');
  }
});
//Search by genre
app.get('/movies/genre/:genreName', (req, res) => {
  res.sendFile('/public/documentation.html');
  const { genreName } = req.params;
  const genre = movies.find(
    (movie) => movie.genre.name === genreName
  ).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('movie not found');
  }
});
//Serarch by director
app.get('/movies/directors/:directorName', (req, res) => {
  res.sendFile('/public/documentation.html');
  const { directorName } = req.params;
  const direcoter = movies.find(
    (movie) => movie.director.name === directorName
  ).director;

  if (direcoter) {
    res.status(200).json(direcoter);
  } else {
    res.status(400).send('movie not found');
  }
});

//server start point
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

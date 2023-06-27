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
        'A failed reporter is bonded to an alien entity, one of many symbiotes who have invaded Earth. But the being takes a liking to Earth and decides to protect it.',
    },
    director: { name: 'Ruben Fleischer' },
    image:
      'https://www.imdb.com/title/tt1270797/mediaviewer/rm629808385/?ref_=tt_ov_i',
  },
  {
    title: 'Venom',
    genre: { name: 'Action', description: '' },
    director: { name: '' },

    image: '',
  },
  {
    title: 'Black Panther : Wakanda Forever',
    genre: { name: 'Action', description: '' },
    director: { name: '' },
    image: '',
  },
  {
    title: 'Spiderman : No Way Home',
    genre: 'Action',
    director: { name: '' },

    image: '',
  },
  {
    title: 'Avatar',
    genre: { name: 'Action', description: '' },
    director: { name: '' },

    image: '',
  },
  {
    title: 'John Wick',
    genre: { name: 'Action', description: '' },
    director: { name: '' },

    image: '',
  },
  {
    title: 'The Matrix : Ressurections',
    genre: { name: 'Action', description: '' },
    director: { name: '' },
    image: '',
  },
  {
    title: 'Avengers : Endgame',
    genre: { name: 'Action', description: '' },
    director: { name: '' },
    description: '',
    image: '',
  },
  {
    title: 'Tenet',
    genre: { name: 'action', description: '' },
    director: { name: '' },
    image: '',
  },
  {
    title: 'Venom: Let there be carnage',
    genre: { name: 'Action', description: '' },
    director: { name: '' },
    image: '',
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

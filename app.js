const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const validUrl = require('valid-url');
const User = require('./models/UserModel');
const Exercise = require('./models/ExerciseModel');

mongoose.connect(
  'mongodb://dennis:dennis@ds241677.mlab.com:41677/fcc-exercise-tracker'
);
mongoose.Promise = global.Promise;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/api/exercise/new-user', (req, res) => {
  var username = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username
  });
  username
    .save()
    .then(result => {
      res.status(201).json({
        username: result.username,
        _id: result._id
      });
    })
    .catch(err => {
      res.status(500).json('username already taken');
    });
});

app.get('/api/exercise/users', (req, res) => {
  User.find()
    .select('username _id')
    .exec()
    .then(data => res.status(200).json(data));
});

app.post('/api/exercise/add', async (req, res) => {
  try {
    const data = await User.find({ _id: req.body.userId }).exec();
  } catch (err) {
    return err;
  }
  console.log(data[0].username);

  // const data2 = new Exercise({
  //   userId: { type: String, ref: 'User' },
  //   description: { type: String, required: true },
  //   duration: { type: Number, required: true },
  //   date: { type: String, required: true }
  // })
});

app.listen(port, () => {
  console.log('Node is listening on port 8080');
});

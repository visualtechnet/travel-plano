require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const port = process.env.PORT || 8090;

const app = express();
const router = express.Router();

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'));

router.get('/', (req, res) => {
  res.send('Ok');
});

app.use(router);

app.listen(port, () => {
  console.log('Welcome to Travel Plano');
  console.log('A Travel Application to pull multiple types of data from different sources. A Udacity project presented by Mark Guerrero');
  console.log(`Application is running on port ${port}`);
});

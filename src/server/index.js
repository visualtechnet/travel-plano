require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const port = process.env.PORT || 8090;
const { dailyForecastByLatLng } = require('./weather');
const { getPicByQuery } = require('./pixlocation');
const { searchByPostalCode } = require('./geolocation');

const app = express();
const router = express.Router();

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'));

router.get('/weather/postal/:lat/:lng', async (req, res) => {
  const { lat, lng } = req.params;

  const forecast = await dailyForecastByLatLng(lat, lng).catch((err) => res.status(500).send(`Unable to fulfill request: ${err.message}`));

  res.status(200).send(forecast);
});

router.get('/pixlocation/:query', async (req, res) => {
  const { query } = req.params;

  const pictures = await getPicByQuery(query).catch((err) => res.status(500).send(`Unable to get pictures: ${err.message}`));

  res.status(200).send(pictures);
});

router.get('/geolocation', async (req, res) => {
  const { postalcode } = req.query;

  const geoLoc = await searchByPostalCode(postalcode).catch((err) => res.status(500).send(`Unable to get pictures: ${err.message}`));

  res.status(200).send(geoLoc);
});

app.use(router);

app.listen(port, () => {
  console.log('Welcome to Travel Plano');
  console.log('A Travel Application to pull multiple types of data from different sources. A Udacity project presented by Mark Guerrero');
  console.log(`Application is running on port ${port}`);
});

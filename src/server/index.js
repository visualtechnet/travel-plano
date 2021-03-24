require('babel-polyfill');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const port = process.env.PORT || 8090;
const { dailyForecastByLatLng } = require('./weather');
const { getPicByQuery } = require('./pixlocation');
const { searchByPostalCode, searchByLocation } = require('./geolocation');

const app = express();
// const router = express.Router();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 'script-src \'self\' https://travel-plano-server.herokuapp.com');

  return next();
});

app.use(express.static('dist'));

app.get('/weather/postal/:lat/:lng', async (req, res) => {
  const { lat, lng } = req.params;

  const forecast = await dailyForecastByLatLng(lat, lng).catch((err) => res.status(500).send(`Unable to fulfill request: ${err.message}`));

  res.status(200).send(forecast);
});

app.get('/pixlocation/:query', async (req, res) => {
  const { query } = req.params;

  const pictures = await getPicByQuery(query).catch((err) => res.status(500).send(`Unable to get pictures: ${err.message}`));

  res.status(200).send(pictures);
});

app.get('/geolocation', async (req, res) => {
  const { postalcode } = req.query;

  const geoLoc = await searchByPostalCode(postalcode).catch((err) => res.status(500).send(`Unable to get pictures: ${err.message}`));

  res.status(200).send(geoLoc);
});

app.get('/geolocation/location', async (req, res) => {
  const { placename } = req.query;

  const geoLoc = await searchByLocation(placename).catch((err) => res.status(500).send(`Unable to get pictures: ${err.message}`));

  res.status(200).send(geoLoc);
});

const server = app.listen(port, () => {
  console.log('Welcome to Travel Plano');
  console.log('A Travel Application to pull multiple types of data from different sources. A Udacity project presented by Mark Guerrero');
  console.log(`Application is running on port ${port}`);
});

module.exports = server;

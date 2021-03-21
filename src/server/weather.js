const fetch = require('node-fetch');
const config = require('./config');

const dailyForecastByLocation = async (location) => {
  const url = `${config.WEATHERBIT.url}/forecast/daily?city=${location}&key=${config.WEATHERBIT.apikey}`;

  const result = await fetch(url).then((res) => res.json()).catch((err) => { throw err; });

  return result;
};

const dailyForecastByLatLng = async (lat, lng) => {
  const url = `${config.WEATHERBIT.url}/forecast/daily?lat=${lat}&lon=${lng}&key=${config.WEATHERBIT.apikey}`;

  const result = await fetch(url).then((res) => res.json()).catch((err) => { throw err; });

  return result;
};

const dailyForecastByPostalCode = async (postalcode) => {
  const url = `${config.WEATHERBIT.url}/forecast/daily?postal_code=${postalcode}&key=${config.WEATHERBIT.apikey}`;

  const result = await fetch(url).then((res) => res.json()).catch((err) => { throw err; });

  return result;
};

module.exports = {
  dailyForecastByLocation,
  dailyForecastByLatLng,
  dailyForecastByPostalCode,
};

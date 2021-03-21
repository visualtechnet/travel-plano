const fetch = require('node-fetch');
const config = require('./config');

const searchByPostalCode = async (postalcode) => {
  const url = `${config.GEONAMES.url}/postalCodeSearch?postalcode=${postalcode}&username=${config.GEONAMES.username}`;

  const result = await fetch(url).then((res) => res.json()).catch((err) => { throw err; });

  return result;
};

const searchByLocation = async (location) => {
  const url = `${config.GEONAMES.url}/postalCodeSearch?placename=${location}&username=${config.GEONAMES.username}`;

  const result = await fetch(url).then((res) => res.json()).catch((err) => { throw err; });

  return result;
};

module.exports = {
  searchByPostalCode,
  searchByLocation,
};

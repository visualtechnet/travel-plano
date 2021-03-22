const fetch = require('node-fetch');
const { uuid } = require('uuidv4');
const config = require('./config');

const searchByPostalCode = async (postalcode) => {
  const url = `${config.GEONAMES.url}/postalCodeSearchJSON?postalcode=${postalcode}&username=${config.GEONAMES.username}&maxRows=10`;
  const result = await fetch(url).then((res) => res.json()).catch((err) => { throw err; });
  const postalCodeWithId = result && result.postalCodes.map((postalCode) => ({ ...postalCode, id: uuid(), text: postalCode.placeName }));

  return { postalCodes: postalCodeWithId };
};

const searchByLocation = async (location) => {
  const url = `${config.GEONAMES.url}/postalCodeSearchJSON?placename=${location}&username=${config.GEONAMES.username}&maxRows=10`;

  const result = await fetch(url).then((res) => res.json()).catch((err) => { throw err; });

  return result;
};

module.exports = {
  searchByPostalCode,
  searchByLocation,
};

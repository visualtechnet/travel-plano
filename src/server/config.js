const GEONAMES = {
  username: process.env.GEONAMES_USERNAME,
  url: process.env.GEONAMES_URL,
};

const WEATHERBIT = {
  apikey: process.env.WEATHERBIT_APIKEY,
  url: process.env.WEATHERBIT_URL,
};

const PIXABAY = {
  APIKEY: process.env.PIXABAY_APIKEY,
  url: process.env.PIXABAY_URL,
};

module.exports = {
  GEONAMES,
  WEATHERBIT,
  PIXABAY,
};

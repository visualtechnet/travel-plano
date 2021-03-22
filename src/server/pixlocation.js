const fetch = require('node-fetch');
const config = require('./config');

const getPicByQuery = async (description) => {
  const url = `${config.PIXABAY.url}/?key=${config.PIXABAY.APIKEY}&q=${escape(description)}&image_type=photo`;

  console.log(url);
  const result = await fetch(url).then((res) => res.json()).catch((err) => { throw err; });

  return result;
};

module.exports = {
  getPicByQuery,
};

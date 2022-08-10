const axios = require('axios').default;

// middleware for formatting errors from express-validator middleware
const handleGeocode = async (req, res, next) => {
  const { address, city, state, zipcode } = req.body;

  if (!address || !city || !state || !zipcode) next();
  // construct full addresss
  const fullAddress = `${address}, ${city}, ${state}, ${zipcode}`;
  // construct full url
  const url = `${process.env.GEOCODING_BASE_URL}${fullAddress}&key=${process.env.GOOGLE_API_KEY}`;
  // make api request using axios
  const geocodeResponse = await axios.get(url);
  // if no worky
  if (!geocodeResponse.data.results.length) {
    return res.status(400).json({errors: ['You must provide a valid address.']});
  }
  // extract lat and long from respone
  const lat = geocodeResponse.data.results[0].geometry.location.lat;
  const long = geocodeResponse.data.results[0].geometry.location.lng;

  const formattedAddress = geocodeResponse.data.results[0].formatted_address.split(', ');
  const formattedStreetAddress = formattedAddress[0];
  const formattedCity = formattedAddress[1];
  const formattedState = formattedAddress[2].split(' ')[0];
  const formattedZipcode = formattedAddress[2].split(' ')[1];

  req.body.address = formattedStreetAddress;
  req.body.city = formattedCity;
  req.body.state = formattedState;
  req.body.zipcode = formattedZipcode;
  req.body.lat = lat;
  req.body.long = long;

  next();
};

module.exports = {
  handleGeocode
};

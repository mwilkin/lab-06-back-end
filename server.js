'use strict';

//Load Environment Vairables from the .env file
require('dotenv').config();

//Application Dependencies
const express = require('express');
const cors  = require('cors');

//Application Setup
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

//API Routes
app.get('/location', (request, response) => {
  try {
    const locationData = searchToLatLong(request.query.data);
    response.send(locationData);
  }
  catch (error) {
    console.log(error);
    response.status(500).send('Status: 500. So sorry, something went wrong');
  }
});

//Helper Function
function searchToLatLong(query) {
  const geoData =require('./data/geo.json');
  const location = {
    search_query: query,
    formatted_query: geoData.results[0].formatted_address,
    latitude: geoData.results[0].geometry.location.lat,
    longitude: geoData.results[0].geometry.location.lng
  };
  return location;
}

// //Refactor
// function Location(query, geoData){
//   this.search_query = query;
//   this.formatted_query = geoData.results[0].formatted_address;
//   this.latitude = geoData.results[0].geometry.location.lat;
//   this.longitude = geoData.results[0].geometry.location.lng;
// }

//Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));

var express = require('express');
let User = require('../../../models').User;
let Location = require('../../../models').Location;
var router = express.Router();
var fetch = require('node-fetch');

router.post('/api/v1/favorites', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  User.findOne({where: {api_key: req.body.api_key}})
  .then(user => {
    Location.create({
      location: req.body.location,
      UserId: user.id
    })
    .then(location => {
      res.status(200).send(JSON.stringify(location));
    });
  })
  .catch(() => {
    res.status(403).send(JSON.stringify({error: 'Invalid API Key'}));
  });
});

router.get('/api/v1/favorites', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  User.findOne({where: {api_key: req.body.api_key}})
  .then(async user => {
    let results = [];
    let locations = await user.getLocations()
    let getForecast = async location => {
      let google_params = '?key=' + process.env.GOOGLE_API_KEY + '&address=' + location.dataValues.location;
      let google_response = await fetch('https://maps.googleapis.com/maps/api/geocode/json' + google_params)
      let google_results = await google_response.json();
      let coordinates = google_results.results[0].geometry.location;
      let darksky_params = process.env.DARKSKY_API_KEY + '/' + coordinates.lat + ',' + coordinates.lng
      let darksky_response = await fetch('https://api.darksky.net/forecast/' + darksky_params)
      let darksky_results = await darksky_response.json();
      return darksky_results;
    };
    for(i = 0; i < locations.length; i++) {
      results.push(await getForecast(locations[i]));
    };
    res.status(200).send(JSON.stringify(results));
  })
  .catch(error => {
    console.log(error);
    res.status(403).send(JSON.stringify({error: error}));
  });
});

module.exports = router


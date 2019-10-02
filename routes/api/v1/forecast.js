var express = require('express');
var router = express.Router();
var User = require('../../../models').User;
var fetch = require('node-fetch');

router.get('/api/v1/forecast', (req, res) => {
  let google_params = '?key=' + process.env.GOOGLE_API_KEY + '&address=' + req.query.location;
  fetch('https://maps.googleapis.com/maps/api/geocode/json' + google_params).then(res => res.json())
  .then(result => {
    console.log(result.results[0].geometry.location);
    let coordinates = result.results[0].geometry.location;
    let darksky_params = process.env.DARKSKY_API_KEY + '/' + coordinates.lat + ',' + coordinates.lng
    fetch('https://api.darksky.net/forecast/' + darksky_params).then(res => res.json())
    .then(result => {
      res.status(200).send(JSON.stringify(result));
    })
    .catch(error => {
      console.log(error);
    });
  })
  .catch(error => {
    console.log(error);
  });
});

module.exports = router

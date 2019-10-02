var express = require('express');
let User = require('../../../models').User;
let Location = require('../../../models').Location;
var router = express.Router();

router.post('/api/v1/favorites', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  User.findOne({where: {api_key: req.body.api_key}})
  .then(user => {
    Location.create({
      location: req.body.location,
      userID: user.id
    })
    .then(location => {
      res.status(200).send(JSON.stringify(location));
    });
  })
  .catch(() => {
    res.status(403).send(JSON.stringify({error: 'Invalid API Key'}));
  });
});

module.exports = router


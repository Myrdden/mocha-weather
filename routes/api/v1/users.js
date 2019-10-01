var express = require('express');
var router = express.Router();
var User = require('../../../models').User;
var crypto = require('crypto');
var bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/api/v1/users', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    User.create({
      email: req.body.email,
      password: hash,
      api_key: crypto.randomBytes(20).toString('hex')
    })
    .then(user => {
      res.setHeader('Content-Type', 'application/json');
      res.status(201).send(JSON.stringify({api_key: user.api_key}));
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send(JSON.stringify({error}));
    });
  })
});

module.exports = router;

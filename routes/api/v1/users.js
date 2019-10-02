let express = require('express');
let router = express.Router();
let User = require('../../../models').User;
let crypto = require('crypto');
let bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/api/v1/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    User.create({
      email: req.body.email,
      password: hash,
      api_key: crypto.randomBytes(20).toString('hex')
    })
    .then(user => {
      res.status(201).send(JSON.stringify({api_key: user.api_key}));
    })
    .catch(error => {
      res.status(500).send(JSON.stringify({error}));
    });
  })
});

router.post('/api/v1/sessions', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  User.findOne({where: {email: req.body.email}})
  .then(user => {
    if (!user) {
      res.status(500).send(JSON.stringify({error: 'Email or Password Incorrect'}));
    } else {
      bcrypt.compare(req.body.password, user.password, (err, successful) => {
        if (successful) {
          res.status(200).send(JSON.stringify({api_key: user.api_key}));
        } else {
          res.status(500).send(JSON.stringify({error: 'Email or Password Incorrect'}));
        }
      });
    }
  })
  .catch(error => {
    res.status(500).send(JSON.stringify({error}));
  });
});

module.exports = router;

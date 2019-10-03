var shell = require('shelljs');
var request = require('supertest');
var app = require('../app');
let db = require('../models');
let crypto = require('crypto');

describe('', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create');
  });
  beforeEach(() => {
    shell.exec('npx sequelize db:seed:all');
    shell.exec('npx sequelize db:migrate');
  });
  afterEach(() => shell.exec('npx sequelize db:migrate:undo:all'));

  test('POST User Create', () => {
    var userData = {email: 'test@email.ru', password: 'password'};
    return request(app).post('/api/v1/users').send(userData).then(res => {
      expect(res.status).toBe(201);
      expect(Object.keys(res.body)).toEqual(['api_key']);
    });
  });

  test('POST User Login', () => {
    var userData = {email: 'test@email.ru', password: 'password'};
    db.User.create({
      email: userData.email,
      password: userData.password,
      api_key: crypto.randomBytes(20).toString('hex')
    })
    .then(user => {

    });
    return request(app).post('/api/v1/sessions').send(userData).then(res => {
      expect(res.status).toBe(201);
    });
  });
});

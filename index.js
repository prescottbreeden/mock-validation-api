const express = require('express');
const cors = require('cors');
const controller = require('./controller');
const port = 5000;

// run tests
require('./test');

express()
  .use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .get('/', (_, res) => res.json('api listening on port 5000'))
  .post('/api/name', controller.postName)
  .post('/api/friend', controller.postFriend)
  .post('/api/panda', controller.postPanda)
  .use('*', (_, res) => res.status(404).json('Route not found'))
  .listen(port, () => console.log('listening on port 5000'));


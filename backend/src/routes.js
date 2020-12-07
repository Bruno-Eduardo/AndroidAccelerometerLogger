const express = require('express');

const RawDataReceiverController = require('./controllers/RawDataReceiverController');
const NewOutputController = require('./controllers/NewOutputController');

const routes = express.Router();

routes.post('/newdata', RawDataReceiverController.create)
routes.get('/readdata', NewOutputController.create)

module.exports = routes;

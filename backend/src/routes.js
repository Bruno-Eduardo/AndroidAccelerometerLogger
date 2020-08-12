const express = require('express');

const RawDataReceiverController = require('./controllers/RawDataReceiverController');

const routes = express.Router();

routes.post('/newdata', RawDataReceiverController.create)

module.exports = routes;

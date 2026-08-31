// const connectToDatabase = require('./helper/dbConnect');
const ServiceBroker = require('./broker/broker');
const express = require('express');
const config = require('./config/config');

(async () => {
  try {
    await ServiceBroker.start();
    console.log('Broker is ready');

    ServiceBroker.loadService(__dirname + '/service/service');
    
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
})();

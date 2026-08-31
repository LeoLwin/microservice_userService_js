const { ServiceBroker } = require('moleculer');
const dotenv = require('dotenv');
const config = require('../config/config');

dotenv.config();

console.log('Redis Config:', {
  host: config.redis.host,
  port: Number(config.redis.port),
  password: config.redis.password,
  db: 0,
});

const theBroker = new ServiceBroker({
  namespace: 'BlogMaKyawt',
  nodeID: 'blogServices' + Math.floor(Math.random() * 10000),
  logLevel: 'info',
  transporter: {
    type: 'Redis',
    options: {
      host: config.redis.host,
      port: Number(config.redis.port),
      password: config.redis.password,
      db: 0,
    },
  },
  cacher: {
    type: 'Redis',
    options: {
      redis: {
        host: config.redis.host,
        port: Number(config.redis.port),
        password: config.redis.password,
        db: 0,
      },
    },
  },
  logger: true,
  created(broker) {
    broker.logger.info('created');
  },
  started(broker) {
    broker.logger.info('started');
  },
  stopped(broker) {
    broker.logger.info('stopped');
  },
});

module.exports = theBroker;

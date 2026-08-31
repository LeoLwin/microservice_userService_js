import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import ServiceBroker from './broker/broker.js';
import config from './config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

(async () => {
  try {
    await ServiceBroker.start();
    console.log('Broker is ready');

    ServiceBroker.loadService(path.join(__dirname, 'service', 'service.js'));

    app.listen(config.port, () => {
      console.log(`API server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
})();

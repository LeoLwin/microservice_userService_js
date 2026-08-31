// const connectToDatabase = require('./helper/dbConnect');
const ServiceBroker = require('./broker/broker');
const express = require('express');
const config = require('./config/config');

(async () => {
  try {
    await ServiceBroker.start();
    console.log('Broker is ready');

    ServiceBroker.loadService(__dirname + '/service/service');

    // const app = express();
    // app.use(express.json());

    // app.get('/test', (req, res) => {
    //   res.send('Welcome to Student Management System API');
    // });

    // const PORT = config.port;
    // app.listen(PORT, '0.0.0.0', () => {
    //   console.log(`Server is listening on http://0.0.0.0:${PORT}`);
    // });

    // Example calls:
    // const result = await ServiceBroker.call('blog.list', { current: 1, limit: 10 });
    // console.log('Result : ', result);
    // const result = await ServiceBroker.call('blog.create', { title: 'title', content: 'content' });
    // console.log('Result:', result);
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
})();

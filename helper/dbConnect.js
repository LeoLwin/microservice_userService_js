const mongoose = require('mongoose');
const config = require('../config/config');

const uri = config.mongoUri;

const connectToDatabase = async () => {
  console.log('Mongo URI:', uri);

  if (!uri) {
    throw new Error('MONGO_URI is not defined in environment variables!');
  }

  try {
    await mongoose.connect(uri, {
      dbName: 'blog',
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

module.exports = connectToDatabase;

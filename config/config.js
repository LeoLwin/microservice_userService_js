import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/blog',
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'blog',
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    password: process.env.REDIS_PASSWORD,
  },
};

console.log('Config : ', config);

export default config;

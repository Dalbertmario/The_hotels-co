import express from 'express';
import pg from 'pg';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
const { Client } = pg;
import cors from 'cors';
import morgan from 'morgan';
import clientrouter from './router/cabins/index.js';
import bookingRouter from './router/bookings/index.js';
import GuestRouter from './router/Guest/index.js';
import DashboardRouter from './router/dashboard/index.js';
import userRouter from './router/user/user.js';

const app = express();
app.use(cors());
app.use(morgan('dev'));
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const apikey = process.env.JWT_SECRET;
//DB
const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 5432,
  ssl: { rejectUnauthorized: false },
});
//S#
const S3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
client
  .connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Connection error', err.stack);
    process.exit(1); // Exit the application if the database connection fails
  });

app.use('/hotel', clientrouter(client, S3));
app.use('/hotel', bookingRouter(client));
app.use('/hotel', GuestRouter(client));
app.use('/hotel', DashboardRouter(client));
app.use('/hotel', userRouter(client, apikey));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

import express from 'express';
import pg from 'pg';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
const { Client } = pg;
import cors from 'cors';
import morgan from 'morgan';
import cabinrouter from './routes/cabins/index.js';
import bookingRouter from './routes/bookings/index.js';
import GuestRouter from './routes/Guest/index.js';
import DashboardRouter from './routes/dashboard/index.js';
import userRouter from './routes/user/user.js';

const app = express();
app.use(cors());
app.use(morgan('dev'));
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const apikey = process.env.JWTSECRET;
//DB
const client = new Client({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
  port: 5432,
  ssl: { rejectUnauthorized: false },
});
//S3#
const S3 = new S3Client({
  region: process.env.AWSREGION,
  credentials: {
    accessKeyId: process.env.AWSACCESSKEY,
    secretAccessKey: process.env.AWSSECRETKEY,
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

app.use('/hotel', cabinrouter(client, S3));
app.use('/hotel', bookingRouter(client));
app.use('/hotel', GuestRouter(client));
app.use('/hotel', DashboardRouter(client));
app.use('/hotel', userRouter(client, apikey, S3));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

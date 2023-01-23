
import express from 'express';
import cors from 'cors';
import router from './api/api-router.js';
import dotenv from 'dotenv';
import morgan from 'morgan';

const app = express();

// enable cors
app.use(cors());

// enable request log
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// enable parsing body as json
app.use(express.json());

// router to handle /
app.get('/', (req, res) => {
  res.send('Hello World!!')
});

// Set up the router to handle request to /api/** 
app.use('/api', router);

// Load the .env file into process.env
dotenv.config()

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

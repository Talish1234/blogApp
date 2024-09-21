require('dotenv').config()
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const userrouter = require('./routes/userroute.js');
const postrouter = require('./routes/postroute.js');
const reviewroute = require('./routes/reviewroute.js');

const app = express();

const BASE_URL = process.env.BASE_URL;
app.use(cors({
    origin: BASE_URL,
    credentials: true,
  }));

app.use(express.json());
app.use(cookieParser());
app.use('/api/user',userrouter);
app.use('/api/post',postrouter);
app.use('/api/review',reviewroute);
app.listen(3000,()=> {
    ('working...');
})
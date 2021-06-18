const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors');
const kidsController = require('./controllers/kidsController');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./models/mongodb');
const Kids = require('./models/kidsModel');
const { urlencoded } = require('body-parser');


//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/kids', kidsController);


const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`)
})
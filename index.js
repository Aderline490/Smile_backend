require('dotenv/config');
const cors = require('cors');
const kidsController = require('./controllers/orphanageController');
const orhpController = require('./controllers/orphanageController');
const express = require('express');
const app = express();
require('./models/mongodb');

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/kids', kidsController);
app.use('/orphanage', orhpController);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
});

 // For setting up mongoDB call this file in server.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
mongoose.set('strictQuery', false)
dotenv.config();



mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
    },
    () => {
        console.log("Connected to DB!");
    }
);
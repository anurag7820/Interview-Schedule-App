// Keep Working Hard MAN! these efforts will surely pay one day

const express = require ('express');
const path = require ('path');
const db = require ('./db'); 

const app = express();

app.set('view engine','ejs');

// First render
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes --->
app.use('/api', require('./Routes/Api').route);

app.listen('8000', () => console.log("Server started at http://localhost:8000"));
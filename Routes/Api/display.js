const route = require('express').Router();
const Table = require('../../models/Table')

// To Render the list
route.get('/', (req, res, next) => {

    Table.find({}, (err, data) => {
        console.log(data);
        res.render("index.ejs", {
            table: data,
        });
    });

    return;

});


exports = module.exports = {
    route,
}   
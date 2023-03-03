const mongoose = require('mongoose');

const Table = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
    },

    id: {
        type: Number,
        required: true,
    },

    startTime: {
        type: String,
        required: true,
    },

    endTime: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model('Table', Table);
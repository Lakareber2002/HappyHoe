const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const creditSchema = new mongoose.Schema({
    producename: {
        type: String,  // Corrected from 'typeof' to 'type'
        trim: true
    },
    produceType: {
        type: String,
        trim: true
    },
    producePrice: {
        type: Number,
        trim: true
    },
    date: {
        type: Date,
        trim: true 
    },
    time: {
        type: String,
        trim: true
    },
    tonnage: {
        type: Number,
        trim: true
    },
    customerName: {
        type: String,
        trim: true
    },
    customerContact: {
        type: Number,
        trim: true
    },
    branch: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Credit', creditSchema);

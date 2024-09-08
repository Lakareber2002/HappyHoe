const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const produceSchema = new mongoose.Schema({
    producename: {
        type: String,
        trim: true
    },
    producetype: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        trim: true
    },
    time: {
        type: String
    },
    tonnage: {
        type: Number,
        trim: true
    },
    source: {
        type: String,
        trim: true
    },
    dealer: {
        type: String,
        trim: true
    },
    companyname: {
        type: String,
        trim: true
    },
    branch: {
        type: String,
        trim: true
    },
    contact: {
        type: Number,
        trim: true
    },
    price: {
        type: Number,
        trim: true
    }
});

module.exports = mongoose.model('Produce', produceSchema);
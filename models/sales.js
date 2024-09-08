const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const salesSchema = new mongoose.Schema({
    producename: {
        type: String,
        trim: true
    },
    produceType: {
        type: String,
        trim: true
    },
    unitPrice:{
        type: Number,
        trim: true
    },
    quantityPurchased:{
        type: Number,
        trim: true 
    },
    pricePaid:{
        type: Number,
        trim: true
    },
    date:{
        type: Date,
        trim: true
    },
    time:{
        type: String,
        trim: true
    },
    branch:{
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Sales', salesSchema);

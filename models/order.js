const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const orderSchema = new mongoose.Schema({
    produceName: {
        type: String,  
        trim: true
    },
    quantity: {
        type: Number,
        trim: true
    },
    paymentMade: {
        type: Number,
        trim: true
    },
    customerName: {
        type: String,
        trim: true 
    },
    customerContact: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    paymentMode: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
    },
    time: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Order', orderSchema);

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const landingSchema = new mongoose.Schema({
    Beans: {
        type: String,
        trim: true,
    },
    Peas: {
        type: String,
        trim: true,
        
    },
    Soyabeans: {
        type: String,
        trim: true,
    },
    Gnuts: {
        type: String,
        trim: true,
    }
});
module.exports = mongoose.model('Landing', landingSchema);
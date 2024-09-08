const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
    },
    confirmPassword: {
        type: String,
        trim: true,
    },
    branch: {
        type: String,
        trim: true,
    },
    contact:{
        type: Number,
        trim: true,
    }
});
registerSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
});
module.exports = mongoose.model("Register", registerSchema);
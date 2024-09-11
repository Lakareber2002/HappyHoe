const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const dashboardSchema = new mongoose.Schema({

  name: { 
    type: String, 
    required: true
 },
  contact: {
     type: String, 
     required: true
     },
  position: {
     type: String, 
     required: true
     },
  branch: {
     type: String, 
     required: true 
    }
  
});

module.exports = mongoose.model('Dashboard', dashboardSchema);

// Import necessary modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require("passport");
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false
});

require('dotenv').config();

// Import routes
//const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes'); // Ensure this is correctly defined
const addproduceRoutes = require('./routes/addproduceRoutes');
const creditRoutes = require('./routes/creditRoutes');
const salesRoutes = require('./routes/salesRoutes');



async function MongodbConnection() {
 try{
    mongoose.connect('mongodb+srv://kalungirasuli495:12345qwerty@cluster0.1p9md.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{useNewUrlParser:true,useUnifiedTopology:true});;
 }catch(error){
  console.error(
    'connection failed , try again connecting to database'
  )
 }
 
};
MongodbConnection()
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('Connected to MongoDB');
});
// Instantiate app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session and passport middleware
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// Routes
//app.use('/login', loginRoutes);
app.use('/register', registerRoutes); // Correct reference here
app.use('/addproduce', addproduceRoutes);
app.use('/credit', creditRoutes);
app.use('/sales', salesRoutes);

// Handle 404 errors
app.get("*", (req, res) => {
  res.send("Error! Page does not exist");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port} with db`);
});

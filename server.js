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



//importing models
const Register = require('./models/register')







require('dotenv').config();

// Import routes
const registerRoutes = require('./routes/registerRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const addproduceRoutes = require('./routes/addproduceRoutes');
const creditRoutes = require('./routes/creditRoutes');
const salesRoutes = require('./routes/salesRoutes');
const homeRoutes = require('./routes/homeRoutes');
const landingRoutes = require('./routes/landingRoutes');
const orderRoutes = require('./routes/orderRoutes');



// Instantiate app
const app = express();
const port = process.env.PORT || 5000;




// Mongoose connection to local DB
mongoose.connect(process.env.DATABASE_LOCAL, {
  
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Database connection error:', err.message);
});



app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));  // Ensure the path to the views is correct











// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());





// Express session and passport middleware
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());




passport.use(Register.createStrategy());// use the local strategy
passport.serializeUser(Register.serializeUser());// assign a serial number to a user in the system
passport.deserializeUser(Register.deserializeUser());// the serial number is destroyed on log out





// Routes
app.use('/', registerRoutes);
app.use('/', dashboardRoutes);
app.use('/', addproduceRoutes);
app.use('/', creditRoutes);
app.use('/', salesRoutes);
app.use('/', homeRoutes);
app.use('/', landingRoutes);
app.use('/', orderRoutes);


// Example route for confirmation
app.get('/order-confirmation', (req, res) => {
  res.render('orderConfirmation'); // Create this view to show a confirmation message
});

// Handle 404 errors
app.get("*", (req, res) => {
  res.send("Error! Page does not exist");
});




// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

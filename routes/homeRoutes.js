const express = require('express');
const router = express.Router();

// Home route
router.get('/welcome', (req, res) => {
  res.render('home'); // This will render the home.pug file
});

// Signin route
router.get('/register', (req, res) => {
  res.render('register'); // Render the register.pug file
});

// Explore route
router.get('/landing', (req, res) => {
  res.render('landing'); // Render the landing.pug file
});

module.exports = router;

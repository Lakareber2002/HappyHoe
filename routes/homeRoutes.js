const express = require('express');
const router = express.Router();

// Home route
router.get('/welcome', (req, res) => {
  res.render('home'); 
});

// Signin route
router.get('/login', (req, res) => {
  res.render('login'); 
});


// Handle POST request for login form submission
router.post('/login', (req, res) => {
  const { name, email, password } = req.body;

  // Simple login validation (replace with actual authentication logic)
  if (email === "user@example.com" && password === "password123") {
    // Redirect to dashboard upon successful login
    return res.redirect('/dashboard');
  } else {
    // Redirect back to login with an error message if credentials are invalid
    return res.redirect('/login?error=Invalid credentials');
  }
});


// Explore route
router.get('/landing', (req, res) => {
  res.render('landing'); 
});

module.exports = router;

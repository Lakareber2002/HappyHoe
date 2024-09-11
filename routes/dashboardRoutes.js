const express = require('express');
const router = express.Router();
const passport = require('passport');
//const Register = require('../models/User');
const Sales = require('../models/sales');
const Credit = require('../models/credit');
const Produce = require('../models/produce');
const Dashboard = require("../models/dashboard");


// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); // Redirect to login if not authenticated
}

// Dashboard route - accessible to both manager and sales agent
router.get('/dashboard', isAuthenticated, (req, res) => {
  const userRole = req.user.role; // Get user role from the request
  
  if (userRole === 'manager' || userRole === 'sales_agent') {
    res.render('dashboard', { role: userRole }); // Render dashboard with the user role
  } else {
    res.status(403).send('Access denied. You do not have permission to view this page.');
  }
});

// Route for managing team (Manager only)
router.get('/team-management', isAuthenticated, (req, res) => {
  if (req.user.role === 'manager') {
    res.render('team-management');
  } else {
    res.status(403).send('Access denied. Only managers can view this page.');
  }
});

// Route for viewing reports (Manager only)
router.get('/reports', isAuthenticated, (req, res) => {
  if (req.user.role === 'manager') {
    res.render('reports');
  } else {
    res.status(403).send('Access denied. Only managers can view reports.');
  }
});

// Route for viewing sales tasks (Sales Agent only)
router.get('/sales-tasks', isAuthenticated, (req, res) => {
  if (req.user.role === 'sales_agent') {
    res.render('sales-tasks');
  } else {
    res.status(403).send('Access denied. Only sales agents can view tasks.');
  }
});

// Route for viewing performance metrics (Sales Agent only)
router.get('/performance', isAuthenticated, (req, res) => {
  if (req.user.role === 'sales_agent') {
    res.render('performance');
  } else {
    res.status(403).send('Access denied. Only sales agents can view performance.');
  }
});

// Additional routes for shared functionality
router.get('/sales', isAuthenticated, (req, res) => {
  res.render('sales');
});

router.get('/credit-sales', isAuthenticated, (req, res) => {
  res.render('credit-sales');
});

router.get('/procurements', isAuthenticated, (req, res) => {
  res.render('procurements');
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/login'); // Redirect to login after logout
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Sales = require('../models/sales');
const Credit = require('../models/credit');
const Produce = require('../models/produce');
const Dashboard = require("../models/dashboard");

// Dashboard route - accessible to all users
router.get('/dashboard', (req, res) => {
  res.render('dashboard'); // Render dashboard without role checks
});

// Route for managing team (Manager only)
router.get('/team-management', (req, res) => {
  res.render('team-management'); // Render team management without role checks
});

// Route for viewing reports (Manager only)
router.get('/reports', (req, res) => {
  res.render('reports'); // Render reports without role checks
});

// Route for viewing sales tasks (Sales Agent only)
router.get('/sales-tasks', (req, res) => {
  res.render('sales-tasks'); // Render sales tasks without role checks
});

// Route for viewing performance metrics (Sales Agent only)
router.get('/performance', (req, res) => {
  res.render('performance'); // Render performance without role checks
});

// Additional routes for shared functionality
router.get('/sales', (req, res) => {
  res.render('sales');
});

router.get('/credit-sales', (req, res) => {
  res.render('credit-sales');
});

router.get('/procurements', (req, res) => {
  res.render('procurements');
});

// Logout route (no need for logout if no authentication)
router.get('/logout', (req, res) => {
  res.redirect('/login'); // Redirect to login page (optional, if needed)
});

module.exports = router;

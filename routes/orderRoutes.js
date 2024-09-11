const express = require('express');
const router = express.Router();
const Order = require('../models/order');

let orders = []; // In-memory order storage for demo purposes

// Render the order form
router.get('/order', (req, res) => {
  res.render('orderForm'); // Render the Pug template for the order form
});

// Handle form submission
router.post('/submit-order', (req, res) => {
  const { productName, quantity, paymentMade, customerName, customerContact, location, paymentMode, date, time } = req.body;

  // Create a new order object
  const newOrder = {
    id: orders.length + 1, // Generate a simple ID (in a real app, use a unique ID)
    productName,
    quantity,
    paymentMade,
    customerName,
    customerContact,
    location,
    paymentMode,
    date,
    time
  };

  // Add the new order to the orders array
  orders.push(newOrder);

  // Redirect to the order list after submission
  res.redirect('/orderlist');
});

// Display the order list
router.get('/orderlist', (req, res) => {
  res.render('orderList', { orders }); // Pass the orders array to the Pug template
});

// Redirect to order confirmation after viewing the order list
router.get('/order-confirmation', (req, res) => {
  res.render('orderConfirmation'); // Render the confirmation page
});

// Edit order route (not implemented fully)
router.get('/edit-order/:id', (req, res) => {
  const orderId = req.params.id;
  // Logic to find and render the order edit form goes here
  res.send(`Edit order form for order ID: ${orderId}`);
});

// Delete order route
router.post('/delete-order/:id', (req, res) => {
  const orderId = req.params.id;
  // Logic to delete the order with the given ID
  orders = orders.filter(order => order.id !== parseInt(orderId, 10)); // Remove order by ID
  res.redirect('/orderlist'); // Redirect back to the order list
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Order = require('../models/order');  // Assuming your Order schema is already set up in 'models/order'

// Render the order form
router.get('/order', (req, res) => {
  res.render('orderForm');  // Render the Pug template for the order form
});

// Handle form submission and save to MongoDB
router.post('/submit-order', async (req, res) => {
  const { productName, quantity, paymentMade, customerName, customerContact, location, paymentMode, date, time } = req.body;

  try {
    // Create a new Order document (instance of the Order model)
    const newOrder = new Order({
      productName,
      quantity,
      paymentMade,
      customerName,
      customerContact,
      location,
      paymentMode,
      date,
      time
    });

    // Save the new order to MongoDB
    await newOrder.save();

    // Redirect to the order list after successful submission
    res.redirect('/orderlist');
  } catch (error) {
    console.error('Error saving order to database:', error);
    res.status(500).send('Error saving order');
  }
});

// Display the order list, fetching from MongoDB
router.get('/orderlist', async (req, res) => {
  try {
    const orders = await Order.find();  // Fetch all orders from MongoDB
    res.render('orderList', { orders });  // Pass the orders to the Pug template
  } catch (error) {
    console.error('Error fetching orders from database:', error);
    res.status(500).send('Error fetching orders');
  }
});

// Redirect to order confirmation after viewing the order list
router.get('/order-confirmation', (req, res) => {
  res.render('orderConfirmation');  // Render the confirmation page
});

// Edit order route (not implemented fully)
router.get('/edit-order/:id', (req, res) => {
  const orderId = req.params.id;
  // Logic to find and render the order edit form goes here
  res.send(`Edit order form for order ID: ${orderId}`);
});

// Delete order route
router.post('/delete-order/:id', async (req, res) => {
  const orderId = req.params.id;

  try {
    // Delete the order with the given ID from MongoDB
    await Order.findByIdAndDelete(orderId);

    // Redirect back to the order list after deletion
    res.redirect('/orderlist');
  } catch (error) {
    console.error('Error deleting order from database:', error);
    res.status(500).send('Error deleting order');
  }
});

module.exports = router;

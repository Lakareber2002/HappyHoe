const express = require('express');
const router = express.Router();
const Sales = require('../models/sales');


let sales = []; // In-memory sales storage for demo purposes

// Render the sales form
router.get('/add_sales', (req, res) => {
  res.render('salesForm'); // Render the Pug template for adding sales
});

// Handle sales form submission
router.post('/add_sales', (req, res) => {
  const { producename, produceType, unitPrice, quantityPurchased, pricePaid, date, time, branch } = req.body;

  // Create a new sales record object
  const newSale = {
    id: sales.length + 1, // Generate a simple ID (in a real app, use a unique ID)
    producename,
    produceType,
    unitPrice,
    quantityPurchased,
    pricePaid,
    date,
    time,
    branch
  };

  // Add the new sales record to the sales array
  sales.push(newSale);

  // Redirect to the sales list
  res.redirect('/saleslist');
});

// Display the sales list
router.get('/saleslist', (req, res) => {
  res.render('saleslist', { sales }); // Pass the sales array to the Pug template
});

// Edit sales route (not implemented fully)
router.get('/update-sale', (req, res) => {
  const saleId = req.params.id;
  // Logic to find and render the sale edit form
  res.send(`Edit sale form for sale ID: ${saleId}`);
});

// Delete sale route
router.post('/delete-sale/:id', (req, res) => {
  const saleId = req.params.id;
  // Logic to delete the sale with the given ID
  sales = sales.filter(sale => sale.id !== parseInt(saleId, 10)); // Remove sale by ID
  res.redirect('/saleslist'); // Redirect back to the sales list
});

module.exports = router;

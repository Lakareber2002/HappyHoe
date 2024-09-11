const express = require('express');
const router = express.Router();
const Produce = require('../models/produce');


let produceList = []; // In-memory storage for produce entries (replace with DB in production)

// Render the produce entry form
router.get('/Produce', (req, res) => {
  res.render('produceForm'); // Render the Pug template for the produce form
});

// Handle form submission to add produce
router.post('/Produce', (req, res) => {
  const { producename, producetype, date, time, tonnage, cost, source, dealer, branch, contact, price } = req.body;

  // Create a new produce entry object
  const newProduce = {
    id: produceList.length + 1, // Generate a simple ID (in a real app, use a unique ID)
    producename,
    producetype,
    date,
    time,
    tonnage,
    cost,
    source,
    dealer,
    branch,
    contact,
    price
  };

  // Add the new produce entry to the list
  produceList.push(newProduce);

  // Redirect to the produce list
  res.redirect('/producelist');
});

// Display the produce list
router.get('/producelist', (req, res) => {
  res.render('producelist', { produce: produceList }); // Pass the produce array to the Pug template
});

// Edit produce route (not implemented fully)
router.get('/edit-produce/:id', (req, res) => {
  const produceId = req.params.id;
  // Logic to find and render the produce edit form
  res.send(`Edit produce form for produce ID: ${produceId}`);
});

// Delete produce route
router.post('/delete-produce/:id', (req, res) => {
  const produceId = req.params.id;
  // Logic to delete the produce entry by ID
  produceList = produceList.filter(produce => produce.id !== parseInt(produceId, 10)); // Remove produce by ID
  res.redirect('/producelist'); // Redirect back to the produce list
});

module.exports = router;

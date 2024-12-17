const express = require('express');
const router = express.Router();
const Sales = require('../models/sales');  

// Render the sales form
router.get('/add_sales', (req, res) => {
  res.render('salesForm');  
});

// Handle sales form submission and save to MongoDB
router.post('/add_sales', async (req, res) => {
  const { producename, produceType, unitPrice, quantityPurchased, pricePaid, date, time, branch } = req.body;

  try {
    // Create a new Sales document (instance of the Sales model)
    const newSale = new Sales({
      producename,
      produceType,
      unitPrice,
      quantityPurchased,
      pricePaid,
      date,
      time,
      branch
    });

    // Save the new sale to MongoDB
    await newSale.save();

    // Redirect to the sales list after successful submission
    res.redirect('/saleslist');
  } catch (error) {
    console.error('Error saving sale to database:', error);
    res.status(500).send('Error saving sale');
  }
});

// Display the sales list, fetching from MongoDB
router.get('/saleslist', async (req, res) => {
  try {
    const sales = await Sales.find();  
    res.render('saleslist', { sales });  
  } catch (error) {
    console.error('Error fetching sales from database:', error);
    res.status(500).send('Error fetching sales');
  }
});

// Edit sales route (find by ID and render the edit form)
router.get('/edit_sales/:id', async (req, res) => {
  const salesId = req.params.id;

  try {
    // Find the sales entry by ID
    const sales = await Sales.findById(salesId);

    if (!sales) {
      return res.status(404).send('Sales not found');
    }

    // Render the edit form and pass the sales details to the template
    res.render('update-sales', { sales });
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).send('Error fetching sales');
  }
});


router.post('/edit_sales/:id', async (req, res) => {
  const saleId = req.params.id;

  try {
    // Delete the sale with the given ID from MongoDB
    await Sales.findByIdAndUpdate(saleId);

    // Redirect back to the sales list after deletion
    res.redirect('/saleslist');
  } catch (error) {
    console.error('Error deleting sale from database:', error);
    res.status(500).send('Error deleting sale');
  }
});



// Delete sale route
router.post('/delete-sale/:id', async (req, res) => {
  const saleId = req.params.id;

  try {
    // Delete the sale with the given ID from MongoDB
    await Sales.findByIdAndDelete(saleId);

    // Redirect back to the sales list after deletion
    res.redirect('/saleslist');
  } catch (error) {
    console.error('Error deleting sale from database:', error);
    res.status(500).send('Error deleting sale');
  }
});

router.get('/receipt/:id', async (req, res) => {
  try {
    // Log the ID being passed
    console.log('Requested Sale ID:', req.params.id);
    
    // Find the sale by ID
    const sale = await Sales.findById(req.params.id);

    // Check if the sale exists
    if (!sale) {
      return res.status(404).send('Sale not found');
    }

    // Render the receipt page with the sale data
    res.render('salesReceipt', { sale });
  } catch (error) {
    console.error('Error fetching Sale from database:', error);
    res.status(500).send('Error fetching Sale');
  }
});


module.exports = router;

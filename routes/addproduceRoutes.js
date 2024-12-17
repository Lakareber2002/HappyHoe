const express = require('express');
const router = express.Router();
const Produce = require('../models/produce'); // Assuming you have a Mongoose model for Produce

// Render the produce entry form
router.get('/Produce', (req, res) => {
  res.render('produceForm'); // Render the Pug template for the produce form
});

// Handle form submission to add produce (save to MongoDB)
router.post('/Produce', async (req, res) => {
  const { producename, producetype, date, time, tonnage, cost, source, dealer, branch, contact, price } = req.body;

  try {
    // Create a new produce entry using the Mongoose model
    const newProduce = new Produce({
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
    });

    // Save the produce entry to MongoDB
    await newProduce.save();

    // Redirect to the produce list after successful save
    res.redirect('/producelist');
  } catch (error) {
    console.error('Error saving produce:', error);
    res.status(500).send('Error saving produce');
  }
});

// Display the produce list (retrieve from MongoDB)
router.get('/producelist', async (req, res) => {
  try {
    // Fetch the list of produce from MongoDB
    const produceList = await Produce.find();

    // Render the list of produce in the Pug template
    res.render('producelist', { produce: produceList });
  } catch (error) {
    console.error('Error fetching produce list:', error);
    res.status(500).send('Error fetching produce list');
  }
});

// Edit produce route (find by ID and render the edit form)
router.get('/edit-produce/:id', async (req, res) => {
  const produceId = req.params.id;

  try {
    // Find the produce entry by ID
    const produce = await Produce.findById(produceId);

    if (!produce) {
      return res.status(404).send('Produce not found');
    }

    // Render the edit form and pass the produce details to the template
    res.render('update-produce', { produce });
  } catch (error) {
    console.error('Error fetching produce:', error);
    res.status(500).send('Error fetching produce');
  }
});


// Delete produce route (remove from MongoDB)
router.post('/edit-produce/:id', async (req, res) => {
  const produceId = req.params.id;

  try {
    // Delete the produce entry from MongoDB
    await Produce.findByIdAndUpdate(produceId);

    // Redirect back to the produce list
    res.redirect('/producelist');
  } catch (error) {
    console.error('Error deleting produce:', error);
    res.status(500).send('Error deleting produce');
  }
});


// Delete produce route (remove from MongoDB)
router.post('/delete-produce/:id', async (req, res) => {
  const produceId = req.params.id;

  try {
    // Delete the produce entry from MongoDB
    await Produce.findByIdAndDelete(produceId);

    // Redirect back to the produce list
    res.redirect('/producelist');
  } catch (error) {
    console.error('Error deleting produce:', error);
    res.status(500).send('Error deleting produce');
  }
});

module.exports = router;

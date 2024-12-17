const express = require('express');
const router = express.Router();
const Credit = require('../models/credit');

// Route to render the credit records form
router.get('/credit', (req, res) => {
  res.render('creditForm'); // Renders the form to add credit records
});

// Route to handle form submission and save to MongoDB
router.post('/submit-credit', async (req, res) => {
  const { 
    producename, 
    produceType, 
    producePrice, 
    produceTonnage, 
    customerName, 
    customerContact, 
    customerLocation, 
    branch, 
    produceDate, 
    dueDate,   // Ensure dueDate is included in the form
    produceTime 
  } = req.body;

  try {
    const newCredit = new Credit({
      producename,
      produceType,
      producePrice,
      produceTonnage,
      customerName,
      customerLocation,
      customerContact,
      branch,
      produceDate,
      dueDate,    // Added dueDate
      produceTime
    });

    await newCredit.save();
    res.redirect('/creditlist'); // Redirect to the credit list after saving
  } catch (error) {
    console.error('Error saving credit record to database:', error);
    res.status(500).send('Error saving credit record');
  }
});

// Route to display the credit records list
router.get('/creditlist', async (req, res) => {
  try {
    const creditRecords = await Credit.find();
    res.render('creditlist', { credits: creditRecords }); // Pass the credit records to the Pug template
  } catch (error) {
    console.error('Error fetching credit records from database:', error);
    res.status(500).send('Error fetching credit records');
  }
});

// Route to edit credit record (if needed)
router.get('/edit-credit/:id', async (req, res) => {
  const creditId = req.params.id;

  try {
    const creditRecord = await Credit.findById(creditId);
    if (creditRecord) {
      res.render('editCredit', { credit: creditRecord }); // Render edit form with current record data
    } else {
      res.status(404).send('Credit record not found');
    }
  } catch (error) {
    console.error('Error fetching credit record for editing:', error);
    res.status(500).send('Error fetching credit record for editing');
  }
});

// Route to update a credit record
router.post('/update-credit/:id', async (req, res) => {
  const creditId = req.params.id;
  const updatedData = req.body;

  try {
    await Credit.findByIdAndUpdate(creditId, updatedData, { new: true });
    res.redirect('/creditlist'); // Redirect to the credit list after updating
  } catch (error) {
    console.error('Error updating credit record:', error);
    res.status(500).send('Error updating credit record');
  }
});

// Route to delete a credit record
router.post('/delete-credit/:id', async (req, res) => {
  const creditId = req.params.id;

  try {
    await Credit.findByIdAndDelete(creditId);
    res.redirect('/creditlist'); // Redirect to the credit list after deletion
  } catch (error) {
    console.error('Error deleting credit record from database:', error);
    res.status(500).send('Error deleting credit record');
  }
});

module.exports = router;

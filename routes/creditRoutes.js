const express = require('express');
const router = express.Router();


// Import the User model
const Credit = require('../models/credit');

// Route to get all credit
router.get('/Credit', (req, res) => {
    res.render('credit');
    console.log('credit');
});

//Route for handling the form submission to add new page
router.post('/Credit', async (req, res) => {
    try {
        const newCredit = new Credit(req.body);
        await newCredit.save();
        res.redirect('/creditlist');
    } catch (err) {
        res.status(400).send('unable to save credit to database');
        console.log('Error saving credit:', err);
    }
});

// Route for handling the form submission to update a credit
router.post('/edit_credit/:id', async (req, res) => {
    try {
        await Credit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/creditList');
    } catch (err) {
        console.error('Error updating credit:', err);
        res.status(400).send('Unable to update item in the database');
    }
});

// Route to render the credit list page
router.get('/creditList', async (req, res) => {
    try {
        const credit = await Credit.find().sort({ $natural: -1 }); // Sorting the new produce
        res.render('creditList', {
            title: 'Credit List',
           credit
        });
    } catch (err) {
        res.status(400).send('Unable to find items in the database');
    }
});

// Route for handling credit deletion
router.post('/deleteCredit', async (req, res) => {
    try {
        await Credit.deleteOne({ _id: req.body.id });
        res.redirect('back');
    } catch (err) {
        res.status(404).send('Unable to delete item in the database');
    }
});

// Export the router
module.exports = router;

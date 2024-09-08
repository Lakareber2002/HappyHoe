const express = require('express');
const router = express.Router();

// Import the Sales model
const Sales = require('../models/sales');

// Route to render the sales page
router.get('/add_sales', (req, res) => {
    res.render('sales');
    console.log('Rendering sales page');
});

// Route for handling the form submission to add a new sale
router.post('/add_sales', async (req, res) => {
    try {
        const newSales = new Sales(req.body);
        await newSales.save();
        res.redirect('/saleslist');  // Redirects to the sales list page after saving
    } catch (err) {
        res.status(400).send('Unable to save sales to database');
        console.log('Error saving sales:', err);
    }
});

// Route to render the update sales page with data
router.get('/edit_sales/:id', async (req, res) => {
    try {
        const sales = await Sales.findById(req.params.id);
        if (!sales) {
            return res.status(404).send('Sales record not found');
        }
        res.render('update-sales', { sales });
        console.log('Rendering update-sales page');
    } catch (err) {
        console.error('Error fetching sales for edit:', err);
        res.status(500).send('Error fetching sales record');
    }
});

// Route for handling the form submission to update a sale
router.post('/edit_sales/:id', async (req, res) => {
    try {
        console.log(req.param.id)
        // await Sales.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // res.redirect('/salesList');
    } catch (err) {
        console.error('Error updating sales:', err);
        res.status(400).send('Unable to update item in the database');
    }
});

// Route to render the sales list page
router.get('/salesList', async (req, res) => {
    try {
        const sales = await Sales.find().sort({ $natural: -1 }); // Sorting the new produce
        res.render('salesList', {
            title: 'Sales List',
            sales
        });
    } catch (err) {
        res.status(400).send('Unable to find items in the database');
    }
});

// Route for handling sales deletion
router.post('/deleteSales', async (req, res) => {
    try {
        await Sales.deleteOne({ _id: req.body.id });
        res.redirect('back');
    } catch (err) {
        res.status(404).send('Unable to delete item in the database');
    }
});

// Export the router
module.exports = router;

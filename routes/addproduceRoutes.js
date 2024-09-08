const express = require('express');
const router = express.Router();

//import modules
const Produce = require('../models/produce');

//Route for rendering the add-produce page
router.get('/Produce', (req, res) => {
    res.render('addproduce');
    console.log('Produce')
});

//Route for handling the form submission to add new page
router.post('/Produce', async (req, res) => {
    try {
        const newProduce = new Produce(req.body);
        await newProduce.save();
        res.redirect('/producelist');
    } catch (err) {
        res.status(400).send('unable to save produce to database');
        console.log('Error saving produce:', err);
    }
});



module.exports=router;
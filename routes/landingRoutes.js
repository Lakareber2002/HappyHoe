const express = require('express');
const router = express.Router();

router.get('/landing', (req, res) => {
  res.render('landing'); 
});

//beans routes
router.get('/Beans', (req, res) => {
  res.render('beans'); 
});

// g-nuts route
router.get('/G-nuts', (req, res) => {
  res.render('g-nuts'); 
});

// maize route
router.get('/Maize', (req, res) => {
    res.render('maize'); 
  });

  // rice route
  router.get('/Rice', (req, res) => {
    res.render('rice'); 
  });

  // peas route
  router.get('/Peas', (req, res) => {
    res.render('peas'); 
  });

  // soya route
  router.get('/Soya', (req, res) => {
    res.render('soya'); 
  });

module.exports = router;
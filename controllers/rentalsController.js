const express = require('express');
const router = express.Router();
const models = require("../models/rentals-db.js");
const Rental = require("../models/rentalModel.js");

router.get('/',  (req, res) => res.render("rentals", { rentals: models.getRentalsByCityAndProvince() }));

router.get('/list', (req, res) => {
    Rental.find()
      .sort({ headline: 'asc' })
      .then(rentals => {
        if (!rentals) {
          return res.status(404).send('No rentals found.');
        }
        console.log(rentals);
        res.render('rentals/list', { rentals });
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      });
  });
  


module.exports = router
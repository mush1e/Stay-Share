const express = require('express');
const router = express.Router();
const models = require("../models/rentals-db.js");
const Rental = require("../models/rentalModel.js");

router.get('/',  (req, res) => res.render("rentals", { rentals: models.getRentalsByCityAndProvince() }));

router.get('/list', (req, res) => {
    if (req.session.user && req.session.user.role !== 'customer') {
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
        
    } else {
        res.status(401).send("You are not authorized to view this page.");
    }
});
    
  


module.exports = router
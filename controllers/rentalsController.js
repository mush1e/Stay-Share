const express = require('express');
const router = express.Router();
const models = require("../models/rentals-db.js");


router.get('/',  (req, res) => res.render("rentals", { rentals: models.getRentalsByCityAndProvince() }));

router.get('/list', (req, res) => {
    if (req.session.user && req.session.user.role === 'clerk') {
        res.render('rentals/list');
    } else {
        res.status(401).send("You are not authorized to view this page.");
    }
});


module.exports = router
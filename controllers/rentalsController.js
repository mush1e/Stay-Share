const express = require('express');
const router = express.Router();
const models = require("../models/rentals-db.js");


router.get('/', (req, res) => res.render("rentals", { rentals: models.getRentalsByCityAndProvince() }));
router.get('/list', (req, res) => res.render("list"));


module.exports = router
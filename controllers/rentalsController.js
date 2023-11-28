const express = require('express');
const router = express.Router();
const models = require("../models/rentals-db.js");

function isLoggedIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send("You are not authorized to view this page.");
    }
}

function isDataClerk(req, res, next) {
    if (req.session.user && req.session.user.role === 'clerk') {
        next();
    } else {
        res.status(401).send("You are not authorized to view this page.");
    }
}

router.get('/',  (req, res) => res.render("rentals", { rentals: models.getRentalsByCityAndProvince() }));
router.get('/list', isLoggedIn, isDataClerk, (req, res) => res.render("list"));


module.exports = router
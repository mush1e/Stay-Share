/*************************************************************************************
* WEB322 - 2237 Project
* I declare that this assignment is my own work in accordance with the Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Student Name  : Mustafa Siddiqui
* Student ID    : 117434225
* Course/Section: WEB322 NEE
*
**************************************************************************************/

const path = require("path");
const express = require("express");
const expressLayouts = require('express-ejs-layouts');

const app = express();
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(express.static('assets'));
app.use(expressLayouts);

const models = require(path.join(__dirname + "/models/rentalList.js"));


// Add your routes here
// e.g. app.get() { ... }

app.get('/', (req, res) => res.render("home", {rentals: models.getFeaturedRentals()}));
console.log(models.getFeaturedRentals());

app.get('/rentals', (req, res) => res.render("rentals", { rentals: models.getRentalsByCityAndProvince() }));

app.get('/sign-up', (req, res) => res.render("underConstruction"));

app.get('/log-in', (req, res) => res.render("log-in"));


// *** DO NOT MODIFY THE LINES BELOW ***

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send("Something broke!")
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);

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
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
sgMail.setApiKey(process.env.SENDGRID_API_KEY); 

const app = express();
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(express.static('assets'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

const models = require(path.join(__dirname + "/models/rentals-db.js"));



// Add your routes here
// e.g. app.get() { ... }

app.get('/', (req, res) => res.render("home", {rentals: models.getFeaturedRentals()}));

app.get('/rentals', (req, res) => res.render("rentals", { rentals: models.getRentalsByCityAndProvince() }));

app.get('/sign-up', (req, res) => res.render("sign-up"));

app.get('/log-in', (req, res) => res.render("log-in"));

app.get('/welcome', (req, res) => res.render("welcome"));

app.post('/sign-up', (req, res) => {

    const {firstname, lastname, email, password} = req.body;
    const signupError = {};
    signupError.err = false;

    const emailRegex    = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

    if(!firstname) { signupError.fnameError = "Please enter a valid first name";             signupError.err = true;}
    if(!lastname) { signupError.lnameError = "Please enter a valid last name";               signupError.err = true;}
    if(!email) { signupError.emailError = "Please enter a valid email address";              signupError.err = true;}
    else if(!emailRegex.test(email)) { signupError.emailError = "Invalid email address.";    signupError.err = true;}
    if(!password) { signupError.passwordError = "Please enter a valid password";             signupError.err = true;}
    else if(!passwordRegex.test(password)) { signupError.passwordError = "Invalid password"; signupError.err = true;}
    
    if (signupError.err)  res.render("sign-up", {firstname, lastname, email, password, signupError})
    else {
        const msg = {
            to: email, 
            from: 'mustafa.a.r.siddiqui@outlook.com',
            subject: 'Welcome to StayShare',
            text: `Dear ${firstname} ${lastname},\n\nWelcome to StayShare! We are thrilled to have you as a member of our community. Your journey with us has just begun, and we're excited to share it with you.\n\nThank you for registering with StayShare. Here's what you can expect as a member:\n- Access to exclusive content and features.\n- Stay updated with the latest news and updates.\n- Connect with like-minded individuals and share your experiences.\n\nIf you ever have any questions, feedback, or need assistance, feel free to reach out to our support team at msiddiqui48@myseneca.ca.\n\nOnce again, welcome to StayShare. We can't wait to see what you'll achieve with us!\n\nBest regards,\nMustafa Siddiqui\n[StayShare]\n`,
            html: `<p>Dear ${firstname} ${lastname},</p><p>Welcome to StayShare! We are thrilled to have you as a member of our community. Your journey with us has just begun, and we're excited to share it with you.</p><p>Thank you for registering with StayShare. Here's what you can expect as a member:</p><ul><li>Access to exclusive content and features.</li><li>Stay updated with the latest news and updates.</li><li>Connect with like-minded individuals and share your experiences.</li></ul><p>If you ever have any questions, feedback, or need assistance, feel free to reach out to our support team at <a href="mailto:msiddiqui48@myseneca.ca">msiddiqui48@myseneca.ca</a>.</p><p>Once again, welcome to StayShare. We can't wait to see what you'll achieve with us!</p><p>Best regards,<br>Mustafa Siddiqui<br>StayShare</p>`,
        };
          sgMail
            .send(msg)
            .then(() => {
              res.redirect("welcome")
            })
            .catch((error) => {
              console.error(error)
            })
    } 
});

app.post('/log-in', (req, res) => {

    const {email, password} = req.body;
    const loginError = {};

    if(!email) loginError.emailError = "Please enter a valid email address";
    if(!password) loginError.passwordError = "Please enter a valid password";
    (loginError.emailError|| loginError.passwordError) ? res.render("log-in", {email, password, loginError})
                                                       : res.render("log-in");
});



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

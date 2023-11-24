const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY); 

const models = require("../models/rentals-db.js");

router.get('/', (req, res) => res.render("home", {rentals: models.getFeaturedRentals()}));


router.get('/sign-up', (req, res) => res.render("sign-up"));

router.get('/log-in', (req, res) => res.render("log-in"));

router.get('/welcome', (req, res) => res.render("welcome"));

router.post('/sign-up', (req, res) => {

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

router.post('/log-in', (req, res) => {

    const {email, password} = req.body;
    const loginError = {};

    if(!email) loginError.emailError = "Please enter a valid email address";
    if(!password) loginError.passwordError = "Please enter a valid password";
    (loginError.emailError|| loginError.passwordError) ? res.render("log-in", {email, password, loginError})
                                                       : res.render("log-in");
});

module.exports = router;
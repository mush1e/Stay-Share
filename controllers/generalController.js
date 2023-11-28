const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const bcryptjs = require("bcryptjs");
const userModel = require("../models/userModel.js");
sgMail.setApiKey(process.env.SENDGRID_API_KEY); 

const models = require("../models/rentals-db.js");

router.get('/', (req, res) => res.render("home", {rentals: models.getFeaturedRentals()}));


router.get('/sign-up', (req, res) => res.render("sign-up"));

router.get('/log-in', (req, res) => res.render("log-in"));

router.get('/welcome', (req, res) => res.render("welcome"));

router.post('/sign-up', (req, res) => {

    const {firstname, lastname, email, password} = req.body;
    let signupError = {};
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

    const newUser = new userModel({
        firstname,
        lastname,
        email,
        password
    });

    newUser.save()
        .then(userSaved => {
            console.log(`User ${userSaved.firstname} has been added to the database.`);
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
        }).catch(err => {
            console.log(`Error adding user to the database ... ${err}`);
            signupError.emailError = "User already exists...try a different email";    
            signupError.err = true;
            res.render("sign-up", {firstname, lastname, email, password, signupError})
        });
});

router.post('/log-in', (req, res) => {

    const {email, password, clerk, customer} = req.body;
    const loginError = {};

    if(!email) loginError.emailError = "Please enter a valid email address";
    if(!password) loginError.passwordError = "Please enter a valid password";
    (loginError.emailError|| loginError.passwordError) ? res.render("log-in", {email, password, loginError}) : 0;
    userModel.findOne({email})
        .then(user => {
                if(user) {
                    bcryptjs.compare(password, user.password)
                        .then(isMatch => {
                            if(isMatch) {
                                req.session.user = user;
                                if(clerk)
                                    res.redirect("/");
                                else
                                    res.redirect("/");
                            }
                            else {
                                loginError.passwordError = "Invalid credentials";
                                res.render("log-in", {email, password, loginError})
                            }
                        }).catch(err => {
                            loginError.passwordError = "Password could not be validated";
                            console.log(err);
                            res.render("log-in", {email, password, loginError})
                        });
                } else {
                    loginError.emailError = "User not registered, recheck email";
                    res.render("log-in", {email, password, loginError})
                }
            })
            .catch(err => {
                loginError.emailError = "error finding user in database"
                console.log(err);
                res.render("log-in", {email, password, loginError})
            })
});

module.exports = router;
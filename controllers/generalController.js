const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const bcryptjs = require("bcryptjs");
const userModel = require("../models/userModel.js");
sgMail.setApiKey(process.env.SENDGRID_API_KEY); 
const Rental = require("../models/rentalModel.js")

const isCustomer = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'customer') {
      next();
    } else {
      res.status(401).send('Unauthorized: Only clerks can access this resource.');
    }
  };


router.get('/', async (req, res) => {
  try {
    const featuredRentals = await Rental.getFeaturedRentals();
    res.render("general/home", { rentals: featuredRentals });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/sign-up', (req, res) => res.render("general/sign-up"));

router.get('/log-in', (req, res) => res.render("general/log-in"));

router.get('/welcome', (req, res) => res.render("general/welcome"));

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
    if (signupError.err)  res.render("general/sign-up", {firstname, lastname, email, password, signupError})

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
                  res.redirect("/welcome")
                })
                .catch((error) => {
                  console.error(error)
                })
        }).catch(err => {
            console.log(`Error adding user to the database ... ${err}`);
            signupError.emailError = "User already exists...try a different email";    
            signupError.err = true;
            res.render("general/sign-up", {firstname, lastname, email, password, signupError})
        });
});

router.post('/log-in', (req, res) => {

    const {email, password, role} = req.body;
    res.locals.role = role;
    const loginError = {};

    if(!email) loginError.emailError = "Please enter a valid email address";
    if(!password) loginError.passwordError = "Please enter a valid password";
    (loginError.emailError|| loginError.passwordError) ? res.render("general/log-in", {email, password, loginError}) : 0;
    userModel.findOne({email})
        .then(user => {
                if(user) {
                    bcryptjs.compare(password, user.password)
                        .then(isMatch => {
                            if(isMatch) {
                                req.session.user = {
                                    _id: user._id,
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    email: user.email,
                                    role: role !== 'customer' ? 'clerk' : 'customer'
                                };
                                res.locals.user = req.session.user;

                                if (role !== 'customer') {
                                    // res.locals.user.role = 'clerk';
                                    // console.log(res.locals.user.role);
                                    res.redirect("/rentals/list");
                                } else {
                                    // req.session.user.role = 'customer';
                                    // console.log(res.locals.user.role);
                                    res.redirect("/cart");
                                }
                                
                            }
                            else {
                                loginError.passwordError = "Invalid credentials";
                                res.render("general/log-in", {email, password, loginError})
                            }
                        }).catch(err => {
                            loginError.passwordError = "Password could not be validated";
                            console.log(err);
                            res.render("general/log-in", {email, password, loginError})
                        });
                } else {
                    loginError.emailError = "User not registered, recheck email";
                    res.render("general/log-in", {email, password, loginError})
                }
            })
            .catch(err => {
                loginError.emailError = "error finding user in database"
                console.log(err);
                res.render("general/log-in", {email, password, loginError})
            })
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/log-in");
});

router.get('/add/:id', isCustomer ,async(req, res) => {
    let cart = req.session.cart = req.session.cart || [];
    const rental = await Rental.findById(req.params.id);
    let found = false;

    cart.forEach(cartRental => {
        if (cartRental.id == rental.id) {
            found = true;
            cartRental.days++;
        }
    });

    if(!found) {
        cart.push({
            id: rental.id,
            headline: rental.headline,
            numSleeps: rental.numSleeps,
            numBedrooms: rental.numBedrooms,
            numBathrooms: rental.numBathrooms,
            pricePerNight: rental.pricePerNight,
            city: rental.city,
            province: rental.province,
            imageUrl: rental.imageUrl,
            featuredRental: rental.featuredRental,
            days: 1, 
        });
    
    }
    res.render('general/cart', {rentals: cart});

})

router.post('/cart/update/:id', async (req, res) => {
    const numNights = req.body.numNights;
    const rentalId = req.params.id;

    const parsedNumNights = parseInt(numNights, 10);
    if (!Number.isNaN(parsedNumNights) && parsedNumNights > 0) {
        let cart = req.session.cart || [];

        const index = cart.findIndex(cartRental => cartRental.id === rentalId);

        if (index !== -1) {
            cart[index].days = parsedNumNights;
        }

        req.session.cart = cart;

        res.redirect('/cart');
    } else {
        res.status(400).send('Invalid number of nights.');
    }
});


router.post('/cart/remove/:id', async (req, res) => {
    const rentalId = req.params.id;
    let cart = req.session.cart || [];
    const index = cart.findIndex(cartRental => cartRental.id === rentalId);

    if (index !== -1) {
        cart.splice(index, 1);
        req.session.cart = cart;
    }

    res.redirect('/cart');
});


const sendOrderConfirmationEmail = async (customerEmail, cart) => {
    const orderDetails = generateOrderDetails(cart);
  
    const msg = {
      to: customerEmail,
      from: 'mustafa.a.r.siddiqui@outlook.com', 
      subject: 'StayShare Order Confirmation',
      html: orderDetails,
    };
  
    try {
      await sgMail.send(msg);
      console.log('Order confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending order confirmation email:', error.toString());
    }
  };

const generateOrderDetails = (cart) => {
    const subtotal = calculateSubtotal(cart);
    const vat = calculateVAT(subtotal);
    const grandTotal = subtotal + vat;
  
    return `
      <html>
        <body>
          <h2>Order Summary</h2>
          
          ${cart.map(renderCartItem).join('')}
          
          <hr>
          
          <p>Subtotal: $${subtotal.toFixed(2)}</p>
          <p>VAT (20%): $${vat.toFixed(2)}</p>
          <p>Grand Total: $${grandTotal.toFixed(2)}</p>
          
        </body>
      </html>
    `;
  };
  
  const renderCartItem = (cartRental) => {
    return `
      <div>
        <h3>${cartRental.headline}</h3>
        <p>City: ${cartRental.city}, Province: ${cartRental.province}</p>
        <p>Number of Nights: ${cartRental.days}</p>
        <p>Price Per Night: $${cartRental.pricePerNight.toFixed(2)}</p>
        <p>Total Price: $${(cartRental.pricePerNight * cartRental.days).toFixed(2)}</p>
        <!-- Add other rental details as needed -->
      </div>
      <hr>
    `;
  };
  
  const calculateSubtotal = (cart) => {
    return cart.reduce((total, cartRental) => {
      return total + cartRental.pricePerNight * cartRental.days;
    }, 0);
  };
  
  const calculateVAT = (subtotal) => {
    return 0.2 * subtotal;
  };
  


router.post('/cart/place-order',isCustomer ,async(req, res) => {
    const customerEmail = req.session.user.email; 
    const cart = req.session.cart || [];
    await sendOrderConfirmationEmail(customerEmail, cart);
    req.session.cart = [];
    res.redirect('/cart');
})

router.get('/cart', (req, res) => {
    if (req.session.user && req.session.user.role === 'customer') {
        let cart = req.session.cart = req.session.cart || [];
        res.render('general/cart', {rentals: cart} );
    } else {
        res.status(401).send("You are not authorized to view this page.");
    }
});

module.exports = router;
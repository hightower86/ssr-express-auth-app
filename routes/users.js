const express = require('express');
const router = express.Router();
const User = require('../models/User');
const flash = require('connect-flash');
const session = require('express-session');
const bcrypt = require('bcrypt');

// Login page
router.get('/login', (req, res) => res.render('login'));

// Register page
router.get('/register', (req, res) => res.render('register'));

// Register handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //Check required fieds
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // Check passwords match
  if (password != password2) {
    errors.push({ msg: 'password are not match' });
  }

  // Check passwords length
  if (password.length < 6) {
    errors.push({ msg: 'password should be at least 6 characters' });
  }

  //console.log(errors);
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // Validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        // User exists
        console.log('=============================================');
        console.log('user exists');
        console.log('=============================================');
        errors.push({ msg: 'this Email is already registered' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
        // Hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // Save user
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => {
                req.flash('error_msg', 'You are NOT registered');
                console.log(err);
              });
          })
        );
      }
    });
    // const newUser = new User({
    //   name,
    //   email,
    //   password
    // });
    //newUser.save();
    //res.render('index');
    //console.log(newUser);
  }
  //res.send('Hello');
});

module.exports = router;

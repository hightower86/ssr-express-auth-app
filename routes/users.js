const express = require('express');
const router = express.Router();

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
    res.send('pass');
  }
  console.log(req.body);
  res.send('Hello');
});

module.exports = router;

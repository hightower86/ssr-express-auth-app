const express = require('express');
const router = express.Router();

// Login page
router.get('/login', (req, res) => res.render('../views/login.pug'));
// Register page
router.get('/register', (req, res) => res.render('../views/register.pug'));

module.exports = router;

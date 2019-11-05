const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const app = express();

// Passport config
require('./config/passport')(passport);

// DB config
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected ...'))
  .catch(error => console.log(error));

// PUG
app.set('view engine', 'pug');

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: 'sectet',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Gloval vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Routes
app.use(indexRouter);
app.use('/users', require('./routes/users'));

const PORT = process.env.port || 5006;

app.listen(PORT, () => console.log(`server run on port ${PORT}`));

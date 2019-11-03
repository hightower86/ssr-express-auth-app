const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// DB config
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected ...'))
  .catch(error => console.log(error));

// PUG
app.set('view engine', 'pug');

// Routes
app.use(indexRouter);
app.use('/users', require('./routes/users'));

const PORT = process.env.port || 5006;

app.listen(PORT, () => console.log(`server run on port ${PORT}`));

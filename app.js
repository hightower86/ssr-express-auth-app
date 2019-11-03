const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// PUG
app.set('view engine', 'pug');

// Routes
app.use(indexRouter);
app.use('/users', require('./routes/users'));

const PORT = process.env.port || 5006;

app.listen(PORT, () => console.log(`server run on port ${PORT}`));

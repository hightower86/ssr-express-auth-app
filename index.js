const express = require('express');
const path = require('path');

const port = process.env.port || 5006;
const app = express();

app.get('/', (req, resp) =>
  resp.sendFile(path.join(__dirname, 'public', 'index.html'))
);

app.listen(port, () => console.log('server run on port 5005'));

const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const {ValidationError, NotFoundError} = require('./lib/errors');

// To connect mongoDB
mongoose.connect(`mongodb://localhost/test`, {useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 3000;

app.use(express.json({limit: '100kb'}));
app.use('/', routes, (err, req, res, next) => {
  // default to 500 internal server error unless we've defined a specific error
  let code = 500;
  if (err instanceof ValidationError) {
    code = 400;
  }
  if (err instanceof NotFoundError) {
    code = 404;
  }
  res.status(code).json({
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

process.on('uncaughtException', function (err) {
  console.log(err);
});

module.exports = app;
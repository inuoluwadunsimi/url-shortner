const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.post('/shortUrls', (req, res, next) => {});

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
      app.listen(process.env.PORT || 5000);

  })
  .catch((err) => {
    console.log(err);
  });


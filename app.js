const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', async (req, res, next) => {
  const shortUrls = await ShortUrl.find();
  res.render('index', {
    shortUrls: shortUrls,
  });
});

app.post('/shortUrls', async (req, res, next) => {
  //   shortUrl.findOne({ fullUrl: req.body.fullUrl }).then((url) => {
  //     if (url) {
  //       return res.sendStatus(404)
  //     }
  //   });
  await ShortUrl.create({ fullUrl: req.body.fullUrl });
  res.redirect('/');
});

app.get('/:shortUrl', async (req, res, next) => {
  const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl });
  if (shortUrl == null) {
    return res.sendStatus(404);
  }
  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.fullUrl);
});
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });

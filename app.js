const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', async (req, res, next) => {
  const shortUrls = await shortUrl.find();
  res.render('index', {
    shortUrls: shortUrls,
  });
});

app.post('/shortUrls', async (req, res, next) => {
    shortUrl.findOne({fullUrl:req.body.fullUrl}).then(url=>{
        if(url){
            return res.redirect('/')
        }

    })
  await shortUrl.create({ fullUrl: req.body.fullUrl });
  res.redirect('/');
});

app.get('/:shortUrl', (req, res, next) => {
  const short = req.params.shortUrl;

  shortUrl
    .findOne({ shortUrl: short })
    .then((url) => {
      const longUrl = url.fullUrl;
      res.redirect(longUrl);
    })
    .catch((err) => {
      console.log(err);
    });
});
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });

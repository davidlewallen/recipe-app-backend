const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const server = require('./db');

const app = express();

const PORT = process.env.PORT || 3001;

const routes = require('./routes');

app.use(logger('dev'));
app.use(
  cors({
    origin: 'https://flamboyant-mestorf-5bdbe1.netlify.com',
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('trust proxy', 1);
app.use(
  session({
    secret: 'secrets',
    resave: false,
    saveUninitialized: true,
    cookie: { domain: '.flamboyant-mestorf-5bdbe1.netlify.com' },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const Account = require('./models/account');

passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/api', routes);

app.listen(3000, async () => {
  await server.start();
  console.log('HTTP running on port 3000');
});

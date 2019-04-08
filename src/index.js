const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');

const server = require('./db');

const app = express();

const routes = require('./routes');

const {
  env: { NODE_ENV },
} = process;

let PORT = 3001;

if (NODE_ENV === 'beta') PORT = 3002;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'secrets',
    resave: true,
    saveUninitialized: false,
    ...(process.env.NODE_ENV !== 'dev'
      ? { cookie: { domain: '.mysavedrecipes.com' } }
      : {}),
  })
);

app.use((req, res, next) => {
  const acceptedOrigins = [
    'http://www.mysavedrecipes.com',
    'http://mysavedrecipes.com',
    'http://127.0.0.1:3000',
  ];

  let [origin] = acceptedOrigins;

  if (acceptedOrigins.includes(req.headers.origin)) origin = req.headers.origin;

  res.set({
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  next();
});

app.use(passport.initialize());
app.use(passport.session());

const Account = require('./models/account');

passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/api', routes);

app.listen(PORT, async () => {
  await server.start();
  console.log(`HTTP running on port ${PORT}`);
});

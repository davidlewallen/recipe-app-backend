require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const server = require('./db');
const routes = require('./routes');
const sessionsConfig = require('./config/sessionStore');

const PORT = process.env.PORT || 3001;

const app = express();
const store = new MongoDBStore(sessionsConfig);

store.on('error', error => console.log('MongoDBStore Error:', error));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  require('express-session')({
    secret: process.env.MONGO_SESSIONS_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      ...(process.env.NODE_ENV !== 'dev'
        ? { domain: 'lvh.me:3000' }
        : // ? { domain: '.mysavedrecipes.com' }
          {}),
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  const acceptedOrigins = [
    'http://mysavedrecipes.com',
    'http://beta.mysavedrecipes.com',
    'http://localhost:3000',
    'http://lvh.me:3000',
  ];

  let [origin] = acceptedOrigins;

  if (acceptedOrigins.includes(req.headers.origin)) origin = req.headers.origin;

  res.set({
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'DELETE',
  });

  if (process.env.NODE_ENV === 'dev' && req.method === 'OPTIONS') {
    return res.sendStatus(200);
  } else {
    next();
  }
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

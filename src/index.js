const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');

const server = require('./db');

// const scheduledTask = require('./utils/scheduledTask');

const app = express();

const PORT = process.env.PORT || 3001;

const assetFolder = path.join(__dirname, '..', 'build');

const routes = require('./routes');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(assetFolder));
app.use(session({
  secret: 'secrets',
  resave: true,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

const Account = require('./models/account');
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.get('/', (req, res) => {
  res.sendFile(assetFolder + '/index.html');
});

app.use('/api', routes);

app.get('/*', (req, res) => {
  res.sendFile(assetFolder + '/index.html');
});

app.listen(PORT, async () => {
  await server.start();
  // scheduledTask.runTasks();
  console.log(`API running on port ${PORT}`);
});

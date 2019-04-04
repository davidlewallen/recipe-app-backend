const express = require('express');
const router = express.Router();
const passport = require('passport');

const AccountModel = require('../models/account');

const Account = require('../controllers/account');

const { isAuthenticated } = require('./utils');

router.post('/login', (req, res, next) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    return res.status(400).json({
      message: 'Body should contain a "username" and "password" field',
    });
  } else if (!req.body.username) {
    return res.status(400).json({
      message: 'Enter a valid username',
    });
  } else if (!req.body.password) {
    return res.status(400).json({
      message: 'Enter a valid password',
    });
  }

  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      console.log('err', err);
      return next(err);
    }

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Incorrect username and/or password.' });
    }

    const { verification } = await Account.getUserByUsername(req.body.username);

    if (verification.status) {
      return req.login(user, loginErr => {
        if (loginErr) {
          console.log('loginErr', loginErr);
          return next(loginErr);
        }

        return res.send(true);
      });
    }

    return res.status(403).send({ verified: false });
  })(req, res, next);
});

router.post('/register', async (req, res) => {
  AccountModel.register(
    new AccountModel({
      username: req.body.username,
      email: req.body.email,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log('error', err);
        if (err.hasOwnProperty('_message')) {
          return res.status(400).json({ message: err.errors.email.message });
        }

        return res.status(409).send(err);
      }

      // This is so that we can test login flow without needing to verify email.
      // Email Verificiaton should be manually checked on third-party email
      if (process.env.NODE_ENV !== 'test') {
        Account.verification.sendVerificationEmail(user);
      }

      return res.status(201).send('Account created successfully');
    }
  );
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/auth', (req, res) => {
  console.log(req.url);
  console.log(req.originalUrl);
  console.log(req.ip);
  console.log(req.hostname);
  console.log(req.protocol);
  console.log(req.secure);
  const isAuth = req.isAuthenticated();
  const result = { isAuth };

  res.cookie('test', 'hi', {
    httpOnly: false,
    domain: 'flamboyant-mestorf-5bde1.netlify.com',
  });
  res.json(result);
});

router.get('/user', isAuthenticated, async (req, res) => {
  res.json(await Account.getUserById(req.user._id));
});

router.get('/verify', async (req, res) => {
  const user = await Account.getUserById(req.query.id);

  return Account.verification.verify(res, user, req.query.key);
});

router.get('/verify/resend', async (req, res) => {
  await Account.verification.resendVerificationEmail(req.query.id);

  return res.sendStatus(200);
});

router.get('/createtestaccount', async (req, res) => {
  await Account.createTestAccount('1');

  return res.sendStatus(200);
});

module.exports = router;

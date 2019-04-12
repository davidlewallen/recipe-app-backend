const express = require('express');
const router = express.Router();

const clearDB = require('../utils/clearDB');

const listOfApprovedWebsites = require('./utils/listOfApprovedWebsites.js');

router.use('/recipe', require('./recipe'));
router.use('/account', require('./account'));
router.use('/build', require('./build'));

router.get('/approved', (req, res) => {
  res.json(listOfApprovedWebsites());
});

router.get('/cleardb', async (req, res) => {
  await clearDB();
  res.sendStatus(200);
});

router.get('*', (req, res) => {
  res.status(404).send('Endpoint Not Found');
});

module.exports = router;

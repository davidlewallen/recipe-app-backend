const express = require('express');
const router = express.Router();

const buildContoller = require('../controllers/build');

router.post('/', (req, res) => {
  const { repository, ref } = req.body;

  if (repository.name === 'recipe-app' && ref === 'refs/heads/beta') {
    buildContoller.deployMSRFEBeta();
  }

  res.sendStatus(200);
});

module.exports = router;

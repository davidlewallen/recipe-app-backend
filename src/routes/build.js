const express = require('express');
const router = express.Router();

const { deployMSRBEBeta, deployMSRFEBeta } = require('../controllers/build');

router.post('/', (req, res) => {
  const { repository, ref } = req.body;

  if (repository.name === 'recipe-app' && ref === 'refs/heads/beta') {
    deployMSRFEBeta();
  }

  if (repository.name === 'recipe-app-backend' && ref === 'refs/heads/beta') {
    deployMSRBEBeta();
  }

  res.sendStatus(200);
});

module.exports = router;

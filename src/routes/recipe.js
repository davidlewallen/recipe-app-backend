const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('./utils');

const Recipe = require('../controllers/recipe');

router.use(isAuthenticated);

router.get('/', async (req, res) => {
  try {
    res.json(await Recipe.get(req.user._id));
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/submit/:recipeURL',  async (req, res) => {
  try {
    const result = await Recipe.submit(req.params.recipeURL, req.user._id);

    if (result.nonProcessableWebsite) {
      res.status(403).send({ result });
    } else {
      res.json(result);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/delete/:recipeId', async (req, res) => {
  try {
    res.json(await Recipe.remove(req.params.recipeId, req.user._id));
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

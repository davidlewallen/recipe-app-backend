// const fs = require('fs');
// const URLParse = require('url-parse');

// const server = require('../db');
// const RecipeModel = require('../models/recipe');
// const { stripWebsite } = require('../controllers/websiteRules');

// const updateRecipes = async () => {
//   const NODE_ENV = process.env.NODE_ENV;
//   if (NODE_ENV !== 'production' && NODE_ENV !== 'test') {
//     process.env.NODE_ENV = 'dev';
//     const envResults = fs.readFileSync('../../.env', 'utf8').split('\n');
//     envResults.forEach(env => {
//       const splitEnv = env.split('=');
//       process.env[splitEnv[0]] = splitEnv[1];
//     });
//   }

//   try {
//     await server.start();
//     const recipes = await RecipeModel.find({});

//     for (const recipe of recipes) {
//       const parsedURL = URLParse(recipe.url.href);
//       const strippedWebsite = await stripWebsite(parsedURL);
//       await RecipeModel.findByIdAndUpdate(recipe._id, strippedWebsite);
//     }
//     if (NODE_ENV !== 'production' && NODE_ENV !== 'test') {
//       process.exit(0);
//     }
//   } catch (err) {
//     console.log('err', err);
//   }
// };

// module.exports = updateRecipes;

// require('make-runnable');

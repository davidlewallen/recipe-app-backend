const axios = require('axios');
const URLParse = require('url-parse');

const Recipe = require('../models/recipe');
const Account = require('../models/account');

const { stripWebsite, isWebsiteProcessable } = require('./websiteRules');

const get = async userId => {
  try {
    return await getSavedRecipes(userId);
  } catch (err) {
    console.log('err', err);
  }
};

const getSavedRecipes = async userId => {
  try {
    const savedRecipeResult = await Account.findById(userId, 'savedRecipes');
    const recipeIds = savedRecipeResult.savedRecipes;

    return await Recipe.find({ _id: { $in: recipeIds } });
  } catch (err) {
    console.log('err', err);
  }
};
const submit = async (recipeURL, userId) => {
  const parsedURL = URLParse(recipeURL);

  try {
    // Check to see if recipe is already in recipe collection
    let result = await Recipe.findOne({ 'url.href': parsedURL.href });
    const recipeExists = Boolean(result);

    if (!recipeExists) {
      // Check to see if we can process the provide website
      if (isWebsiteProcessable(parsedURL)) {
        // If recipe doesnt already exist, strip website and save to recipe
        const recipe = new Recipe({ ...(await stripWebsite(parsedURL)) });
        result = await recipe.save();
      } else {
        const savedNPWebsite = await saveNonProcessableWebsite(
          result,
          parsedURL,
          userId
        );

        result = savedNPWebsite;
      }
    }

    // If result is an array target index 0 and grab _id
    // If result is an object target ._id
    const recipeId = Array.isArray(result) ? result[0]._id : result._id;
    const savedRecipe = await saveRecipeToUser(recipeId, userId);
    if (!savedRecipe) {
      return {
        alreadyAdded: true,
      };
    }

    return result;
  } catch (err) {
    console.log('err', err);
  }
};

const saveNonProcessableWebsite = async (result, parsedURL) => {
  const { data: html } = await axios.get(parsedURL.href);
  const title = html.split(/<title>|<\/title>/)[1] || 'n/a';
  const url = {
    hostname: parsedURL.hostname,
    href: parsedURL.href,
    link: parsedURL.hostname + parsedURL.pathname,
  };

  const recipe = new Recipe({ title, url, processable: false });
  result = await recipe.save();

  return result;
};

const saveRecipeToUser = async (recipeId, userId) => {
  const savedRecipeResult = await Account.find({
    $and: [{ _id: userId }, { savedRecipes: recipeId }],
  });
  const recipeIsAlreadySaved = !!savedRecipeResult.length;

  // If user hasnt saved the recipe, add it to account.savedRecipe
  // Returns true if saved to user and false if not;
  if (!recipeIsAlreadySaved) {
    /**
     * If recipe is not saved to 'savedRecipes' go ahead and save it
     */
    await Account.findByIdAndUpdate(
      userId,
      { $push: { savedRecipes: recipeId } },
      { new: true }
    );

    return true;
  } else {
    return false;
  }
};

async function manualSubmit(
  userId,
  { ingredients, instructions, totalTime, title }
) {
  const recipe = new Recipe({
    ingredients,
    instructions,
    totalTime,
    title,
    imageUrl: '',
    url: {
      hostname: '',
      href: '',
      link: '',
    },
  });

  const { _id } = await recipe.save();
  const savedRecipe = await saveRecipeToUser(_id, userId);

  return savedRecipe;
}

const remove = async (recipeId, userId) => {
  try {
    const savedRecipeResult = await Account.find({ savedRecipes: recipeId });
    const exists = Boolean(savedRecipeResult.length);

    if (exists) {
      await Account.findByIdAndUpdate(userId, {
        $pull: {
          savedRecipes: recipeId,
        },
      });
    }

    return await getSavedRecipes(userId);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  submit,
  get,
  remove,
  getSavedRecipes,
  saveRecipeToUser,
  manualSubmit,
};

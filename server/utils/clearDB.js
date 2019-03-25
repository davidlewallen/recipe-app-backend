const AccountModel = require('../models/account');
const NPWebsiteModel = require('../models/npwebsite');
const RecipeModel = require('../models/recipe');

module.exports = async () => {
  await AccountModel.remove({});
  await NPWebsiteModel.remove({});
  await RecipeModel.remove({});
}

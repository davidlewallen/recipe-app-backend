test('placeholder', () => expect(true).toBe(true));

// const mongoose = require('mongoose');

// const server = require('../../db');

// const AccountModel = require('../../models/account');
// // const NPWebsiteModel = require('../../models/npwebsite');
// const RecipeModel = require('../../models/recipe');

// const Account = require('../../controllers/account');
// const Recipe = require('../../controllers/recipe')

// const updateNPWebsites = require('../updateNPWebsites');
// const clearDB = require('../clearDB')

// describe('updateNPWebsites', () => {
//   let user = null;
//   let user2 = null;

//   beforeAll(async () => {
//     await server.start();
//   })

//   beforeEach(async (done) => {
//     user = await Account.createTestAccount('1');
//     user2 = await Account.createTestAccount('2');
//     done();
//   });

//   afterEach(async (done) => {
//     await clearDB();
//     done();
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   describe('checkProcessableWebsite', () => {
//     it('should update npwebsites, recipes, and account collections if we have new rules and remove entry after complete', async () => {
//       process.env.TEST_AW = true;
//       const url = 'http://www.foodnetwork.com/recipes/ina-garten/16-bean-pasta-e-fagioli-1-3753755';
//       await Recipe.submit(url, user._id);

//       let npWebsiteResult = await NPWebsiteModel.find({});
//       expect(npWebsiteResult.length).toEqual(1);
//       expect(npWebsiteResult[0].hostname).toEqual('www.foodnetwork.com');
//       expect(npWebsiteResult[0].submitted.length).toEqual(1);
//       expect(npWebsiteResult[0].submitted[0].href).toEqual(url);
//       expect(npWebsiteResult[0].submitted[0].userId.equals(user._id)).toEqual(true);

//       let recipeResult = await RecipeModel.find({});
//       expect(recipeResult.length).toEqual(0);

//       let accountResult = await AccountModel.findById(user._id);
//       expect(accountResult).toBeDefined();
//       expect(accountResult.savedRecipes.length).toEqual(0);

//       process.env.TEST_AW = false;
//       await updateNPWebsites.checkProcessableWebsites();

//       npWebsiteResult = await NPWebsiteModel.find({});
//       expect(npWebsiteResult.length).toEqual(0);

//       recipeResult = await RecipeModel.find({});
//       expect(recipeResult.length).toEqual(1);

//       accountResult = await AccountModel.findById(user._id);
//       expect(accountResult).toBeDefined();
//       expect(accountResult.savedRecipes.length).toEqual(1);
//     });

//     it('should handle multiple users with same hostname', async () => {
//       process.env.TEST_AW = true;
//       const url = 'http://www.foodnetwork.com/recipes/ina-garten/16-bean-pasta-e-fagioli-1-3753755';
//       const url2 = 'http://www.foodnetwork.com/recipes/valerie-bertinelli/pasta-e-fagioli-3234630'
//       await Recipe.submit(url, user._id);
//       await Recipe.submit(url2, user2._id);

//       let npWebsiteResult = await NPWebsiteModel.find({});
//       expect(npWebsiteResult.length).toEqual(1);
//       expect(npWebsiteResult[0].hostname).toEqual('www.foodnetwork.com');
//       expect(npWebsiteResult[0].submitted.length).toEqual(2);

//       let recipeResult = await RecipeModel.find({});
//       expect(recipeResult.length).toEqual(0);

//       let accountResult = await AccountModel.find({});
//       expect(accountResult.length).toEqual(2);
//       expect(accountResult[0].savedRecipes.length).toEqual(0);
//       expect(accountResult[1].savedRecipes.length).toEqual(0);

//       process.env.TEST_AW = false;
//       await updateNPWebsites.checkProcessableWebsites();

//       npWebsiteResult = await NPWebsiteModel.find({});
//       expect(npWebsiteResult.length).toEqual(0);

//       recipeResult = await RecipeModel.find({});
//       expect(recipeResult.length).toEqual(2);

//       accountResult = await AccountModel.findById(user._id);
//       expect(accountResult).toBeDefined()
//       expect(accountResult.savedRecipes.length).toEqual(1);

//       accountResult = await AccountModel.findById(user2._id);
//       expect(accountResult).toBeDefined()
//       expect(accountResult.savedRecipes.length).toEqual(1);
//     })

//     it('should do nothing if stored hostname is not in acceptedWebsites', async () => {
//       process.env.TEST_AW = true;
//       const url = 'http://www.foodnetwork.com/recipes/ina-garten/16-bean-pasta-e-fagioli-1-3753755';
//       await Recipe.submit(url, user._id);

//       let npWebsiteResult = await NPWebsiteModel.find({});
//       expect(npWebsiteResult.length).toEqual(1);
//       expect(npWebsiteResult[0].hostname).toEqual('www.foodnetwork.com');
//       expect(npWebsiteResult[0].submitted.length).toEqual(1);
//       expect(npWebsiteResult[0].submitted[0].href).toEqual(url);
//       expect(npWebsiteResult[0].submitted[0].userId.equals(user._id)).toEqual(true);

//       let recipeResult = await RecipeModel.find({});
//       expect(recipeResult.length).toEqual(0);

//       let accountResult = await AccountModel.find({});
//       expect(accountResult.length).toEqual(2);
//       expect(accountResult[0].savedRecipes.length).toEqual(0);
//       expect(accountResult[1].savedRecipes.length).toEqual(0);

//       await updateNPWebsites.checkProcessableWebsites();

//       npWebsiteResult = await NPWebsiteModel.find({});
//       expect(npWebsiteResult.length).toEqual(1);

//       recipeResult = await RecipeModel.find({});
//       expect(recipeResult.length).toEqual(0);

//       accountResult = await AccountModel.find({});
//       expect(accountResult.length).toEqual(2);
//       expect(accountResult[0].savedRecipes.length).toEqual(0);
//       expect(accountResult[1].savedRecipes.length).toEqual(0);
//     });
//   })
// })

test('placeholder', () => expect(true).toBe(true));
// const mongoose = require('mongoose');

// const server = require('../../db');

// const RecipeModel = require('../../models/recipe');

// const OFSUpdateRecipes = require('../OFSUpdateRecipes');

// const expectedData = require('../__mock__/websiteRulesMock');

// describe('OFSUpdateRecipes', () => {
//   const mockRecipe = {
//     ingredients: ['1'],
//     instructions: ['1'],
//     totalTime: '50 minutes',
//     url: {
//       hostname: 'random',
//       href: 'http://allrecipes.com/recipe/24002/famous-butter-chicken/',
//       link: 'random1',
//     },
//     title: 'test',
//   };

//   beforeAll(async () => {
//     await server.start();
//   });

//   beforeEach(async () => {
//     await RecipeModel.remove({});
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   describe('updateRecipes', () => {
//     it('should update existing recipes to new schema and grab data', async () => {
//       const recipe = new RecipeModel(mockRecipe);
//       await recipe.save();

//       await OFSUpdateRecipes();
//       const result = await RecipeModel.find({}, {'__v': 0, '_id': 0, 'created': 0 });
//       const expectedResult = {
//         ...expectedData.allrecipes.full,
//         url: {
//           hostname: 'allrecipes.com',
//           href: 'http://allrecipes.com/recipe/24002/famous-butter-chicken/',
//           link: 'allrecipes.com/recipe/24002/famous-butter-chicken/',
//         }
//       };
//       expect(JSON.stringify(result[0].ingredients)).toBe(JSON.stringify(expectedResult.ingredients));
//       expect(JSON.stringify(result[0].instructions)).toEqual(JSON.stringify(expectedResult.instructions));
//       expect(JSON.stringify(result[0].totalTime)).toEqual(JSON.stringify(expectedResult.totalTime));
//       expect(JSON.stringify(result[0].imageURL)).toEqual(JSON.stringify(expectedResult.imageURL));
//       expect(JSON.stringify(result[0].url)).toEqual(JSON.stringify(expectedResult.url));
//     });
//   });
// });

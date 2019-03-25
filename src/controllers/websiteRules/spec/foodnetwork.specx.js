// const axios = require('axios');
// const jsdom = require('jsdom');

// const { JSDOM } = jsdom;

// const {
//   strip,
//   stripIngredients,
//   stripInstructions,
//   stripTitle,
//   stripTime,
//   stripImageURL,
// } = require('../foodnetwork');

// const expectedData = require('../../../utils/__mock__/websiteRulesMock');

// describe('Foodnetwork Rules Test', () => {
//   let dom = null;

//   beforeAll(async () => {
//     const url = 'http://www.foodnetwork.com/recipes/melting-snowman-cake-4559612';
//     const res = await axios.get(url);
//     const html = res.data;
//     dom = new JSDOM(html);
//   });

//   describe('stripIngredients', () => {
//     it('should strip ingredients from website', () => {
//       const results = stripIngredients(dom);

//       expect(results).toEqual(expectedData.foodnetwork.ingredients);
//     });
//   });

//   describe('stripInstructions', () => {
//     it('should strip instructions from website', () => {
//       const results = stripInstructions(dom);

//       expect(results).toEqual(expectedData.foodnetwork.instructions);
//     });
//   });

//   describe('stripTitle', () => {
//     it('should strip title from website', () => {
//       const results = stripTitle(dom);

//       expect(results).toEqual(expectedData.foodnetwork.title);
//     });
//   });

//   describe('stripTime', () => {
//     it('should strip time from website', () => {
//       const results = stripTime(dom);

//       expect(results).toEqual(expectedData.foodnetwork.totalTime);
//     });
//   });

//   describe('stripImageURL', () => {
//     it('should strip image url from website', () => {
//       const results = stripImageURL(dom);

//       expect(results).toEqual(expectedData.foodnetwork.imageURL);
//     });
//   });

//   describe('strip', () => {
//     it('should strip ingredients, instructions, title, and build an object', () => {
//       const results = strip(dom);

//       expect(results).toEqual(expectedData.foodnetwork.full);
//     });
//   });
// });

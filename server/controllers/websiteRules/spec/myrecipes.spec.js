const axios = require('axios');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const {
  strip,
  stripIngredients,
  stripInstructions,
  stripTitle,
  stripTime,
  stripImageURL,
} = require('../myrecipes');

const expectedData = require('../../../utils/__mock__/websiteRulesMock');

describe('MyRecipes Rules Test', () => {
  let dom = null;

  beforeAll(async () => {
    const url = 'http://www.myrecipes.com/recipe/superfood-crunch-granola';
    const res = await axios.get(url);
    const html = res.data;
    dom = new JSDOM(html);
  });

  describe('stripIngredients', () => {
    it('should strip ingredients from website', () => {
      const results = stripIngredients(dom);

      expect(results).toEqual(expectedData.myrecipes.ingredients);
    });
  });

  describe('stripInstructions', () => {
    it('should strip instructions from website', () => {
      const results = stripInstructions(dom);

      expect(results).toEqual(expectedData.myrecipes.instructions);
    });
  });

  describe('stripTitle', () => {
    it('should strip title from website', () => {
      const results = stripTitle(dom);

      expect(results).toEqual(expectedData.myrecipes.title);
    });
  });

  describe('stripTime', () => {
    it('should strip time from website', () => {
      const results = stripTime(dom);

      expect(results).toEqual(expectedData.myrecipes.totalTime);
    });
  });

  describe('stripImageURL', () => {
    it('should strip image from website', () => {
      const results = stripImageURL(dom);

      expect(results).toEqual(expectedData.myrecipes.imageURL);
    });
  });

  describe('strip', () => {
    it('should strip ingredients, instructions, title, and build an object', () => {
      const results = strip(dom);

      expect(results).toEqual(expectedData.myrecipes.full);
    });
  });
});

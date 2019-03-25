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
} = require('../allrecipes');

const expectedData = require('../../../utils/__mock__/websiteRulesMock');

describe('Allrecipes Rules Test', () => {
  let dom = null;

  beforeAll(async () => {
    const url = 'http://allrecipes.com/recipe/24002/famous-butter-chicken/';
    const res = await axios.get(url);
    const html = res.data;
    dom = new JSDOM(html);
  });

  describe('stripIngredients', () => {
    it('should strip ingredients from website', () => {
      const results = stripIngredients(dom);

      expect(results).toEqual(expectedData.allrecipes.ingredients);
    });
  });

  describe('stripInstructions', () => {
    it('should strip instructions from website', () => {
      const results = stripInstructions(dom);

      expect(results).toEqual(expectedData.allrecipes.instructions);
    });
  });

  describe('stripTitle', () => {
    it('should strip title from website', () => {
      const results = stripTitle(dom);

      expect(results).toEqual(expectedData.allrecipes.title);
    });
  });

  describe('stripTime', () => {
    it('should strip time from website', () => {
      const results = stripTime(dom);

      expect(results).toEqual(expectedData.allrecipes.totalTime);
    });
  });

  describe('stripImageURL', () => {
    it('should strip image url from website', () => {
      const results = stripImageURL(dom);

      expect(results).toEqual(expectedData.allrecipes.imageURL);
    });
  });

  describe('strip', () => {
    it('should strip ingredients, instructions, title, and build an object', () => {
      const results = strip(dom);

      expect(results).toEqual(expectedData.allrecipes.full);
    });
  });
});

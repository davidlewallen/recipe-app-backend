const parseURL = require('url-parse');
const websiteRules = require('../');

const expectedData = require('../../../utils/__mock__/websiteRulesMock');

describe('Website Rules Test', () => {
  describe('isWebsiteProcessable', () => {
    it('should return true if website is proccessable', () => {
      const url = parseURL('http://www.health.com/recipes/cucumber-mint-tonic');

      expect(websiteRules.isWebsiteProcessable(url)).toEqual(true);
    })

    it('should return false if website is not proccessable', () => {
      const url = parseURL('https://www.nonhandledwebsite.com');

      expect(websiteRules.isWebsiteProcessable(url)).toEqual(false);
    })
  })

  describe('stripWebsite', () => {
    it('should strip wesbite of ingredients, instructions, title, and url data', async () => {
      const parsedURL = parseURL('http://www.health.com/recipes/cucumber-mint-tonic');

      const expected = {
        ...expectedData.health.full,
        url: {
          hostname: parsedURL.hostname,
          href: parsedURL.href,
          link: parsedURL.hostname + parsedURL.pathname,
        }
      }

      const results = await websiteRules.stripWebsite(parsedURL)

      expect(results).toEqual(expected);
    })
  })
})

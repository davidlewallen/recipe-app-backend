const acceptedWebsites = require('../acceptedWebsites');

describe('Accepted Websites Test', () => {
  it('should return a function', () => {
    expect(typeof acceptedWebsites).toEqual('function');
  });

  it('should return acceptedWebsites array if TEST_AW is falsy', () => {
    expect(acceptedWebsites().length).toEqual(5);
  });

  it('should return acceptedWebsitesTest array if TEST_AW is truthy', () => {
    process.env.TEST_AW = true;
    expect(acceptedWebsites().length).toEqual(5);
  });
})

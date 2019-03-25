const acceptedWebsites = require('../../controllers/websiteRules/resources/acceptedWebsites');

const listOfApprovedWebsites = () => {
  const acceptedList = acceptedWebsites().map(item => {
    const { hostname } = item;
    if (!hostname.startsWith('www.')) {
      return `www.${hostname}`;
    }

    return hostname;
  });

  return acceptedList;
};

module.exports = listOfApprovedWebsites;

const jsdom = require('jsdom');
const axios = require('axios');

const acceptedWebsites = require('./resources/acceptedWebsites');

const { JSDOM } = jsdom;


const stripWebsite = async (parsedURL) => {
  try {
    // Grab hostname from the parsedURL
    const hostname = parsedURL.hostname;

    // Grab html from website
    const res = await axios.get(parsedURL.href);
    const html = res.data;
    const dom = new JSDOM(html);

    // Get hostname's strip function by filtering by hostname
    // returning an array
    const hostnameFunction = acceptedWebsites().filter(
      website => website.hostname === hostname
    )[0].func;

    const results = hostnameFunction(dom);

    return {
      ...results,
      url: {
        hostname: parsedURL.hostname,
        href: parsedURL.href,
        link: parsedURL.hostname + parsedURL.pathname,
      }
    };
  } catch (err) {
    console.log(err);
  }
};

// Check if we have rules for passed in website, returning true or false
const isWebsiteProcessable = (parsedURL) => {
  const hostname = parsedURL.hostname;
  return !!acceptedWebsites().filter(website => website.hostname === hostname).length;
};

module.exports = {
  stripWebsite,
  isWebsiteProcessable,
};

// const Recipe = require('../controllers/recipe');

// const acceptedWebsites = require('../controllers/websiteRules/resources/acceptedWebsites');

// // This function will filter out hostnames in npwebsites that match acceptedWebsites
// // and automatically add them to the Recipes collection and save it to the account that submitted.
// const checkProcessableWebsites = async () => {
//   const hostnames = await NPWebsite.getHostnames();

//   for (const storedWebsite of hostnames) {
//     for (const acceptedWebsite of acceptedWebsites()) {

//       if (acceptedWebsite.hostname === storedWebsite.hostname) {
//         const storedWebsiteResult = await NPWebsite.getNPWebsite(storedWebsite._id);

//         for (const entry of storedWebsiteResult.submitted) {
//           await Recipe.submit(entry.href, entry.userId);
//         }

//         await NPWebsite.remove(storedWebsiteResult._id);
//       }
//     }
//   }
// }

// module.exports = { checkProcessableWebsites };

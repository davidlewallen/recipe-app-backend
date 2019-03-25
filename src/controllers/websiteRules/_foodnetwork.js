// const formatTime = require('../../utils/formatTime');

// const stripIngredients = (dom) => {
//   const listOfIngredientsLabel = (
//     dom
//     .window
//     .document
//     .getElementsByClassName('o-Ingredients__a-Ingredient')
//   );

//   const listOfIngredients = [];
//   for (const label of listOfIngredientsLabel) {
//     listOfIngredients.push(label.textContent);
//   }

//   return listOfIngredients;
// };

// const stripInstructions = (dom) => {
//   const containingDiv = (
//     dom
//     .window
//     .document
//     .getElementsByClassName('o-Method__m-Body')[0]
//   );

//   const listOfP = containingDiv.children[0].children;

//   const listOfInstructions = [];
//   let counter = 1;
//   for (const p of listOfP) {
//     if (!p.children.length > 0 && p.textContent) {
//       listOfInstructions.push(`${counter}) ${p.textContent.trim()}`);
//       counter += 1;
//     }
//   }

//   return listOfInstructions;
// };

// const stripTitle = (dom) => {
//   const title = (
//     dom
//     .window
//     .document
//     .getElementsByClassName('o-AssetTitle__a-HeadlineText')[0].textContent
//   );

//   return title;
// };

// const stripTime = (dom) => {
//   const totalTime = (
//     dom
//     .window
//     .document
//     .getElementsByClassName('o-RecipeInfo__a-Description m-RecipeInfo__a-Description--Total')[0].textContent
//   );

//   return formatTime(totalTime);
// };

// const stripImageURL = (dom) => {
//   const imageURL = (
//     dom
//     .window
//     .document
//     .getElementsByClassName('o-AssetMultiMedia__a-Image')[0]
//   );

//   return imageURL ? imageURL.src : null;
// };

// const foodnetwork = (dom) => {
//   const ingredients = stripIngredients(dom);
//   const instructions = stripInstructions(dom);
//   const title = stripTitle(dom);
//   const totalTime = stripTime(dom);
//   const imageURL = stripImageURL(dom);

//   return {
//     'ingredients': ingredients,
//     'instructions': instructions,
//     'title': title,
//     'totalTime': totalTime,
//     'imageURL': imageURL,
//   };
// };

// module.exports = {
//   strip: foodnetwork,
//   stripIngredients,
//   stripInstructions,
//   stripTitle,
//   stripTime,
//   stripImageURL,
// };

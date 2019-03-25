const listOfSelectors = [];

// /**
//  * getListOfElements returns an Array of elements from the DOM
//  *
//  * @param {function} dom DOM from JSDOM
//  * @param {string} selector The element/s we are searching for
//  */
// const getListOfElements = (dom, selector) =>
//   Array.from(dom.window.document.querySelectorAll(selector));

// /**
//  * getListOfTextContentFromElements will strip all textContent
//  * out of an array of elements returning an array of text
//  *
//  * @param {Array} listOfElements A list of elements from getListOfElements
//  */
// const getListOfTextContentFromElements = listOfElements =>
//   listOfElements.map(element => element.textContent);

// /**
//  * checkStrategy will return a Boolean depending on if the passed in
//  * strategy is viable or not
//  *
//  * @param {function} dom DOM from JSDOM
//  * @param {function} strategy Specific strategy we are trying to strip website with
//  */
// const checkStrategy = (dom, strategy) => Boolean(strategy(dom).length);

/**
 * This strategy is for DOMs that have the following markup
 *
 * <li class="ingredient">
 *
 * www.backtothecuttingboard.com
 * www.seriouseats.com
 * www.epicurious.com
 * www.simplyrecipes.com
 */

listOfSelectors.push('li.ingredient');

/**
 * This strategy is for DOMS that have the following markup
 *
 * <li class="wprm-recipe-ingredient">
 *
 * www.budgetbytes.com
 */

listOfSelectors.push('li.wprm-recipe-ingredient');

/**
 * This strategy is for DOMS that have the following markup
 *
 * <span class="recipe-ingred_txt">
 *
 * www.allrecipes.com
 */

listOfSelectors.push('span.recipe-ingred_txt');

/**
 * This strategy is for DOMS that have the following markup
 *
 * <p class="o-Ingredients__a-Ingredient" />
 *
 * www.foodnetwork.com
 */

listOfSelectors.push('.o-Ingredients__a-Ingredient');

/**
 * This strategy is for DOMS that have the following markup
 *
 * <li data-ingredient="...">
 *
 * www.geniuskitchen.com
 */

listOfSelectors.push('li[data-ingredient]');

/**
 * This strategy is for DOMS that have the following markup
 *
 * <li class="Recipe__ingredient">
 *
 * www.thekitchn.com
 */

listOfSelectors.push('li.Recipe__ingredient');

/**
 * This strategy is for DOMS that have the following markup
 *
 * <li class="IngredientLine">
 *
 * www.yummly.com
 */
listOfSelectors.push('li.IngredientLine');

/**
 * This strategy is for DOMS that have the following markup
 *
 * <div class="freyja_box81">
 *  <ul>
 *    <li />
 *  </ul>
 * </div>
 *
 * www.chowhound.com
 */

listOfSelectors.push('div.freyja_box81 ul > li');

/**
 * This strategy is for DOMS that have the following markup
 *
 * <div class="ingredients">
 *  <ul>
 *    <li>
 *  </ul>
 * </div>
 *
 * www.cookinglight.com
 * www.myrecipes.com
 */

listOfSelectors.push('div.ingredients ul > li');

/**
 * This strategy is for DOMS that have the following markup
 *
 * <span itemprop="ingredients">
 *
 * www.eatingwell.com
 */

listOfSelectors.push('span[itemprop="ingredients"]');

/**
 * This strategy is for DOMS that have the following markup
 *
 * <span class="ingredient">
 *
 * www.cooks.com
 */

listOfSelectors.push('span.ingredient');

/**
 * This strategy is for DOMS that have the following markup
 *
 * <div ingredientid="...">
 *  <span>
 * </div>
 *
 * www.kraftrecipes.com
 */

listOfSelectors.push('div[ingredientid]');

module.exports = {
  listOfIngredientSelectors: listOfSelectors,
};

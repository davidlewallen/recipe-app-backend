const mongoose = require('mongoose');

// Set up mongo connection
const server = require('../../db');

const Recipe = require('../recipe');

describe('Recipe Model Test', () => {
  beforeAll(async () => {
    await server.start();
  });

  beforeEach(async (done) => {
    await Recipe.remove({});
    done();
  });

  afterEach(async (done) => {
    await Recipe.remove({});
    done();
  })

  afterAll(async() => {
    await mongoose.connection.close();
  });

  const mockRecipe = {
    "title": "Famous Butter Chicken",
    "url": {
      "hostname": "allrecipes.com",
      "href": "http://allrecipes.com/recipe/24002/famous-butter-chicken/",
      "link": "allrecipes.com/recipe/24002/famous-butter-chicken/"
    },
    "instructions": [
      "1) Preheat oven to 375  degrees F (190 degrees C).",
      "2) Place eggs and cracker crumbs in two separate shallow bowls. Mix cracker crumbs with garlic salt and pepper. Dip chicken in the eggs, then dredge in the crumb mixture to coat.",
      "3) Arrange coated chicken in a 9x13 inch baking dish. Place pieces of butter around the chicken.",
      "4) Bake in the preheated oven for 40 minutes, or until chicken is no longer pink and juices run clear."
    ],
    "ingredients": [
      "2 eggs, beaten",
      "1 cup crushed buttery round cracker crumbs",
      "1/2 teaspoon garlic salt",
      "ground black pepper to taste",
      "4 skinless, boneless chicken breast halves",
      "1/2 cup butter, cut into pieces"
    ]
  }

  describe('save', () => {
    it('should save a recipe', async () => {
      let result = await Recipe.find({});
      expect(result.length).toEqual(0);

      const newRecipe = new Recipe(mockRecipe);
      await newRecipe.save();

      result = await Recipe.find({});
      expect(result.length).toEqual(1);
    });
  });

  describe('find', () => {
    it('should find a recipe by _id', async () => {
      let result = await Recipe.find({});
      expect(result.length).toEqual(0);

      const newRecipe = new Recipe(mockRecipe);
      const recipe = await newRecipe.save();
      const recipeId = recipe._id;

      result = await Recipe.findById(recipeId);
      expect(result._id).toEqual(recipeId);
    });
  });

  describe('update', () => {
    it('should update a recipe', async () => {
      let result = await Recipe.find({});
      expect(result.length).toEqual(0);

      const newRecipe = new Recipe(mockRecipe);
      const recipe = await newRecipe.save();
      const recipeId = recipe._id;

      await Recipe.findByIdAndUpdate(recipeId, { title: 'testTitle' });
      result = await Recipe.findById(recipeId);

      expect(result.title).toEqual('testTitle');
    });
  });

  describe('remove', () => {
    it('should remove a recipe by _id', async () => {
      let result = await Recipe.find({});
      expect(result.length).toEqual(0);

      const newRecipe = new Recipe(mockRecipe);
      const recipe = await newRecipe.save();
      const recipeId = recipe._id;

      result = await Recipe.findById(recipeId);
      expect(result).toBeTruthy();

      await Recipe.findByIdAndRemove(recipeId);
      result = await Recipe.findByIdAndRemove(recipeId);
      expect(result).toBeNull();
    });
  });
})

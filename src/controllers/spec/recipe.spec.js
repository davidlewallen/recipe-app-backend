const mongoose = require('mongoose');

// Set up mongo connection
const server = require('../../db');

const Recipe = require('../recipe');
const Account = require('../account');

const RecipeModel = require('../../models/recipe');
const AccountModel = require('../../models/account');

const clearDB = require('../../utils/clearDB');

describe('Recipe Controller Test', () => {
  let user = null;

  beforeAll(async () => {
    await server.start();
  })

  beforeEach(async (done) => {
    user = await Account.createTestAccount('1');
    done();
  });

  afterEach(async (done) => {
    await clearDB();
    done();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Recipe.submit', () => {
    it('should submit a recipe when recipe doesnt exist', async () => {
      const url = 'http://allrecipes.com/recipe/24002/famous-butter-chicken/';

      await Recipe.submit(url, user._id);

      const result = await RecipeModel.find({});

      expect(result.length).toEqual(1);
    });

    it('should return recipe in database when submitting a saved recipe', async () => {
      const url = 'http://allrecipes.com/recipe/24002/famous-butter-chicken/';

      await Recipe.submit(url, user._id);
      await Recipe.submit(url, user._id);

      const result = await RecipeModel.find({});

      expect(result.length).toEqual(1);
    });

    it('should add a recipe and give it "processable: false" if recipe can not be processed', async () => {
      const url = 'https://www.google.com';

      await Recipe.submit(url, user._id);

      const [recipe] = await RecipeModel.find({});

      expect(recipe.processable).toBe(false);
    })

    it('should add recipe id to account.savedRecipes array', async () => {
      const url = 'http://allrecipes.com/recipe/24002/famous-butter-chicken/';
      const recipe = await Recipe.submit(url, user._id);
      const recipeId = recipe._id;

      const result = await AccountModel.findById(user._id);
      
      expect(result.savedRecipes[0]).toEqual(recipeId);
    });

    it('should return alreadyAdded if a user has already submitted the recipe', async () => {
      const url = 'http://allrecipes.com/recipe/24002/famous-butter-chicken/';

      let recipe = await Recipe.submit(url, user._id);
      const recipeId = recipe._id;

      let result = await AccountModel.findById(user._id);
      expect(result.savedRecipes.length).toBe(1);
      expect(result.savedRecipes[0]).toEqual(recipeId);

      recipe = await Recipe.submit(url, user._id);
      expect(recipe.alreadyAdded).toBeDefined();
      expect(recipe.alreadyAdded).toBe(true);
      
      result = await AccountModel.findById(user._id);
      expect(result.savedRecipes.length).toBe(1);
      expect(result.savedRecipes[0]).toEqual(recipeId);
    });

    it('should add recipe to user even if another user has it added already', async () => {
      const url = 'http://allrecipes.com/recipe/24002/famous-butter-chicken/';

      const user2 = await Account.createTestAccount('2');

      let recipe = await Recipe.submit(url, user._id);
      let recipeId = recipe._id;

      let result = await AccountModel.findById(user._id);
      expect(result.savedRecipes.length).toBe(1);
      expect(result.savedRecipes[0]).toEqual(recipeId);


      recipe = await Recipe.submit(url, user2._id);
      recipeId = recipe._id;

      result = await AccountModel.findById(user2._id);
      expect(result.savedRecipes.length).toBe(1);
      expect(result.savedRecipes[0]).toEqual(recipeId);
    });
  });

  describe('Recipe.get', () => {
    it('should get recipes that a user has submitted', async () => {
      const url1 = 'http://allrecipes.com/recipe/24002/famous-butter-chicken/';
      const url2 = 'http://allrecipes.com/recipe/8652/garlic-chicken/';
      
      await Recipe.submit(url1, user._id)
      await Recipe.submit(url2, user._id);

      const result = await Recipe.get(user._id);
      expect(result.length).toEqual(2);
    })
  })

  describe('Recipe.remove', () => {
    it('should remove a recipe from user\'s savedRecipes and return a list of saved recipes', async () => {
      const url1 = 'http://allrecipes.com/recipe/8652/garlic-chicken/';
      const url2 = 'http://allrecipes.com/recipe/219164/the-best-parmesan-chicken-bake';

      const submitResult1 = await Recipe.submit(url1, user._id);
      const submitResult2 = await Recipe.submit(url2, user._id);
      const accountBeforeRemove = await AccountModel.findById(user._id);
      expect(accountBeforeRemove.savedRecipes.length).toBe(2);

      await Recipe.remove(submitResult1._id, user._id);
      const accountAfterRemove = await AccountModel.findById(user._id);
      expect(accountAfterRemove.savedRecipes.length).toBe(1);

      expect(accountAfterRemove.savedRecipes[0]).toEqual(submitResult2._id);
    });

    it('should return all savedRecipes when removing a recipe that doesnt exist', async () => {
      const url1 = 'http://allrecipes.com/recipe/8652/garlic-chicken/';
      const url2 = 'http://allrecipes.com/recipe/219164/the-best-parmesan-chicken-bake';

      const submitRecipe1 = await Recipe.submit(url1, user._id);
      const submitRecipe2 = await Recipe.submit(url2, user._id);

      const accountBeforeRemove = await AccountModel.findById(user._id);
      expect(accountBeforeRemove.savedRecipes.length).toEqual(2);

      await Recipe.remove(submitRecipe2._id, user._id);
      const accountAfterRemove = await AccountModel.findById(user._id);
      expect(accountAfterRemove.savedRecipes.length).toEqual(1);

      await Recipe.remove(submitRecipe2._id, user._id);
      const accountAfterRemove2 = await AccountModel.findById(user._id);
      expect(accountAfterRemove2.savedRecipes.length).toEqual(1);
      expect(accountAfterRemove2.savedRecipes[0]).toEqual(submitRecipe1._id);
    })
  });

  describe('Recipe.getSavedRecipes', () => {
    it('should get saved recipes for a user', async () => {
      const url = 'http://allrecipes.com/recipe/8652/garlic-chicken/';

      let savedRecipes = await Recipe.getSavedRecipes(user._id);
      expect(savedRecipes.length).toEqual(0);

      await Recipe.submit(url, user._id);

      savedRecipes = await Recipe.getSavedRecipes(user._id);
      expect(savedRecipes.length).toEqual(1);
    })
  })

  describe('Recipe.saveRecipeToUser', () => {
    it('should save a recipe id to a user', async () => {
      const recipeId = mongoose.Types.ObjectId('5a49114ce29c498c45d1773b');

      let result = await AccountModel.findById(user._id);
      expect(result.savedRecipes.length).toEqual(0);
      
      await Recipe.saveRecipeToUser(recipeId, user._id);
      result = await AccountModel.findById(user._id);
      expect(result.savedRecipes.length).toEqual(1);
      expect(result.savedRecipes[0]).toEqual(recipeId);
    })
  })
})

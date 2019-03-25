const mongoose = require('mongoose');

// Set up mongo connection
const server = require('../../db');

const Account = require('../account');

const AccountModel = require('../../models/account');

const clearDB = require('../../utils/clearDB');

describe('Account Controller Test', () => {
  beforeAll(async () => {
    await server.start();
  });

  beforeEach(async (done) => {
    await clearDB();
    done();
  });

  afterEach(async (done) => {
    await clearDB();
    done();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a test account', async () => {
    let result = await AccountModel.find({});
    expect(result.length).toEqual(0);

    await Account.createTestAccount('1');

    result = await AccountModel.find({});
    expect(result.length).toEqual(1);
  });

  describe('getUserById', () => {
    it('should return users info', async () => {
      const testAccount = await Account.createTestAccount('1');
      const result = await Account.getUserById(testAccount._id);

      expect(result._id).toEqual(testAccount._id);
      expect(result.username).toBe(testAccount.username);
      expect(result.email).toBe(testAccount.email);
    });
  });
  describe('getUserByUsername', () => {
    it('should return users info', async () => {
      const testAccount = await Account.createTestAccount('1');
      const result = await Account.getUserByUsername(testAccount.username);
      
      expect(result._id).toEqual(testAccount._id);
      expect(result.username).toBe(testAccount.username);
      expect(result.email).toBe(testAccount.email);
    });
  });
});

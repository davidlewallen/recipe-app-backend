const Account = require('../../models/account');

const verification = require('./verification');

const createTestAccount = async (append) => {
  const account = new Account({
    username: `testUsername${append}`,
    password: `testPassword${append}`,
    email: `testEmail${append}@test.com`,
  });

  return await account.save();
};

const getUserById = async userId => (
  await Account.findById(userId, '_id username email verification savedRecipes')
);

const getUserByUsername = async username => (
  await Account.findOne({
    'username': username
  })
);

module.exports = {
  createTestAccount,
  getUserById,
  getUserByUsername,
  verification,
};

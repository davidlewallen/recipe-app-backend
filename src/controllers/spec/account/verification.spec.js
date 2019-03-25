const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

//set up mono connection
const server = require('../../../db');

const Account = require('../../account');
const Verification = require('../../account/verification');

const clearDB = require('../../../utils/clearDB');

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: jest.fn().mockImplementation(() => 'test')
  }))
}));

describe('Account Verification Controller Test', () => {
  let testAccount = null;

  beforeAll(async () => {
    await server.start();
  });

  beforeEach(async (done) => {
    await clearDB();
    testAccount = await Account.createTestAccount('1');
    done();
  });

  afterAll(async () => {
    await mongoose.connections.close();
  });

  describe('setAccountToUnverified', () => {
    it('should set the accounts verification.status to false', async () => {
      await Verification.setAccountToUnverified(testAccount._id);

      const result = await Account.getUserById(testAccount._id);

      expect(result.verification.status).toEqual(false);
    });
  });

  describe('setAccountToVerified', () => {
    it('should set the accounts verification.status to true', async () => {
      await Verification.setAccountToVerified(testAccount._id);

      const result = await Account.getUserById(testAccount._id);

      expect(result.verification.status).toEqual(true);
    });
  });

  describe('sendVerificationEmail', () => {
    it('should call setAccountToUnverified passing user id', async () => {
      const spy = jest.spyOn(Verification, 'setAccountToUnverified');

      await Verification.sendVerificationEmail('1');

      expect(spy).toHaveBeenCalledWith('1');
    });

    it('should call transporter.sendMail with the correct data', async () => {
      const expectedResult = {
        from: process.env.EMAIL_USERNAME,
        to: testAccount.email,
        subject: 'My Saved Recipes - Email Verification',
        text: `
          Thank you for signing up with My Saved Recipes!

          Please follow the link below to verify your account.

          www.mysavedrecipes.com/account/verify?id=${testAccount._id}&key${testAccount.verification.key}
        `
      };

      expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith(expectedResult);
    });
  });
});

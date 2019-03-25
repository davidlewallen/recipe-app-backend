const mongoose = require('mongoose');

// Set up mongo connection
const server = require('../../db');

const Account = require('../account');

describe('Account Model Test', () => {
  beforeAll(async () => {
    await server.start();
  })

  beforeEach(async (done) => {
    await Account.remove({});
    done();
  });

  afterEach(async (done) => {
    await Account.remove({});
    done();
  })

  afterAll(async () => {
    await mongoose.connections.close();
  });

  describe('save', () => {
    it('should save an account to the account collection', async () => {
      let result = await Account.find({});
      expect(result.length).toEqual(0);

      const newAccount = new Account({
        username: 'testUsername',
        password: 'testPassword',
        email: 'test@email.com',
      });
      await newAccount.save();

      result = await Account.find({});
      expect(result.length).toEqual(1);
    });

    it('should return an error if correct fields arent passed when saving an account', async () => {
      const newAccount = new Account({
        password: 'testPassword',
        email: 'test@email.com',
      });

      try {
        await newAccount.save();
      } catch (err) {
        expect(err.name).toEqual('ValidationError')
        expect(err._message).toEqual('Account validation failed')
      }
    })
  });

  describe('find', () => {
    it('should find an account by _id', async () => {
      const newAccount = new Account({
        username: 'testUsername',
        password: 'testPassword',
        email: 'test@email.com',
      });
      let result = await newAccount.save();
      const userId = result._id;

      result = await Account.findById(userId);
      expect(result._id).toEqual(userId);
    })
  });

  // describe('update', () => {
  //   it('should update an account', async () => {
  //     const newAccount = new Account({
  //       username: 'testUsername',
  //       password: 'testPassword',
  //       email: 'test@email.com',
  //     });
  //     let result = await newAccount.save();
  //     const userId = result._id;

  //     await Account.findByIdAndUpdate(
  //       userId,
  //       {
  //         info: {
  //           firstName: 'testFirstNameUpdate'
  //         }
  //       }
  //     );

  //     result = await Account.findById(userId);
  //     expect(result.info.firstName).toEqual('testFirstNameUpdate');
  //   })
  // });

  describe('remove', () => {
    it('should remove an account', async () => {
      const newAccount = new Account({
        username: 'testUsername',
        password: 'testPassword',
        email: 'test@email.com',
      });
      let result = await newAccount.save();
      const userId = result._id;

      await Account.findByIdAndRemove(userId);

      result = await Account.findById(userId);
      expect(result).toBeNull();
    })
  })

  describe('email validator', () => {
    it('should return error if email fails validation', async () => {
      const newAccount = new Account({
        username: 'testUsername',
        password: 'testPassword',
        email: 'test@.com',
      });

      await expect(newAccount.validate()).rejects.toThrow();
    })
  })
})

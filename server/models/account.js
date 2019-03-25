const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const { isEmail } = require('validator');

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: { type: String },
  email: {
    type: String,
    required: [true, 'No email given.'],
    validate: {
      isAsync: true,
      validator: isEmail,
      message: 'Invalid email address.',
    },
  },
  savedRecipes: [Schema.Types.ObjectId],
  verification: {
    status: {
      type: Boolean,
      default: true,
    },
    key: { type: String },
    expires: { type: Date },
  },
});

AccountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', AccountSchema);

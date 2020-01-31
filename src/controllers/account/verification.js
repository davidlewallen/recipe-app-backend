const uuidv1 = require('uuid/v1');
const moment = require('moment');
const get = require('lodash').get;
const mailgun = require('mailgun-js');

const Account = require('../../models/account');

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: 'mail.mysavedrecipes.com',
});

const setAccountToUnverified = async id => {
  const verificationKey = uuidv1();

  await Account.findByIdAndUpdate(id, {
    verification: {
      status: false,
      key: verificationKey,
      expires: moment().add(7, 'days'),
    },
  });

  return verificationKey;
};

const setAccountToVerified = async id => {
  await Account.findByIdAndUpdate(id, {
    verification: {
      status: true,
    },
  });
};

const sendVerificationEmail = async user => {
  const verificationKey = await setAccountToUnverified(user._id);

  const verificationParams = `id=${user._id}&key=${verificationKey}`;

  let verificationLink = `http://127.0.0.1:3000/account/verify?${verificationParams}`;

  if (process.env.NODE_ENV === 'production')
    verificationLink = `https://mysavedrecipes.com/account/verify?${verificationParams}`;
  if (process.env.NODE_ENV === 'beta')
    verificationLink = `https://beta.mysavedrecipes.com/account/verify?${verificationParams}`;

  const data = {
    from: 'My Saved Recipes  <support@mail.mysavedrecipes.com>',
    to: user.email,
    subject: 'My Saved Recipes - Email Verification',
    text: `
      Thank you for signing up with My Saved Recipes!

      Please follow the link below to verify your account.

      ${verificationLink}
    `,
  };

  mg.messages().send(data, function(error, body) {
    console.log(body);
  });
};

const resendVerificationEmail = async id => {
  const user = await Account.findById(id);

  return sendVerificationEmail(user);
};

const verify = async (res, user, key) => {
  if (get(user, 'verification.status')) {
    return res.status(200).send({
      alreadyVerified: true,
    });
  }

  if (get(user, 'verification.key') !== key) {
    return res.status(400).send({
      nonMatchingKey: true,
    });
  }

  if (Date.now() < new Date(user.verification.expires)) {
    await setAccountToVerified(user._id);

    return res.sendStatus(200);
  }

  return res.status(400).send({
    verificationExpired: true,
  });
};

module.exports = {
  sendVerificationEmail,
  resendVerificationEmail,
  verify,
  setAccountToUnverified,
  setAccountToVerified,
};

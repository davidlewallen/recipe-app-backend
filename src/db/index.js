const mongoose = require('mongoose');
const configs = require('../../.config.js');

module.exports = {
  start: async () => {
    const USERNAME = encodeURIComponent(configs.mongo.username);
    const PASSWORD = encodeURIComponent(configs.mongo.password);

    let dbURL = `mongodb://${USERNAME}:${PASSWORD}@ds161446.mlab.com:61446/recipe`;

    if (process.env.NODE_ENV === 'beta')
      dbURL = `mongodb://${USERNAME}:${PASSWORD}@ds139956.mlab.com:39956/recipe-beta`;
    if (process.env.NODE_ENV === 'dev')
      dbURL = 'mongodb://127.0.0.1:27017/recipe-app';
    if (process.env.NODE_ENV === 'test')
      dbURL = 'mongodb://127.0.0.1:27017/recipe-app-test';

    mongoose.Promise = global.Promise;
    await mongoose.connect(dbURL, { useMongoClient: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    if (process.env.NODE_ENV !== 'test') {
      db.once('open', () => console.log('connected mongoose'));
    }
  },
};

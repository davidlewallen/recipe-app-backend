if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const mongoose = require('mongoose');

module.exports = {
  start: async () => {
    const USERNAME = encodeURIComponent(process.env.MONGO_USERNAME);
    const PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD);

    let uri;

    if (process.env.NODE_ENV === 'dev') {
      uri = 'mongodb://127.0.0.1:27017/recipe-app';
    } else if (process.env.NODE_ENV === 'test') {
      uri = 'mongodb://127.0.0.1:27017/recipe-app-test';
    } else {
      uri = `mongodb://${USERNAME}:${PASSWORD}@ds161446.mlab.com:61446/recipe`;
    }

    mongoose.Promise = global.Promise;
    await mongoose.connect(uri, { useMongoClient: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    if (process.env.NODE_ENV !== 'test') {
      db.once('open', () => console.log('connected mongoose'));
    }
  }
};

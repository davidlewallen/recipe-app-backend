const mongoose = require('mongoose');

module.exports = {
  start: async () => {
    const USERNAME = encodeURIComponent(process.env.MLAB_USERNAME);
    const PASSWORD = encodeURIComponent(process.env.MLAB_PASSWORD);

    let dbURL = `mongodb://${USERNAME}:${PASSWORD}@ds161446.mlab.com:61446/recipe`;

    if (process.env.NODE_ENV === 'beta')
      dbURL = `mongodb://${USERNAME}:${PASSWORD}@ds139956.mlab.com:39956/recipe-beta`;
    if (process.env.NODE_ENV === 'dev')
      dbURL = 'mongodb://127.0.0.1:27017/recipe-app';
    if (process.env.NODE_ENV === 'test')
      dbURL = 'mongodb://127.0.0.1:27017/recipe-app-test';

    console.log(dbURL);

    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    if (process.env.NODE_ENV !== 'test') {
      db.once('open', () => console.log('connected mongoose'));
    }
  },
};

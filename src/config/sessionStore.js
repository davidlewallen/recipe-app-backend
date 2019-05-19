const {
  env: { MONGO_SESSIONS_URI },
} = process;

module.exports = {
  uri: MONGO_SESSIONS_URI,
  collection: 'sessions',
};

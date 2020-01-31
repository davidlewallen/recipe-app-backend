const {
  env: { MLAB_SESSIONS_URI },
} = process;

module.exports = {
  uri: MLAB_SESSIONS_URI,
  collection: 'sessions',
};

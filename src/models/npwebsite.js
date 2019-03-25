const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NPWebsiteSchema = new Schema({
  hostname: { type: String, required: true },
  submitted: [
    {
      href: { type: String, required: true },
      userId: { type: Schema.Types.ObjectId, required: true },
      _id: false,
    },
  ],
});

module.exports = mongoose.model('NPWebsite', NPWebsiteSchema)

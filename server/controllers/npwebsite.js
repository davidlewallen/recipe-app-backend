const NPWebsite = require('../models/npwebsite');

const save = async (parsedURL, userId) => {
  const { hostname, href } = parsedURL;

  const result = await NPWebsite.findOne({ hostname });
  const exists = !!result;

  if (exists) {
    let alreadyAdded = result.submitted.filter(entry => entry.href === href && entry.userId.equals(userId))
    
    if (!alreadyAdded.length) {
      await NPWebsite.findOneAndUpdate(
        { hostname },
        { $push: { submitted: { href, userId } } }
      );
    }
  } else {
    const newNPWebsite = new NPWebsite({
      hostname,
      submitted: [{ href, userId }]
    });

    await newNPWebsite.save();
  }
}

const remove = async (id) => {
  await NPWebsite.findByIdAndRemove(id)
}

const getNPWebsite = async (npwebsiteId) => {
  return await NPWebsite.findById(npwebsiteId);
}

const getHostnames = async () => {
  return await NPWebsite.find({}).select('hostname');
}

module.exports = { save, remove, getNPWebsite, getHostnames };

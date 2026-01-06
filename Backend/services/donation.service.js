const Donation = require('../models/donorprofile.model');

module.exports.createDonation = async ({
  donorId,
  itemType,
  quantity,
  condition,
  deliveryOption
}) => {
  if (!donorId || !itemType || !quantity || !condition) {
    throw new Error('All fields are required');
  }

  const donation = await Donation.create({
    donorId,
    itemType,
    quantity,
    condition,
    deliveryOption
  });

  return donation;
};

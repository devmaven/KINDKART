// services/donation.service.js
const Donation = require('../models/donorprofile.model');

// Helper function to generate custom donation ID
const generateDonationId = async () => {
  // Find the last donation to get the highest ID number
  const lastDonation = await Donation.findOne()
    .sort({ createdAt: -1 })
    .select('donationId');

  let nextNumber = 1;

  if (lastDonation && lastDonation.donationId) {
    // Extract number from DN001 -> 001
    const lastNumber = parseInt(lastDonation.donationId.replace('DN', ''));
    nextNumber = lastNumber + 1;
  }

  // Format with leading zeros (DN001, DN002, etc.)
  const formattedNumber = String(nextNumber).padStart(3, '0');
  return `DN${formattedNumber}`;
};

module.exports.createDonation = async ({
  donorId,
  itemType,
  quantity,
  condition,
  deliveryOption
}) => {
  // Validate required fields
  if (!donorId || !itemType || !quantity || !condition) {
    throw new Error('All fields are required');
  }

  // Generate custom donation ID
  const donationId = await generateDonationId();

  // Create donation with custom ID
  const donation = await Donation.create({
    donationId,
    donorId,
    itemType,
    quantity,
    condition,
    deliveryOption
  });

  return donation;
};

// Optional: Add function to get donation by custom ID
module.exports.getDonationByDonationId = async (donationId) => {
  const donation = await Donation.findOne({ donationId })
    .populate('donorId', 'fullname email address');

  if (!donation) {
    throw new Error('Donation not found');
  }

  return donation;
};
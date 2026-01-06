const User = require('../models/user.model');
const NgoProfile = require('../models/ngoprofile.model');

module.exports.createUser = async ({
  name,
  phone,
  address,
  role
}) => {
  if (!name || !phone || !role) {
    throw new Error('All fields are required');
  }

  const user = await User.create({
    name,
    phone,
    address,
    role
  });

  // create role profile
  if (role === 'donor') {
    await DonorProfile.create({ userId: user._id });
  }

  if (role === 'ngo') {
    await NgoProfile.create({ userId: user._id });
  }

  if (role === 'volunteer') {
    await VolunteerProfile.create({ userId: user._id });
  }

  if (role === 'receiver') {
    await ReceiverProfile.create({ userId: user._id });
  }

  return user;
};

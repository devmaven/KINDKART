const User = require('../models/user.model');
const NgoProfile = require('../models/ngoprofile.model');
const DonorProfile = require('../models/donorprofile.model');
const VolunteerProfile = require('../models/volunteerprofile.model');
const ReceiverProfile = require('../models/receiverprofile.model');

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
  address,
  role
}) => {
  if (!firstname || !email || !password || !role) {
    throw new Error('All fields are required');
  }

  const user = await User.create({
    fullname: {
           firstname,
           lastname 
        },
    email,
    password,
    address,
    role
  });
console.log("User created in DB:", user);

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

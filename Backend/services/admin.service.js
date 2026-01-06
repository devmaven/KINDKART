const NgoProfile = require('../models/ngoprofile.model.js');
// const systemLogModel = require('../models/SystemLog');

module.exports.approveNGO = async ({ ngoId }) => {
  if (!ngoId) {
    throw new Error('NGO ID is required');
  }

  const ngo = await ngoModel.findById(ngoId);

  if (!ngo) {
    throw new Error('NGO not found');
  }

  ngo.isApproved = true;
  await ngo.save();

  // await systemLogModel.create({
  //   type: 'NGO_APPROVAL',
  //   message: `NGO ${ngoId} approved`,
  //   severity: 'medium'
  // });

  return ngo;
};

module.exports.rejectNGO = async ({ ngoId, reason }) => {
  if (!ngoId || !reason) {
    throw new Error('NGO ID and reason are required');
  }

  const ngo = await ngoModel.findByIdAndUpdate(
    ngoId,
    {
      isApproved: false,
      rejectionReason: reason
    },
    { new: true }
  );

  // await systemLogModel.create({
  //   type: 'NGO_REJECTION',
  //   message: `NGO ${ngoId} rejected: ${reason}`,
  //   severity: 'high'
  // });

  return ngo;
};

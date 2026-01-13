const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'First name must be at least 3 characters long'],
    },
    lastname: {
      type: String,
      minlength: [3, 'Last name must be at least 3 characters long'],
    }
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: [5, 'Email must be at least 5 characters long'],
    match: [/^\S+@\S+\.\S+$/, 'Invalid email address']
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  address: {
    type: String
  },

  role: {
    type: String,
    enum: ['donor', 'ngo', 'volunteer', 'receiver', 'admin'],
    required: true
  },

 });


//  Generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

//  Compare password (login)
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//  Hash password (register)
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;

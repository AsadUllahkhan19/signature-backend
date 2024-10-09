const mongoose = require('mongoose');
const moment = require('moment');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

// Define the schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'moderator'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    required: true
  },
  ipAddress: {
    type: String,
    trim: true
  },
  expirationDate: {
    type: String // Store formatted date as string
  },
  createdAt: {
    type: String // Store formatted date as string
  },
  updatedAt: {
    type: String // Store formatted date as string
  },
  avatar: {
    type: String // Store formatted date as string
  }
}, {
  timestamps: false // We will handle timestamps manually
});

// Middleware to format dates to yyyy-mm-dd before saving
userSchema.pre('save', async function(next) {
  if (this.expirationDate) {
    this.expirationDate = moment().format('YYYY-MM-DD');
  }
  if (this.createdAt) {
    this.createdAt = moment().format('YYYY-MM-DD');
  }
  if (this.updatedAt) {
    this.updatedAt = moment().format('YYYY-MM-DD');
  } else {
    // Set the current date if updatedAt is not defined
    this.updatedAt = moment().format('YYYY-MM-DD');
  }
  
  // Set createdAt if not defined
  if (!this.createdAt) {
    this.createdAt = moment().format('YYYY-MM-DD');
  }

  if (!this.isModified('password')) return next();

  // try {
  //   // Generate a salt
  //   const salt = await bcrypt.genSalt(10);
  //   // Hash the password using the salt
  //   this.password = await bcrypt.hash(this.password, salt);
  //   next();
  // } catch (err) {
  //   next(err);
  // } 
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
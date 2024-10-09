const bcrypt = require('bcrypt');

async function hashPassword(password) {
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      
      // Hash the password with the salt
      const hashedPassword = await bcrypt.hash(password, salt);
      
      return hashedPassword;
    } catch (err) {
      console.error('Error hashing password:', err);
    }
  }

  module.exports = {hashPassword};
const mongoose = require('mongoose');

// Define the schema
const plotSchema = new mongoose.Schema({
  blockName: {
    type: String,
    required: true,  // Field is required
    trim: true        // Trim whitespace from the input
  },
  plotNumber: {
    type: Number,
    required: true,  // Field is required
    unique: true     // Ensure plotNumber is unique
  },
  possessionCharges: {
    type: String,
    enum: ['Half paid', 'Non Paid', 'Full Paid', 'Transfer Free'], // Enum for specific values
    required: true   // Field is required
  },
  location: {
    type: String,
    enum: ['Corner', 'General plot', 'Park Facing'], // Enum for specific values
    required: true   // Field is required
  },
  size: {
    type: Number,
    required: true,  // Field is required
    min: 0           // Size must be a non-negative number
  },
  type: {
    type: String,
    enum: ['Residential', 'Commercial'], // Enum for specific values
    required: true   // Field is required
  }
});

// Create a model using the schema
const Plot = mongoose.model('Plot', plotSchema);

// Export the model
module.exports = Plot;

const mongoose = require('mongoose');

// Define the schema
const CoordinatesSchema = new mongoose.Schema({
  plotNumber: {
    type: Number,
    required: true,  // Field is required
    unique: true     // Ensure plotNumber is unique
  },
  latitude: {
    type: Number,
    required: true   // Field is required
  },
  longitude: {
    type: Number,
    required: true   // Field is required
  }
});

// Create a model using the schema
const Coordinate = mongoose.model('Coordinate', CoordinatesSchema);

// Export the model
module.exports = Coordinate;

const Joi = require('joi');

// Define the Joi schema
const EditUserValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .lowercase()
    .trim(),
  
  username: Joi.string()
    .min(3) // Example: Minimum length for username
    .max(30) // Example: Maximum length for username
    .required()
    .trim(),
  _id: Joi.string()
    // .min(3) // Example: Minimum length for username
    // .max(30) // Example: Maximum length for username
    .required()
    // .trim()
    ,
  
  password: Joi.string()
    .min(6) // Example: Minimum length for password
    .required(),
  
  role: Joi.string()
    .valid('admin', 'user', 'moderator') // Enum values from the Mongoose schema
    .required(),
  
  status: Joi.string()
    .valid('active', 'inactive', 'suspended') // Enum values from the Mongoose schema
    .required(),
  
  ipAddress: Joi.string()
    .ip({ version: ['ipv4', 'ipv6'] }) // Validate IP address format
    .optional()
    .allow('', null),
  
  expirationDate: Joi.date()
    .optional()
    .allow(null),
  
  createdAt: Joi.date()
    .optional()
    .allow(null),
  
  updatedAt: Joi.date()
    .optional()
    .allow(null)
});

// Example usage
const editUser = (user) => {
  const { error, value } = EditUserValidationSchema.validate(user);
  if (error) {
    throw error;
  }
  return value;
};

module.exports = {
  EditUserValidationSchema,
  editUser
};

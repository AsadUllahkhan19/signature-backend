const Joi = require('joi');

// Define the Joi schema
const userLoginSchema = Joi.object({
    email: Joi.string()
        .required(),
    password: Joi.string()
        .required(),
});

// Example usage
const validateLogin = (data) => {
    const { error, value } = userLoginSchema.validate(data);
    if (error) {
        throw error;
    }
    return value;
};

module.exports = {
    userLoginSchema,
    validateLogin
};

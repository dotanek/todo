const Joi = require('joi');

// Schemas

const registerSchema = Joi.object({
    username: Joi.string()
        .min(6)
        .max(20)
        .required(),
    password: Joi.string() // TODO repeat password.
        .min(8)
        .max(255)
        .required()
});

// Methods

const registerValidation = (data) => {
    return registerSchema.validate(data);
}

module.exports = {
    registerValidation
};
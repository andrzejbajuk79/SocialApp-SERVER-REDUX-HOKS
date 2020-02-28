//Validation
const Joi = require('@hapi/joi');

//Register validation

const userValidation = data => {
 const schema = Joi.object({
  name: Joi.string()
   .min(6)
   .required(),
  email: Joi.string()
   .min(6)
   .required()
   .email(),
  password: Joi.string()
   .min(6)
   .required(),
 });

 return schema.validate(data);
};

const profileValidation = data => {
 const schema = Joi.object({
  status: Joi.string().required(),
  skills: Joi.string().required(),
 });

 return schema.validate(data);
};

module.exports.userValidation = userValidation;
module.exports.profileValidation = profileValidation;

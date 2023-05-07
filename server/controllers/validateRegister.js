import Joi from "@hapi/joi"

const schemaRegister = Joi.object({
  username: Joi.string().min(4).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(4).max(1024).required(),
  password2: Joi.string().min(4).max(1024).required(),
  isAdmin: Joi.boolean().required(),
  supervisor: Joi.string().required()
})

export default schemaRegister
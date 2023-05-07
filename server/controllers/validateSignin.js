import Joi from "@hapi/joi"

const schemaSignin = Joi.object({
  email: Joi.string().min(6).max(250).required().email(),
  password: Joi.string().min(6).max(1024).required(),
})

export default schemaSignin
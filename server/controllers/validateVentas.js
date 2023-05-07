import Joi from "@hapi/joi";

const schemaVentas = Joi.object({
  estado: Joi.string().required(),
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  documentoTipo: Joi.string().required(),
  numeroDocumento: Joi.string().required(),
  telefonoContacto: Joi.string().required(),
  telefonoReferencia: Joi.string(),
  departamento: Joi.string().required(),
  provincia: Joi.string().required(),
  distrito: Joi.string().required(),
  vendedor: Joi.string().required(),
  supervisor: Joi.string().required(),
  casaTipo: Joi.string().required(),
  servicioTipo: Joi.string().required(),
  direccion: Joi.string().required(),
  observacion: Joi.string(),
  id: Joi.string().required()
})

export default schemaVentas
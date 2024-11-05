import { ZodError } from 'zod';

const validate = (schema) => async (req, res, next) => {
 try {
  await schema.parseAsync({
   body: req.body,
   query: req.query,
   params: req.params,
  });
  return next();
 } catch (error) {
  if (error instanceof ZodError) {
   return res.status(400).json({
    status: 'error',
    message: 'Validation failed',
    errors: error.errors.map((err) => ({
     field: err.path.join('.'),
     message: err.message,
    })),
   });
  }
  return next(error);
 }
};

export default validate;

import Joi from "joi";
import { messages } from "joi-translation-pt-br";

export default function formValidate(
  values: any,
  validationSchema: Joi.ObjectSchema
) {
  const { error } = validationSchema.validate(values, {
    abortEarly: false,
    messages,
  });
  if (!error) return {};
  return error.details.reduce((errors: string[], error) => {
    const i = error.path[0] as number;
    errors[i] = error.message;
    return errors;
  }, []);
}

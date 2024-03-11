import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const databaseConfig = registerAs('database', () => {
  const uri = process.env.DATABASE_URL;
  return {
    uri,
  };
});

export const databaseConfigValidation = Joi.object({
  DATABASE_URL: Joi.string()
    .uri({ scheme: ['mongodb'] })
    .default('mongodb://localhost:27017/dash_skins_api_db'),
});

export default databaseConfig;

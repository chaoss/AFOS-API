import { afterAll, beforeAll } from '@jest/globals';
import sequelize from '../src/configs/db.config.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

require('dotenv/config');

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  TYPEORM_ENTITIES,
  TYPEORM_MIGRATION,
} = process.env;

module.exports = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [TYPEORM_ENTITIES],
  migrations: [TYPEORM_MIGRATION],
  cli: {
    migrationsDir: 'src/infra/typeorm/migrations',
  },
};

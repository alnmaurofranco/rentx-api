module.exports = {
  type: 'postgres',
  url: 'postgresql://docker:docker@db:5432/rentxdb',
  synchronize: true,
  logging: false,
  entities: ['src/modules/**/**/*.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

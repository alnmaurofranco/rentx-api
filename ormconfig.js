module.exports = {
  type: 'postgres',
  url: 'postgresql://docker:docker@172.19.0.2:5432/rentxdb',
  synchronize: true,
  logging: false,
  entities: ['src/modules/**/**/domain/*.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

module.exports = {
  type: 'postgres',
  //url: 'postgresql://docker:docker@172.19.0.2:5432/rentxdb',
  port: 5432,
  username: 'docker',
  password: 'docker',
  database: 'rentxdb',
  entities: ['src/modules/**/**/domain/*.ts'],
  migrations: ['src/infra/typeorm/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/infra/typeorm/migrations',
  },
};

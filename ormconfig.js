module.exports = {
  type: 'postgres',
  url: 'postgresql://docker:docker@db:5432/rentxdb',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.js'],
  migrations: ['src/migration/**/*.js'],
  subscribers: ['src/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

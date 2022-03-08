import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = '172.29.0.1'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const connection = createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'development' ? host : 'localhost',
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentxdb_test'
          : defaultOptions.database,
    })
  );

  return connection;
};

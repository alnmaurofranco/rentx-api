import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// getConnectionOptions()
//   .then((options) => {
//     const newOptions = options as ITypeORMOptions;
//     newOptions.host = '172.19.0.2';
//     createConnection({
//       ...options,
//     });

//     console.log(`🔥 Database up`);
//   })
//   .catch((err) => console.log(`❌ Database ${err}`));

// createConnection()
//   .then(() => console.log(`🔥 Database up`))
//   .catch((err) => console.log(`❌ Database ${err}`));

export default async (host = '172.29.0.1'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const connection = createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentxdb_test'
          : defaultOptions.database,
    })
  );

  return connection;
};

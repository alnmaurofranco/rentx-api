import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log(`🔥 Database up`))
  .catch((err) => console.log(`❌ Database ${err}`));

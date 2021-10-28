import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import createConnectionTypeORM from '../index';

async function main() {
  const connection = await createConnectionTypeORM();

  const id = uuid();

  const passwordHashed = await hash('admin', 12);

  await connection.query(`
    INSERT INTO users (id, name, email, password, "isAdmin", driver_license, created_at)
    VALUES ('${id}', 'Administrador', 'admin@app.rentx.dev', '${passwordHashed}', true, 'AXDBC', 'now()')
  `);

  await connection.close();
}

main().then(() => console.log('🔏 User admin created! ✅'));

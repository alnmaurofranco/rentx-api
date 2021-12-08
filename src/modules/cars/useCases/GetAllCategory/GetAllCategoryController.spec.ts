import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import app from '@infra/http/app';
import createConnectionTypeORM from '@infra/typeorm';

let connection: Connection;
describe('Get All Categorys Controller', () => {
  beforeAll(async () => {
    connection = await createConnectionTypeORM();

    await connection.runMigrations();

    const id = uuid();

    const passwordHashed = await hash('admin', 12);

    await connection.query(`
     INSERT INTO users (id, name, email, password, "isAdmin", driver_license, created_at)
     VALUES ('${id}', 'Administrador', 'admin@app.rentx.dev', '${passwordHashed}', true, 'AXDBC', 'now()')
   `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to get all categories', async () => {
    const responseToken = await request(app).post('/api/sessions').send({
      email: 'admin@app.rentx.dev',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    await request(app)
      .post('/api/categories')
      .set({
        Authorization: `Bearer ${refresh_token}`,
      })
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest description',
      });

    const response = await request(app).get('/api/categories').send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body).toEqual([
      expect.objectContaining({
        id: expect.any(String),
      }),
    ]);
  });

  // it('Should not be able to get all categorys with empty array', async () => {
  //   await connection.query('DELETE FROM categories');

  //   const response = await request(app).get('/api/categories');

  //   expect(response.status).toBe(400);
  //   expect(response.body).toHaveProperty('error');
  // });
});

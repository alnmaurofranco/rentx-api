import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import app from '@infra/http/app';
import createConnectionTypeORM from '@infra/typeorm';

let connection: Connection;
describe('Create Category Controller', () => {
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

  it('Should be able to create a new category', async () => {
    const responseToken = await request(app).post('/api/sessions').send({
      email: 'admin@app.rentx.dev',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/api/categories')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest description',
      });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a new category with name existent', async () => {
    const responseToken = await request(app).post('/api/sessions').send({
      email: 'admin@app.rentx.dev',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/api/categories')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest description',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Category already exists!');
    expect(response.body).toMatchObject({ error: 'Category already exists!' });
  });
});

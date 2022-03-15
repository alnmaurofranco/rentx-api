import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import app from '@infra/http/app';
import createConnectionTypeORM from '@infra/typeorm';

let connection: Connection;
let headers: { Authorization: string };

describe('Get All Categorys Controller', () => {
  beforeAll(async () => {
    connection = await createConnectionTypeORM();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'DRIVER')
    `);

    const responseToken = await request(app)
      .post('/api/sessions')
      .send({ email: 'admin@rentx.com.br', password: 'admin' });

    const { token } = responseToken.body;

    headers = {
      Authorization: `Bearer ${token}`,
    };
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to get all categories', async () => {
    const category = {
      name: 'Category Supertest',
      description: 'Category Supertest description',
    };

    await request(app).post('/api/categories').set(headers).send(category);

    const response = await request(app).get('/api/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body).toEqual([
      expect.objectContaining({
        id: expect.any(String),
      }),
    ]);
  });

  it('Should not be able to get all categorys with empty array', async () => {
    await connection.query('DELETE FROM categories');

    const response = await request(app).get('/api/categories');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      'error',
      'There are currently no categories.'
    );
  });
});

import request from 'supertest';

import app from '@infra/http/app';

describe('Authenticate User Controller', () => {
  it('Should be able to authenticate a user', async () => {
    const response = await request(app).post('/api/v1/sessions').send({
      email: 'example@.com',
      password: '123213',
    });

    console.log(response.body);
  });
});

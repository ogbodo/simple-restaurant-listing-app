import request from 'supertest';

import app from '../src/app';

describe('Server', () => {
  test(' /api endpoint', async () => {
    const result = await request(app)
      .get('/api')
      .send({
        favorites: ['Tandoori Express', 'Aarti 2', 'Pizza Heart'],
        sortBy: 'bestMatch',
      })
      .expect('Content-Type', /json/);
    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });
});

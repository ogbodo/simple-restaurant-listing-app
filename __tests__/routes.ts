import request from 'supertest';

import app from '../src/app';

describe('Server', () => {
  test(' /api endpoint', async () => {
    const result = await request(app)
      .get('/api')
      .expect('Content-Type', /json/);
    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });

  test(' /api/sort-restaurants endpoint', async () => {
    const result = await request(app)
      .get('/api/sort-restaurants')
      .send({
        favorites: ['Tandoori Express', 'Aarti 2', 'Pizza Heart'],
        sortBy: 'bestMatch',
      })
      .expect('Content-Type', /json/);
    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });

  describe('Considering some edge cases on /api/sort-restaurants endpoint', () => {
    test(' for a case where favorite  is not supplied', async () => {
      const result = await request(app)
        .get('/api/sort-restaurants')
        .send({
          sortBy: 'bestMatch',
        })
        .expect('Content-Type', /json/);
      expect(result.status).toBe(200);
      expect(result.body.data).toBeDefined();
    });

    test(' for a case where sortingValue  is not supplied', async () => {
      const result = await request(app)
        .get('/api/sort-restaurants')
        .send({
          favorites: ['Tandoori Express', 'Aarti 2', 'Pizza Heart'],
        })
        .expect('Content-Type', /json/);
      expect(result.status).toBe(200);
      expect(result.body.data).toBeDefined();
    });

    test(' for a case where neither sortingValue nor favorite was supplied', async () => {
      const result = await request(app)
        .get('/api/sort-restaurants')
        .expect('Content-Type', /json/);
      expect(result.status).toBe(200);
      expect(result.body.data).toBeDefined();
    });
  });

  describe(' /api/restaurants/:name endpoint', () => {
    test(' should return 200 status code', async () => {
      const restaurantName = 'Daily Sushi';
      const result = await request(app)
        .get(`/api/restaurants/${restaurantName}`)
        .expect('Content-Type', /json/);
      expect(result.status).toBe(200);
      expect(result.body.data).toBeDefined();
      expect(result.body.data).toEqual({
        name: 'Daily Sushi',
        status: 'closed',
        sortingValues: {
          bestMatch: 9.0,
          newest: 221.0,
          ratingAverage: 4.0,
          distance: 1911,
          popularity: 6.0,
          averageProductPrice: 1327,
          deliveryCosts: 200,
          minCost: 1000,
        },
      });
    });

    test(' should return 404 status code', async () => {
      const restaurantName = 'Wrong Name';
      const result = await request(app)
        .get(`/api/restaurants/${restaurantName}`)
        .expect('Content-Type', /json/);
      expect(result.status).toBe(404);
      expect(result.body.message).toBeDefined();
      expect(result.body.message).toEqual('Not found!');
    });
  });
});

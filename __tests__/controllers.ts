import { getRestaurants } from '../src/controllers/index';

describe('Returns All Restaurants', () => {
  test('Should get all restaurants', () => {
    const restaurants = getRestaurants();
    expect(restaurants).toBeDefined();
  });
});

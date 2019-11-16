import {
  getRestaurants,
  sortRestaurantsByOpeningState,
} from '../src/controllers/index';

describe('Returns All Restaurants', () => {
  test('Should get all restaurants', () => {
    const restaurants = getRestaurants();
    expect(restaurants).toBeDefined();
  });
  test('Should return all restaurants sorted by opening state', () => {
    const restaurants = sortRestaurantsByOpeningState();
    expect(restaurants).toBeDefined();
  });
});

import {
  getRestaurants,
  sortRestaurantsByOpeningState,
  sortRestaurantsByValues,
  getRestaurantList,
  searchRestaurants,
} from '../src/controllers/index';

describe('Returns All Restaurants', () => {
  test('Should get all restaurants', () => {
    const restaurants = getRestaurants();
    expect(restaurants).toBeDefined();
  });
  describe('Search for Restaurant', () => {
    test('Should get a restaurant by name', () => {
      const restaurant = searchRestaurants('Lunchpakketdienst');
      expect(restaurant).toBeDefined();
      expect(restaurant).toEqual({
        name: 'Lunchpakketdienst',
        status: 'open',
        sortingValues: {
          bestMatch: 306.0,
          newest: 259.0,
          ratingAverage: 3.5,
          distance: 14201,
          popularity: 0.0,
          averageProductPrice: 4465,
          deliveryCosts: 500,
          minCost: 5000,
        },
      });
    });
  });
  test('Should return all restaurants sorted by opening state', () => {
    const restaurants = sortRestaurantsByOpeningState();
    expect(restaurants).toBeDefined();
  });

  describe('Returns all restaurants sorted by values', () => {
    test('Should return all restaurants sorted by best Match', () => {
      const restaurants = sortRestaurantsByValues('bestMatch');
      expect(restaurants).toBeDefined();
    });
    test('Should return all restaurants sorted by newest', () => {
      const restaurants = sortRestaurantsByValues('newest');
      expect(restaurants).toBeDefined();
    });
    test('Should return all restaurants sorted by ratingAverage', () => {
      const restaurants = sortRestaurantsByValues('ratingAverage');
      expect(restaurants).toBeDefined();
    });
    test('Should return all restaurants sorted by distance', () => {
      const restaurants = sortRestaurantsByValues('distance');
      expect(restaurants).toBeDefined();
    });
    test('Should return all restaurants sorted by popularity', () => {
      const restaurants = sortRestaurantsByValues('popularity');
      expect(restaurants).toBeDefined();
    });
    test('Should return all restaurants sorted by averageProductPrice', () => {
      const restaurants = sortRestaurantsByValues('averageProductPrice');
      expect(restaurants).toBeDefined();
    });
    test('Should return all restaurants sorted by deliveryCosts', () => {
      const restaurants = sortRestaurantsByValues('deliveryCosts');
      expect(restaurants).toBeDefined();
    });
    test('Should return all restaurants sorted by minCost', () => {
      const restaurants = sortRestaurantsByValues('minCost');
      expect(restaurants).toBeDefined();
    });
    test('Should return all restaurants sorted by topRestaurants', () => {
      const restaurants = sortRestaurantsByValues('topRestaurants');
      expect(restaurants).toBeDefined();
    });
  });
  describe('Returns all restaurants sorted by favorites', () => {
    test('Should return all restaurants but favorites stays at the top', () => {
      const favorites = ['Tandoori Express', 'Aarti 2', 'Pizza Heart'];
      const restaurants = getRestaurantList(favorites, 'none');
      expect(restaurants).toBeDefined();
    });
    test('Should return all restaurants sorted by any sort value, but favorites stays at the top', () => {
      const favorites = ['Tandoori Express', 'Aarti 2', 'Pizza Heart'];
      const restaurants = getRestaurantList(favorites, 'topRestaurants');
      expect(restaurants).toBeDefined();
    });
  });
});

const restaurants = require('../../data/sample.json');

interface IRestaurant {
  name: String;
  status: String;
  sortingValues: {
    bestMatch: Number;
    newest: Number;
    ratingAverage: Number;
    distance: Number;
    popularity: Number;
    averageProductPrice: Number;
    deliveryCosts: Number;
    minCost: Number;
  };
}
export function getRestaurants(): IRestaurant[] {
  return restaurants['restaurants'];
}

export function sortRestaurantsByOpeningState() {
  const restaurantsList: IRestaurant[] = getRestaurants();

  const open: IRestaurant[] = [];
  const orderAhead: IRestaurant[] = [];
  const closed: IRestaurant[] = [];

  restaurantsList.forEach(restaurant => {
    const status = restaurant['status'];

    if (status === 'open') {
      open.push(restaurant);
    } else if (status === 'order ahead') {
      open.push(restaurant);
    } else if (status === 'closed') {
      open.push(restaurant);
    }
  });
  return [...open, ...orderAhead, ...closed];
}

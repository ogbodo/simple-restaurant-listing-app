const restaurants = require('../../data/sample.json');
import { keys } from './helper';

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

//The parameter restaurantsList will get initialized by default if it's not supplied
export function sortRestaurantsByOpeningState(
  restaurantsList: IRestaurant[] = getRestaurants(),
) {
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

export function searchRestaurants(name: string) {
  const restaurantsList: IRestaurant[] = getRestaurants();

  return restaurantsList.find(restaurant => restaurant.name === name);
}

function isRestaurantNeeded(restaurant: IRestaurant, sortValue: number) {
  const sortingValues = restaurant['sortingValues'];
  const sortingValueKeys = keys(sortingValues);

  for (const sortingValueKey of sortingValueKeys) {
    if (sortingValues[sortingValueKey] === sortValue) {
      return true;
    }
  }

  return false;
}

export function sortRestaurantsByValues(sortValue: number) {
  const restaurantsList: IRestaurant[] = getRestaurants();

  return restaurantsList.filter(restaurant =>
    isRestaurantNeeded(restaurant, sortValue),
  );
}

export function getRestaurantList(favorites: string[], sortValue: number) {
  const sortedRestaurantsByValues: IRestaurant[] = sortRestaurantsByValues(
    sortValue,
  );

  const sortedRestaurantsByOpeningState: IRestaurant[] = sortRestaurantsByOpeningState(
    sortedRestaurantsByValues,
  );

  //Now make all favorite restaurants come at the top
  const favoriteRestaurants: IRestaurant[] = [];
  const otherRestaurants: IRestaurant[] = [];

  sortedRestaurantsByOpeningState.forEach(restaurant => {
    const found: string = favorites.find(
      favorite => restaurant.name === favorite,
    )!; //The exclamation mark (!) tells typescript that we are not expecting undefined value

    if (found) {
      favoriteRestaurants.push(restaurant);

      //Remove found favorite from favorites
      favorites.filter(favorite => favorite !== found);
    } else {
      otherRestaurants.push(restaurant);
    }
  });

  return [...favoriteRestaurants, ...otherRestaurants];
}

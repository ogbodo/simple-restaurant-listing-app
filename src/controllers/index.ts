const restaurants = require('../../data/sample.json');
import { keys } from './helper';

interface ISortValue {
  bestMatch: number;
  newest: number;
  ratingAverage: number;
  distance: number;
  popularity: number;
  averageProductPrice: number;
  deliveryCosts: number;
  minCost: number;
  topRestaurants?: number;
}
interface IRestaurant {
  name: String;
  status: String;
  sortingValues: ISortValue;
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

export function sortRestaurantsByValues(sortObject: ISortValue) {
  let restaurantsList: IRestaurant[] = getRestaurants();
  const sortingObjectKey = keys(sortObject)[0];

  /**
   * If this sorting criteria is for top restaurants, extend the object  key to include
   * topRestaurants which should be a child of sortingValues
   */
  if (sortingObjectKey === 'topRestaurants') {
    restaurantsList = restaurantsList.map(restaurant => {
      const { distance, popularity, ratingAverage } = restaurant.sortingValues;
      const topRestaurant = distance * popularity + ratingAverage;

      restaurant['sortingValues'].topRestaurants = topRestaurant;

      return restaurant;
    });
  }

  return restaurantsList.sort((restaurant1, restaurant2) => {
    const a = restaurant1['sortingValues'][sortingObjectKey]!;
    const b = restaurant2['sortingValues'][sortingObjectKey]!;

    return a - b;
  });
}

export function getRestaurantList(favorites: string[], sortObject: ISortValue) {
  //   const updateObjects = addTopRestaurantKey(sortedRestaurantsByValues)
  const sortedRestaurantsByValues = sortRestaurantsByValues(sortObject);

  const sortedRestaurantsByOpeningState = sortRestaurantsByOpeningState(
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

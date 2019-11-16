const restaurants = require('../../data/sample.json');
import { IRestaurant, isAsc, isDesc } from './helper';

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
      orderAhead.push(restaurant);
    } else if (status === 'closed') {
      closed.push(restaurant);
    }
  });

  return [...open, ...orderAhead, ...closed];
}

export function searchRestaurants(name: string) {
  const restaurantsList: IRestaurant[] = getRestaurants();

  return restaurantsList.find(restaurant => restaurant.name === name);
}

export function sortRestaurantsByValues(sortBy: string) {
  let restaurantsList: IRestaurant[] = getRestaurants();

  if (sortBy === 'topRestaurants') {
    /**
     * If this sorting criteria is for top restaurants, extend the object  key to include
     * topRestaurants which should be a child of sortingValues
     */
    restaurantsList = restaurantsList.map(restaurant => {
      let topRestaurant = 0;
      const { distance, popularity, ratingAverage } = restaurant.sortingValues;
      if (distance && popularity && ratingAverage) {
        topRestaurant = distance * popularity + ratingAverage;
      }

      restaurant['sortingValues'].topRestaurants = topRestaurant;

      return restaurant;
    });
  }
  //Determine whether to sort in ascending or descending order based on the sort value
  let sortDirection = 0;
  if (isAsc(sortBy)) {
    sortDirection = 1;
  } else if (isDesc(sortBy)) {
    sortDirection = 0;
  } else {
    return [];
  }

  return restaurantsList.sort((restaurant1: any, restaurant2: any) => {
    const a = restaurant1['sortingValues'][sortBy]!;
    const b = restaurant2['sortingValues'][sortBy]!;
    return sortDirection > 0 ? a - b : b - a;
  });
}

export function getRestaurantList(favorites: string[], sortBy: string) {
  //   const updateObjects = addTopRestaurantKey(sortedRestaurantsByValues)
  const sortedRestaurantsByValues = sortRestaurantsByValues(sortBy);

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

import React, { useState, useEffect } from 'react';
import { Grid, Dropdown } from 'semantic-ui-react';
import { toast } from 'react-toastify';

//helpers
import { sortValues } from '../helpers.js/constants';
import {
  sortRestaurants,
  getRestaurants,
  searchRestaurants,
} from '../helpers.js/http';

//Components
import RestaurantDescriptionCard from './RestaurantDescriptionCard';

function RestaurantList() {
  const [sortingValue, setSortingValue] = useState(sortValues[0]);
  const [favorites, setFavorites] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [searchState, setSearchState] = useState({
    searchValue: '',
    isLoading: false,
  });

  function onSortItemClicked(_e, selectedSort) {
    setSortingValue(selectedSort);
  }

  function onChangeFavorite(restaurantName) {
    setFavorites(restaurantName);
  }

  function onChange(_e, { value }) {
    setSearchState({ isLoading: true, searchValue: value });
  }

  useEffect(() => {
    const restaurants = getRestaurants();
    setRestaurants(restaurants);
  }, []);

  useEffect(() => {
    const sortedRestaurants = sortRestaurants(favorites, sortingValue.value);
    setRestaurants(sortedRestaurants);
  }, [sortingValue, favorites]);

  useEffect(() => {
    const restaurant = searchRestaurants(searchValue);
    setRestaurants([restaurant]);

    setSearchState(oldState => {
      return { ...oldState, isLoading: false };
    });
  }, [searchValue]);

  return (
    <>
      <div style={{ color: '#e94d1c', float: 'left', paddingBottom: 10 }}>
        <Dropdown
          placeholder="Sort Restaurant"
          fluid
          selection
          options={sortValues}
          onChange={onSortItemClicked}
          name="sortRestaurants"
        />
      </div>
      <div style={{ color: '#e94d1c', float: 'right', paddingBottom: 10 }}>
        <Input
          loading={searchState.isLoading}
          icon="search"
          placeholder={'Search...'}
          style={{ color: '#e94d1c' }}
          onChange={onChange}
          value={searchState.searchValue}
        />
      </div>
      <Grid>
        <Grid.Row>
          <Grid.Column className="tbody" style={{ textAlign: 'center' }}>
            {restaurants.length > 0
              ? restaurants.map(restaurant => (
                  <RestaurantDescriptionCard
                    restaurant={restaurant}
                    onChangeFavorite={onChangeFavorite}
                    sortingValue={sortingValue}
                    isFavorite={favorites.some(
                      favorite => favorite === restaurant.name,
                    )}
                  />
                ))
              : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default RestaurantList;

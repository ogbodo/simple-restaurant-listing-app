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
import SortValues from './SortValues';
import RestaurantDescriptionCard from './RestaurantDescriptionCard';

function RestaurantList() {
  const [sortingValue, setSortingValue] = useState(sortValues[0].value);
  const [favorites, setFavorites] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  function onSortItemClicked(_e, { value }) {
    setSortingValue(value);
  }

  function onAddFavorite(restaurantName) {
    setFavorites(restaurantName);
  }

  function onChange(_e, { value }) {
    setSearchValue(value);
  }

  useEffect(() => {
    const restaurants = getRestaurants();
    setRestaurants(restaurants);
  }, []);

  useEffect(() => {
    const sortedRestaurants = sortRestaurants(favorites, sortingValue);
    setRestaurants(sortedRestaurants);
  }, [sortingValue, favorites]);

  useEffect(() => {
    const restaurant = searchRestaurants(searchValue);
    setRestaurants([restaurant]);
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
                  <RestaurantDescriptionCard restaurant={restaurant} />
                ))
              : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default RestaurantList;

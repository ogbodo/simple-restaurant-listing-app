import React, { useState, useEffect } from 'react';
import { Grid, Dropdown, Input, Card } from 'semantic-ui-react';
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
  const [sortingValue, setSortingValue] = useState(sortValues[2]);
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
    getRestaurants()
      .then(restaurants => {
        const { status } = restaurants;
        if (status === 200) {
          setRestaurants(restaurants.data);
        } else {
          toast.error(restaurants.statusText);
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    sortRestaurants(favorites, sortingValue.value)
      .then(sortedRestaurants => {
        const { status } = sortedRestaurants;
        if (status === 200) {
          setRestaurants(sortedRestaurants.data);
        } else {
          toast.error(sortedRestaurants.statusText);
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
  }, [sortingValue, favorites]);

  useEffect(() => {
    if (searchState.isLoading) {
      searchRestaurants(searchState.searchValue)
        .then(restaurant => {
          const { status } = restaurant;
          if (status === 200) {
            setRestaurants([restaurant.data]);
          } else {
            toast.error(restaurant.statusText);
          }

          setSearchState(oldState => {
            return { ...oldState, isLoading: false };
          });
        })
        .catch(error => {
          toast.error(error.message);
        });
    }
  }, [searchState.searchValue, searchState.isLoading]);

  return (
    <div style={{ padding: 50 }}>
      <Grid>
        <div style={{ color: '#e94d1c', float: 'right', paddingBottom: 10 }}>
          <Dropdown
            placeholder="Sort Restaurant"
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
        <Grid.Row className="tbody" style={{ textAlign: 'center' }}>
          {restaurants.length > 0
            ? restaurants.map(restaurant => (
                <RestaurantDescriptionCard
                  restaurant={restaurant}
                  onChangeFavorite={onChangeFavorite}
                  sortingValue={sortingValue}
                  isFavorite={favorites.some(
                    favorite => favorite === restaurant.name,
                  )}
                  key={restaurant.name}
                />
              ))
            : restaurants.length === 0 && (
                <Card style={{ color: '#e94d1c', fontWeight: 'bold' }}>
                  No data to display!
                </Card>
              )}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default RestaurantList;

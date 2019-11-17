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
  const [sortingValue, setSortingValue] = useState(sortValues[0]);
  const [favorites, setFavorites] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [searchState, setSearchState] = useState({
    searchValue: '',
    isLoading: false,
    data: [],
  });

  function onSortItemClicked(_e, { options, value }) {
    setSortingValue(() => options.find(item => item.value === value));
  }

  function onChangeFavorite(_e, { value }) {
    setFavorites(oldState => [...oldState, value]);
  }

  function onChange(_e, { value }) {
    setSearchState({ isLoading: true, searchValue: value, data: [] });
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
    if (sortingValue.value || favorites.length > 0) {
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
    }
  }, [sortingValue, favorites]);

  useEffect(() => {
    if (searchState.isLoading) {
      searchRestaurants(searchState.searchValue)
        .then(restaurant => {
          const { status } = restaurant;

          if (status === 200) {
            setSearchState(oldState => {
              return { ...oldState, data: [restaurant.data] };
            });
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

  function PopulateData({ restaurant }) {
    return (
      <RestaurantDescriptionCard
        restaurant={restaurant}
        onChangeFavorite={onChangeFavorite}
        sortingValue={sortingValue}
        isFavorite={favorites.some(favorite => favorite === restaurant.name)}
        key={restaurant.name}
      />
    );
  }

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
            ? searchState.data.length > 0
              ? searchState.data.map(restaurant => (
                  <PopulateData restaurant={restaurant} />
                ))
              : restaurants.map(restaurant => (
                  <PopulateData restaurant={restaurant} />
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

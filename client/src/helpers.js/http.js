import axios from 'axios';

//gets all restaurants
export async function getRestaurants() {
  try {
    const response = await axios.get('/api');
    const { status, statusText } = response;
    return {
      data: response.data.data,
      status,
      statusText,
    };
  } catch (error) {
    return { error };
  }
}

//sort restaurants
export async function sortRestaurants(favorites, sortBy) {
  try {
    const response = await axios.post('/api/sort-restaurants', {
      favorites,
      sortBy,
    });
    const { status, statusText } = response;
    return {
      data: response.data.data,
      status,
      statusText,
    };
  } catch (error) {
    return { error };
  }
}

//Search for a restaurant by name
export async function searchRestaurants(name) {
  try {
    const response = await axios.get(`/api/restaurants/${name}`);

    const { status, statusText } = response;
    return {
      data: response.data.data,
      status,
      statusText,
    };
  } catch (error) {
    return { error };
  }
}

import express from 'express';
import {
  getRestaurantList,
  searchRestaurants,
  getRestaurants,
} from '../controllers/index';

const router = express.Router();

//gets all restaurants
router.get('/', async (_req, res) => {
  const restaurants = await getRestaurants();
  res.status(200).json({ data: restaurants });
});

//sort restaurants
router.post('/sort-restaurants', async (req, res) => {
  const { favorites, sortBy } = req.body;
  const restaurants = await getRestaurantList(favorites, sortBy);
  res.status(200).json({ data: restaurants });
});

//Search for a restaurant by name
router.get('/restaurants/:name', async (req, res) => {
  const { name } = req.params;
  if (!name) {
    res.status(400).json({ message: 'Please enter restaurant name' });
    return;
  }

  const restaurant = await searchRestaurants(name);

  if (!restaurant) {
    res.status(404).json({ message: 'Not found!' });
    return;
  }
  res.status(200).json({ data: restaurant });
});

export default router;

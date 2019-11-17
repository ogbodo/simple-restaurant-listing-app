import express from 'express';
import { getRestaurantList, searchRestaurants } from '../controllers/index';

const router = express.Router();

router.get('/', async (req, res) => {
  const { favorites, sortBy } = req.body;
  const restaurants = await getRestaurantList(favorites, sortBy);
  res.status(200).json({ data: restaurants });
});

//Search for a restaurant by name
router.get('/restaurants/:name', async (req, res) => {
  const { name } = req.params;
  const restaurant = await searchRestaurants(name);

  if (!restaurant) {
    res.status(404).json({ message: 'Not found!' });
    return;
  }
  res.status(200).json({ data: restaurant });
});

export default router;

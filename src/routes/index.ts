import express from 'express';
import { getRestaurantList, searchRestaurants } from '../controllers/index';

const router = express.Router();

router.get('/', async (req, res) => {
  const { favorites, sortBy } = req.body;
  const restaurants = await getRestaurantList(favorites, sortBy);
  res.status(200).json({ data: restaurants });
});

export default router;

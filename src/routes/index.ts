import express from 'express';
import { getRestaurantList } from '../controllers/index';

const router = express.Router();

router.get('/', (req, res) => {
  const { favorites, sortObject } = req.body.payload;
  const restaurants = getRestaurantList(favorites, sortObject);

  res.status(200).json({ data: restaurants });
});

export default router;

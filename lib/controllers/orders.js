import { Router } from 'express';
import Order from '../models/Order.js';
import OrderService from '../services/OrderService.js';

export default Router()
  .post('/', async (req, res, next) => {
    try{
      const order = await OrderService.create(req.body);
      res.send(order);

    } catch(err) {
      next(err);
    }
  });

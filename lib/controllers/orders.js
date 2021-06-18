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
  })

  .get('/', async (req, res, next) => {
    try {
      const orders = await Order.findAll();
      res.send(orders);

    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      res.send(order);

    } catch (err) {
      next(err);

    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const order = await OrderService.update(req.body);
      res.send(order);

    } catch(err){
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const order = await OrderService.delete(req.params.id);
      res.send(order);

    } catch(err) {
      next(err);

    }
  });

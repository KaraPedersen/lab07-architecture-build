import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Order from '../lib/models/Order.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('creates a new order in our database and sends a text message', async() => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ 
        item: 'food',
        quantity: 100
      });

    expect(res.body).toEqual({
      id: '1',
      item: 'food',
      quantity: 100
    });
  });

  test('finds an order in the database', async() => {
    const order = await Order.insert({
      item: 'shampoo',
      quantity: 4
    });

    const res = await request(app)
      .get(`/api/v1/orders/${order.id}`);

    expect(res.body).toEqual(order);
  });
});

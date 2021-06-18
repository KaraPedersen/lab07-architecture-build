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

  test('finds all orders in the database', async() => {
    const food = await Order.insert({
      // id: '1',
      item: 'food',
      quantity: 15
    });

    const lipstick = await Order.insert({
      // id: '2',
      item: 'lipstick',
      quantity: 2
    });

    const conditioner = await Order.insert({
      // id: '3',
      item: 'conditioner',
      quantity: 4
    });

    const res = await request(app)
      .get('/api/v1/orders');

    expect(res.body).toEqual([food, lipstick, conditioner]);

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

  test('update an order via Put', async () => {
    const order = await Order.insert({
      item: 'mirror',
      quantity: 10
    });

    const res = await request(app)
      .put(`/api/v1/orders/${order.id}`)
      .send(order);

    expect(res.body).toEqual(order);
  });
});

import Order from '../models/Order.js';
import { sendSms } from '../utils/twilio.js';

export default class OrderService {

  static async create({ item, quantity }) {
    const order = await Order.insert({ item, quantity });
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Thank you for your purchase!
      New Order received for ${item}.`
    );

    return order;
  }

  static async update({ item, quantity }) {
    const order = await Order.update({ item, quantity });
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Your order has recently been changed.
      update received for ${item}.`
    );

    return order;
  }

  static async delete(id) {
    const order = await Order.delete(id);

    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `We received your request to delete an item.
      Your ${order.item} has been removed.`
    );

    return order;
  }
}

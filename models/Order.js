const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 }=require('uuid')

const orderSchema = new Schema(
  {
    order_id: {
      type: String,
      default: uuidv4(),
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'products',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    shipping_details: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = Order = mongoose.model('orders', orderSchema);

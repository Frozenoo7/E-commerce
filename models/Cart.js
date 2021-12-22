const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'products',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    quantity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Cart = mongoose.model('carts', cartSchema);

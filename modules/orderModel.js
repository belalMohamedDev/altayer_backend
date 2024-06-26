const mongoose = require("mongoose");


const specialOfferSchema = new mongoose.Schema({
  description: { type: String },
  discountPercent: { type: Number },
  startDate: { type: Date },
  endDate: { type: Date },
});

const bulkPricingSchema = new mongoose.Schema({
  minQty: { type: Number },
  discountRate: { type: Number },
});


// Define the CartItem schema
const cartItemSchema = mongoose.Schema({
  product: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
  options: [
    {
      optionName: { type: String, required: true },
      additionalPrice: { type: Number, default: 0 },
    },
  ],
  customizations: [
    {
      name: { type: String },
      choice: {
        name: { type: String },
        additionalPrice: { type: Number },
      },
    },
  ],



  specialOffers: [specialOfferSchema],
  bulkPricing: [bulkPricingSchema],
  notes: { type: String },
  price: { type: Number, required: true },
  totalItemPrice: { type: Number },
})

const OrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    store: {
      type: mongoose.Schema.ObjectId,
      ref: 'Store',
    },

    status: {
      type: String,
      enum: ['Pending', 'Store Approved', 'Admin Approved', 'Assigned to Delivery', 'In Transit', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    deliveryPerson: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },

    cartItems: [cartItemSchema],


    taxPrice: {
      type: Number,
      default: 0,
    },

    shippingPrice: {
      type: Number,
      default: 0,
    },
    shippingAddress:  {
      type: mongoose.Schema.ObjectId,
      ref: 'UserAddress',
    },


    totalOrderPrice: {
      type: Number,
    },

    paymentMethodType: {
      type: String,
      enum: ["card", "cash"],
      default: "cash",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
    paitAt: Date,
 
  },
  { timestamps: true }
);

OrderSchema.pre(/^find/,function(next){
  this.populate({
    path:"user",
    select:"name profileImage email phone"
  }).populate({
    path:"cartItems.product",
    select:"title imageCover "
  })

  next()
})
const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;

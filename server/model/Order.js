import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
      required: true,
    },
    selectedAddress: {
      type: Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "cancelled", "dispatched", "delivered"],
      default: "pending",
    },
  },
  { timeseries: true }
);

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: [0, "wrong min price"] },
    discountPercentage: {
      type: Number,
      required: true,
      min: [0, "wrong min dicsount percentage"],
      max: [100, "wrong max dicsount percentage"],
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: [0, "wrong min rating"],
      max: [5, "wrong max rating"],
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "wrong min stock quantity"],
    },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
  },
  { timestamps: true }
);

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;

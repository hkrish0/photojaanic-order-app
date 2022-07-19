import mongoose from "mongoose";

export interface OrderProductDocument extends mongoose.Document {
  product_id: string;
  count: number;
  title: string;
  product: string;
  desc: string;
  pages: number;
  order_images: [mongoose.Types.ObjectId];
  options: ProductOptions;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductOptions extends mongoose.Document {
  option: string;
  desc: string;
  count: number;
  type: string;
}

const productOptionsSchema = new mongoose.Schema({
  option: { type: String },
  desc: { type: String },
  count: { type: Number },
  type: { type: String }
});

const orderProductSchema = new mongoose.Schema(
  {
    product_id: { type: String },
    count: { type: String, required: true },
    title: { type: String },
    product: { type: String },
    desc: { type: String },
    pages: { type: String },
    order_images: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderFile" }],
    options: [productOptionsSchema]
  },
  {
    timestamps: true,
  }
);

const OrderProduct = mongoose.model<OrderProductDocument>("OrderProduct", orderProductSchema);
export default OrderProduct;

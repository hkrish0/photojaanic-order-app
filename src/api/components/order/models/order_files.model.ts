import mongoose from "mongoose";

export interface OrderFileDocument extends mongoose.Document {
  type: string,
  format: string,
  url: string,
  md5sum: string,
  size: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderFileSchema = new mongoose.Schema(
  {
    type: { type: String },
    format: { type: String },
    url: { type: String },
    md5sum: { type: String },
    size: { type: String },
  },
  {
    timestamps: true,
  }
);

const OrderFile = mongoose.model<OrderFileDocument>("OrderFile", orderFileSchema);
export default OrderFile;

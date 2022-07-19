import mongoose from "mongoose";

export interface OrderDocument extends mongoose.Document {
  clientid: mongoose.Types.ObjectId;
  order_ref_no: string;
  date: Date;
  priority: string;
  address: mongoose.Types.DocumentArray<Address>;
  shipping: Shipping;
  product: [mongoose.Types.ObjectId];
  createdAt: Date;
  updatedAt: Date;
}

interface Address extends mongoose.Document {
  type: string,
  company: string,
  name: string,
  street1: string,
  street2: string,
  zip: string,
  city: string,
  country: string,
  state: string,
  email: string,
  phone: string,
}

interface Shipping extends mongoose.Document {
  method: string;
  consignor: string,
  invoice: Invoice;
}

interface Invoice extends mongoose.Document {
  shipments: number,
  currency: String,
  total: number,
}

const invoiceSchema = new mongoose.Schema(
  {
    shipments: { type: Number },
    currency: { type: String },
    total: { type: Number },
  }
);

const shippingSchema = new mongoose.Schema(
  {
    method: { type: String },
    consignor: { type: String },
    invoice: invoiceSchema,
  }
);

const addressSchema = new mongoose.Schema(
  {
    type: { type: String },
    company: { type: String },
    name: { type: String },
    street1: { type: String },
    street2: { type: String },
    zip: { type: String },
    city: { type: String },
    country: { type: String },
    state: { type: String },
    email: { type: String },
    phone: { type: String },
  }
);

const orderSchema = new mongoose.Schema(
  {
    clientid: { type: String, required: true },
    order_ref_no: { type: String, required: true },
    date: { type: String },
    priority: { type: String },
    address: [addressSchema],
    shipping: shippingSchema,
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderProduct" }],

  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<OrderDocument>("Order", orderSchema);
export default Order;

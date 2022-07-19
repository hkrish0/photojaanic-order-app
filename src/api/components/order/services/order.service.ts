import { Request } from "express";
import { Service } from "typedi";
import Order from "../models/order.model";
import OrderFile from "../models/order_files.model";
import OrderProduct from "../models/order_product.model";

@Service()
export class OrderService {

  createOrder = async (req: Request) => {
    let order = req.body.order;
    let orderProductsIdArray: any[] = [];
    const orderProducts = await this.createOrderProductAndImages(req.body.order);
    return Promise.all(orderProducts).then((prod: any) => {
      prod.forEach(function (data: any) {
        orderProductsIdArray.push(data._id);
      });
      order.product = orderProductsIdArray;
      const orderDoc = new Order(order);
      const order_data = orderDoc.save();
      return order_data;
    });
  };

  createOrderProductAndImages = async (order: any) => {
    try {
      let productPromises: any[] = [];
      let orderImagesIdArray: any[] = [];
      let orderProducts = order.items;

      orderProducts.forEach(function (data: any) {
        productPromises.push(
          OrderFile.insertMany(data.files).then(function (docs: any) {
            docs.forEach(function (imageDocs: any) {
              orderImagesIdArray.push(imageDocs._id);
            });
            data.order_images = orderImagesIdArray;
            const prodDocs = OrderProduct.insertMany(data);
            return prodDocs;
          }).catch(function (error: any) {
            console.log(error);
          }),
        );
      });
      return productPromises;
    }
    catch (err: any) {
      throw new Error(err);
    }
  };
}
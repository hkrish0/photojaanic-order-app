import { Express } from "express";
import { Container } from "typedi";
import { OrderController } from "./api/components/order/controllers/order.controller";


function routes(app: Express) {
  const orderController = Container.get(OrderController);
  app.post("/api/order", orderController.createOrderHandler);
}

export default routes;

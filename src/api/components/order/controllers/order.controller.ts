import { Request, Response } from "express";
import { Service } from "typedi";
import { OrderService } from "../services/order.service";

@Service()
export class OrderController {
  constructor(private orderService: OrderService) { }

  createOrderHandler = async (req: Request, res: Response) => {
    try {
      const response = await this.orderService.createOrder(req);
      return res
        .status(201)
        .json({ error: false, Order_ref_id: response._id, message: "order placed successfully" });
    }
    catch (err: any) {
      return res.status(400).json({
        error: true,
        message: "Error placing order",
      });
    }
  };


}
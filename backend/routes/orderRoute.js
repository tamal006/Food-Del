import express from "express";
import authMiddleware from "./../middleware/auth.js"
import { getOrder, getOrderAdmin, placeOrder } from "../controllers/orderControler.js";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/getOrder",authMiddleware,getOrder);
orderRouter.post("/getOrderAdmin",getOrderAdmin);
export default orderRouter;
import express from "express";
import {addToCart,removeFromCart,allremoveFromCart,getCart} from "../controllers/cartControler.js"
import authMiddleware from "../middleware/auth.js";
const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeFromCart);
cartRouter.post("/allremove",authMiddleware,allremoveFromCart);
cartRouter.post("/get",authMiddleware,getCart);

export default cartRouter;
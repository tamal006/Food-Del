import ordermodel from "../models/orderModel.js";
import userauthmodel from "../models/user.js";
import stripe from "stripe";

//placing user order from frontend
const placeOrder = async (req, res) => {
  let userData = await userauthmodel.findOne({ _id: req.body.userId });
  try {
    let cartData = await userData.cartData;

    const order = new ordermodel({
      userId: req.body.userId,
      items: cartData,
      amount: req.body.amount,
      address: req.body.address,
    });
    await order.save();
    await userauthmodel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    return res.json({ success: true, message: "order placed" });
  } catch (error) {
    return res.json({ success: false, message: "order not placed" });
  }
};
//fetch user cart data
const getOrder = async (req, res) => {
  let arr = {};
  try {
    const foods = await ordermodel.find({ userId: req.body.userId });
    foods.map((item) => {
      for (const key in item.items) {
        const keysArray = key;
        if (!arr[keysArray]) {
          arr[keysArray] = item.items[keysArray];
        } else {
          arr[keysArray] += item.items[keysArray];
        }
      }
    });

    res.status(200).json({ success: true, message: "success", data: arr });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch food items", error: error.message });
  }
};

//fetch user cart data
const getOrderAdmin = async (req, res) => {
  let arr = {};
  try {
    const foods = await ordermodel.find();
    // foods.map((item) => {
    //   for (const key in item.items) {
    //     const keysArray = key;
    //     if (!arr[keysArray]) {
    //       arr[keysArray] = item.items[keysArray];
    //     } else {
    //       arr[keysArray] += item.items[keysArray];
    //     }
    //   }
    // });

    res.status(200).json({ success: true, message: "success", data: foods });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch food items", error: error.message });
  }
};
export { placeOrder, getOrder,getOrderAdmin };

import userauthmodel from "../models/user.js";

//add to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userauthmodel.findOne({ _id: req.body.userId });

    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userauthmodel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.json({ success: true, message: "added to cart" });
  } catch (error) {
    return res.json({ success: false, message: "error" });
  }
};

//remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userauthmodel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 1) {
      cartData[req.body.itemId] -= 1;
    } else {
      cartData = {};
    }
    await userauthmodel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.json({ success: true, message: "remove to cart" });
  } catch (error) {
    return res.json({ success: false, message: "error" });
  }
};
const allremoveFromCart=async(req,res)=>{
  try {
    let userData = await userauthmodel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData; 
      cartData = {};
    await userauthmodel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.json({ success: true, message: "allremove to cart" });
  } catch (error) {
    return res.json({ success: false, message: "error" });
  }
}
//fetch user cart data
const getCart = async (req, res) => {
    try{
     let userData = await userauthmodel.findOne({ _id: req.body.userId });

    let cartData = await userData.cartData;
     return res.json({ success: true,cartData, message: "data get to cart" });
    }catch(error){
         return res.json({ success: false, message: "error",error });
    }
};

export { addToCart, removeFromCart, getCart,allremoveFromCart };

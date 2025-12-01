import { useState, useEffect } from "react";

import { SomeContext } from "./store";
import axios from "axios";
const StoreContextProvider = (prop) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list,setfood_list]=useState([]);
    const [order_list,setOrder_list]=useState({});
     const [profileData,setProfileData]=useState({});
  const [token, setToken] = useState("");
  const url = "http://localhost:4000";
  const addToCart =async (itemId) => {
    console.log("Adding to cart:", itemId);
    if (!cartItems[itemId]) {
      setCartItems((prev) => {
        prev[itemId] = 1;
        return { ...prev };
      });
    } else {
      setCartItems((prev) => {
        prev[itemId] = prev[itemId] + 1;
        return { ...prev };
      });
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] <= 1) {
        delete prev[itemId];
        return { ...prev };
      } else {
        prev[itemId] = prev[itemId] - 1;
        return { ...prev };
      }
    });
        if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});

    }
  };
  const getCartData= async (token) => {
        if(token){
    const response=  await axios.post(url+"/api/cart/get",{},{headers:{token}});
      setCartItems(response.data.cartData);
    }
  };
  const removeAllFromCart =async (itemId) => {
    setCartItems((prev) => {
      delete prev[itemId];
      return { ...prev };
    });
     if(token){
      await axios.post(url+"/api/cart/allremove",{itemId},{headers:{token}});
  };
};
  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let itemInfo = food_list.find((food) => food._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };
  const getTotalOrderAmount = () => {
    let totalAmount = 0;
    for (const itemId in order_list) {
      let itemInfo = food_list.find((food) => food._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.price * order_list[itemId];
      }
    }
    return totalAmount;
  };
  const fetchFoodList=async ()=>{
    const response=await axios.get(url+"/api/food/list");
    setfood_list(response.data.data);

  }
   const fetchOrderList=async ()=>{
    const response=await axios.post(url+"/api/order/getOrder",{},{headers:{token:localStorage.getItem("token")}});
    
    setOrder_list(response.data.data);

    
  }
 const fetchProfile=async ()=>{
    const response=await axios.post(url+"/api/user/profile",{},{headers:{token:localStorage.getItem("token")}});
    
    setProfileData(response.data.data);
 }
    
 
  useEffect(()=>{
    async function loadData() {
      
      await fetchFoodList();
      await fetchOrderList();
      await fetchProfile();
      if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"));
    }
    }
    loadData();
    getCartData(localStorage.getItem("token"));
  },[]);
  const currentValues = {
    //define values to be shared across components
    food_list,
    cartItems,
    setCartItems,
    getTotalAmount,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    getCartData,
    order_list,
    setOrder_list,
    url,
    token,
    setToken,
    getTotalOrderAmount,
    profileData,
    setProfileData,
    fetchProfile,
  };
  return (
    <SomeContext.Provider value={currentValues}>
      {prop.children}
    </SomeContext.Provider>
  );
};
export default StoreContextProvider;

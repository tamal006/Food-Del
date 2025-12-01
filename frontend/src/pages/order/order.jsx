import React, { useContext } from "react";
import "./order.css";
import { SomeContext } from "../../context/store";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Order = () => {
  const {
    url,
    cartItems,
    food_list,
    order_list,

    getTotalOrderAmount,
  } = useContext(SomeContext);
  const navigate = useNavigate();

 
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        <br />
        <hr />
       {/* { order_list.map(item2=>{console.log(item2)})} */}
        {food_list.map((item) => {
        
          if (order_list[item._id]>0) {
            console.log(item)
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <div className="counter">
                    <p>{order_list[item._id]}</p>
                  </div>
                  <p>${item.price * order_list[item._id]}</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Order Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotals</p>
              <p>${getTotalOrderAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalOrderAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalOrderAmount() === 0 ? 0 : getTotalOrderAmount() + 2}</b>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Order;

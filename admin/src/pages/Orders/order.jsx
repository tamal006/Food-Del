import React, { useContext } from "react";
import "./order.css";
import { SomeContext } from "../../context/store";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Order = () => {
  const { url, cartItems, food_list, order_list, getTotalOrderAmount } =
    useContext(SomeContext);
  const navigate = useNavigate();
  const rows = [];
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Status</p>
          <p>Email</p>
        </div>
        <br />
        <hr />

        {order_list.map((item1) => {
          for (const key2 in item1.items) {
            food_list.map((item) => {
              if (item._id == key2) {
                rows.push(<div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <div className="counter">
                    <p>{item1.items[key2]}</p>
                  </div>
                  <p>${item.price*item1.items[key2]}</p>
                  <p >{item1.status}</p>
                   <p >{item1.address.email}</p>
                </div>
                <hr />
              </div>);
              }
            });
          }
        })
        
        }
         <div>{rows}</div>
      </div>
    </div>
  );
};

export default Order;

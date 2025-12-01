import React, { useEffect } from "react";
import "./list.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const List = ({url}) => {
  
  const [listData, setListData] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);

    if (response.status === 200) {
      setListData(response.data.data);
      toast.success("List data fetched successfully");
    } else {
      toast.error("Error fetching list data");
    }
  };

  const removeFood = async (id) => {
    console.log(id);
    try{
      const response = await axios.delete(`${url}/api/food/delete/${id}`);
      console.log(response);
      if(response.status === 202){
        toast.success("Food item deleted successfully");
        fetchList(); //refresh the list after deletion
      }else{
        toast.error("Error deleting food item1");
      }
    }catch(error){
      toast.error("Error deleting food item2");
      console.log(error);
    }
     
  };
  useEffect(() => {
    fetchList(); //fetch the data and the fetchList function is called when the page is loaded
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {listData.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>{removeFood(item._id)}} className="cursor">X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
//display the image from the backend server at url http://localhost:4000/images/

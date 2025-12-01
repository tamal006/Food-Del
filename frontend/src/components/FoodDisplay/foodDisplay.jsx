import {useContext} from 'react'
import "./foodDisplay.css"
import { SomeContext } from '../../context/store';  
import FoodItem from '../FoodItem/foodItem';
const FoodDisplay = ({category}) => {
    const {food_list}=useContext(SomeContext);
  return (
    <div>
      <div className='food-display' id='food-display'>{category}</div>
      <h2>food item</h2>
      <div className="food-display-list">
        {food_list.map((item,index)=>{
          if(category==="All" || item.category===category){ return(
              <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            )}
           
        })}
      </div>
    </div>
  );
}

export default FoodDisplay
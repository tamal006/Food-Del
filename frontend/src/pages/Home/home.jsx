import React, { useState } from 'react'
import Header from '../../components/Header/header'
import ExploreMenu from '../../components/ExploreMenu/exploreMenu'
import FoodDisplay from '../../components/FoodDisplay/foodDisplay'
import AppDownload from '../../components/AppDownload/appDownload'

const Home = () => {
  const [category,setCategory]=useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
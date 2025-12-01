import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SideBar from './components/SideBar/sideBar'
import Navbar from './components/Navbar/navbar'
import Add from './pages/Add/add'
import List from './pages/List/list'
import Order from './pages/Orders/order'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const url="http://localhost:4000"
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path='/add' element={<Add url={url}/>} />
          <Route path='/list' element={<List url={url}/>} />
          <Route path='/orders' element={<Order url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
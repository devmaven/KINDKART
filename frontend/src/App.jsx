import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

const App = () => 
  {
  return(
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} /> 
        <Route path='/Register' element={<Register />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />  
        <Route path="/ResetPassword/:token" element={<ResetPassword />} />
        
      </Routes>
    </div>
  )
}

export default App 

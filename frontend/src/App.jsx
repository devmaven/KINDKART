import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import DonorDash from './pages/DonorDash'
import ReceiverDash from './pages/ReceiverDash'
import Logout from './pages/Logout'

const App = () => 
  {
  return(
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/gegister' element={<Register />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />  
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path='/donor_dash' element={<DonorDash />} /> 
        <Route path='/receiver_dash' element={<ReceiverDash />} />
        <Route path='/logout' element={<Logout />} /> 
      </Routes>
    </div>
  )
}

export default App 

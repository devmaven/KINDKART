import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import DonorDash from './pages/DonorDash'
import ReceiverDash from './pages/ReceiverDash'
import VolunteerDash from './pages/VolunteerDash'
import NGODash from './pages/NGODash'
import Logout from './pages/Logout'

const App = () => 
  {
  return(
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} /> 
        <Route path='/Register' element={<Register />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />  
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path='/DonorDash' element={<DonorDash />} /> 
        <Route path='/ReceiverDash' element={<ReceiverDash />} />
        <Route path='/VolunteerDash' element={<VolunteerDash />} />
        <Route path='/NGODash' element={<NGODash />} />
        <Route path='/Logout' element={<Logout />} /> 
      </Routes>
    </div>
  )
}

export default App 

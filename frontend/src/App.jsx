import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
// import ReceiverLogin from './pages/ReceiverLogin'
// import ReceiverSignup from './pages/ReceiverSignup'
// import NgoLogin from './pages/NgoLogin'
// import NgoSignup from './pages/NgoSignup'
// import VolunteerLogin from './pages/VolunteerLogin'
// import VolunteerSignup from './pages/VolunteerSignup'

const App = () => 
  {
  return(
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} /> 
        <Route path='/Register' element={<Register />} />
        {/* <Route path='/receiverlogin' element={<ReceiverLogin />} />
        <Route path='/receiversignup' element={<ReceiverSignup />} />
        <Route path='/ngologin' element={<NgoLogin />} />
        <Route path='/ngosignup' element={<NgoSignup />} />
        <Route path='/volunteerlogin' element={<VolunteerLogin />} />
        <Route path='/volunteersignup' element={<VolunteerSignup />} />   */}
      </Routes>
    </div>
  )
}

export default App 

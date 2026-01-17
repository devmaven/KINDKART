import React, {createContext, useState, useEffect} from 'react'

export const AuthContext  = createContext()

export const AuthUserContextProvider = ({children}) => {
  
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
 
  useEffect(()=>{
    const userData = localStorage.getItem('user');
    console.log('sssdddd', user)
    if (userData) {
      try {
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user'); // Clear corrupted data
      }
  
  }},[])
  
  return (
    <div>
      <AuthContext.Provider value={{user, setUser, error, setError}}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthUserContextProvider
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.session)

    console.log(isAuthenticated);
    

    return isAuthenticated ? children : <Navigate to={'/login'} />
}

export default ProtectedRoute
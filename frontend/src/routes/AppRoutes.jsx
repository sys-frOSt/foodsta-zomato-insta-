import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import Home from '../pages/general/Home'
import CreateFood from '../pages/food-partner/Createfoodpartner'
import ProfileFoodPartner from '../pages/food-partner/profile.foodpartner' 

const ProtectedRoute = ({ allowedRole, children }) => {
  const authRole = localStorage.getItem('authRole')

  if (authRole !== allowedRole) {
    return <Navigate to={allowedRole === 'foodpartner' ? '/foodpartner/login' : '/user/login'} replace />
  }

  return children
}

const PublicAuthRoute = ({ restrictedForRole, redirectTo, children }) => {
  const authRole = localStorage.getItem('authRole')

  if (authRole === restrictedForRole) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/user/register'
          element={
            <PublicAuthRoute restrictedForRole='user' redirectTo='/'>
              <UserRegister />
            </PublicAuthRoute>
          }
        />
        <Route
          path='/user/login'
          element={
            <PublicAuthRoute restrictedForRole='user' redirectTo='/'>
              <UserLogin />
            </PublicAuthRoute>
          }
        />
        <Route
          path='/foodpartner/register'
          element={
            <PublicAuthRoute restrictedForRole='foodpartner' redirectTo='/createfood'>
              <FoodPartnerRegister />
            </PublicAuthRoute>
          }
        />
        <Route
          path='/foodpartner/login'
          element={
            <PublicAuthRoute restrictedForRole='foodpartner' redirectTo='/createfood'>
              <FoodPartnerLogin />
            </PublicAuthRoute>
          }
        />
        <Route
          path='/'
          element={
            <ProtectedRoute allowedRole='user'>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/createfood'
          element={
            <ProtectedRoute allowedRole='foodpartner'>
              <CreateFood />
            </ProtectedRoute>
          }
        />
        <Route
          path='/foodpartner/:id'
          element={
            <ProtectedRoute allowedRole='user'>
              <ProfileFoodPartner />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router> 
  )
}

export default AppRoutes
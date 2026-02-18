import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const FoodPartnerLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const fields = [
    {
      name: 'email',
      label: 'Work email',
      type: 'email',
      placeholder: 'team@tastecollective.com',
      autoComplete: 'email'
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      autoComplete: 'current-password'
    }
  ]

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
  
    try{
      const response=await axios.post('http://localhost:3000/api/auth/foodpartner/login',
        formData,
        { withCredentials: true })
      console.log('Login successful:', response.data)
      navigate('/createfood')
    }catch(error){
      console.error('Login failed:', error);
    }
    console.log(formData)
  }

  return (
    <div className='auth-layout'>
      <div className='auth-card'>
        <header className='auth-header'>
          <h1 className='auth-title'>Partner sign in</h1>
          <p className='auth-subtitle'>Manage orders, menus, and insights from your dashboard.</p>
        </header>
        <form className='auth-form' onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div className='auth-field' key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                value={formData[field.name]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className='auth-actions'>
            <button className='auth-button-primary' type='submit'>
              Access dashboard
            </button>
            <p className='auth-secondary-action'>
              Need to join the platform?{' '}
              <Link to='/foodpartner/register'>Apply as a partner</Link>
            </p>
            <p className='auth-secondary-action'>
              Signing in as a diner? <Link to='/user/login'>Go to user login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FoodPartnerLogin

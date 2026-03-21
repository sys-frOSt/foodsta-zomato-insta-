import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const fields = [
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      placeholder: 'alex@email.com',
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

    try {
      const response = await axios.post('http://localhost:3000/api/auth/user/login',
         formData,
        { withCredentials: true })
      console.log('Login successful:', response.data)
      localStorage.setItem('authRole', 'user')
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error);
    }

    
  }

  return (
    <div className='auth-layout'>
      <div className='auth-card'>
        <header className='auth-header'>
          <h1 className='auth-title'>Welcome back</h1>
          <p className='auth-subtitle'>Access your account to continue exploring curated menus.</p>
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
              Sign in
            </button>
            <p className='auth-secondary-action'>
              Don't have an account? <Link to='/user/register'>Create one</Link>
            </p>
            <p className='auth-secondary-action'>
              Need tools for your culinary business?{' '}
              <Link to='/foodpartner/login'>Sign in as a partner</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserLogin

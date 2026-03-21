import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API_BASE_URL from '../../config/api'

const UserRegister = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const fields = [
    {
      name: 'fullName',
      label: 'Full name',
      type: 'text',
      placeholder: 'Alex Johnson',
      autoComplete: 'name'
    },
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
      placeholder: 'Create a password',
      autoComplete: 'new-password'
    }
  ]

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/user/register`,
         formData,
        { withCredentials: true }
      )
      console.log('Registration successful:', response.data)
      navigate('/api/auth/user/login')
      console.log(formData)
      
    } catch (error) {
      console.error('Registration failed:', error)
    }
  
  }
 
  return (
    <div className='auth-layout'>
      <div className='auth-card'>
        <header className='auth-header'>
          <h1 className='auth-title'>Create your account</h1>
          <p className='auth-subtitle'>Sign up to start discovering meals tailored to your taste.</p>
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
              Create account
            </button>
            <p className='auth-secondary-action'>
              Already have an account? <Link to='/user/login'>Sign in</Link>
            </p>
            <p className='auth-secondary-action'>
              Looking to collaborate as a food partner?{' '}
              <Link to='/foodpartner/register'>Apply here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserRegister

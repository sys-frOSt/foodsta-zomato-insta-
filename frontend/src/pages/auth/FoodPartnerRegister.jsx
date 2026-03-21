import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API_BASE_URL from '../../config/api'


const FoodPartnerRegister = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    contactNumber: '',
    email: '',
    password: '',
    address: ''
  })

  const fields = [
    {
      name: 'name',
      label: 'Business name',
      type: 'text',
      placeholder: 'Taste Collective',
      autoComplete: 'organization'
    },
    {
      name: 'contactName',
      label: 'Primary contact',
      type: 'text',
      placeholder: 'Jordan Smith',
      autoComplete: 'name'
    },
    {
      name: 'email',
      label: 'Work email',
      type: 'email',
      placeholder: 'team@tastecollective.com',
      autoComplete: 'email'
    },
    {
      name: 'contactNumber',
      label: 'Phone number',
      type: 'tel',
      placeholder: '+1 555 123 4567',
      autoComplete: 'tel'
    },
    {
      name: 'address',
      label: 'Business address',
      type: 'text',
      placeholder: '123 Market Street, San Francisco',
      autoComplete: 'street-address'
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
      const response=await axios.post(`${API_BASE_URL}/api/auth/foodpartner/register`,
        formData,
        { withCredentials: true })
        navigate('/foodpartner/login')
      console.log('Registration successful:', response.data)
    } catch (error) {
      console.error('Registration failed:', error);
    }
    console.log(formData)
  }

  return (
    <div className='auth-layout'>
      <div className='auth-card'>
        <header className='auth-header'>
          <h1 className='auth-title'>Partner Registration</h1>
          <p className='auth-subtitle'>Share your culinary experience with diners looking for something special.</p>
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
              Submit application
            </button>
            <p className='auth-secondary-action'>
              Already a partner? <Link to='/foodpartner/login'>Sign in</Link>
            </p>
            <p className='auth-secondary-action'>
              Joining as an individual diner?{' '}
              <Link to='/user/register'>Create a user account</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FoodPartnerRegister

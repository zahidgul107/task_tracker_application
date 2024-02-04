import React, { useState } from 'react'

import AuthService from '../services/auth.service'
import { Link } from 'react-router-dom'

const Register = (props) => {
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegistrationForm = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setErrorMessage('Password and Confirm Password do not match')
      setTimeout(() => setErrorMessage(''), 4000)
      return
    }
    setLoading(true)
    console.log('name', name)
    AuthService.register(name, username, email, password)
      .then(
        (response) => {
          setSuccessMessage(response.data.message)
          setTimeout(() => setSuccessMessage(''), 4000)
        },
        (error) => {
          const resMessage =
            error.response.data.errors ||
            error.response.data.message ||
            error.message ||
            error.toString()

          setErrorMessage(resMessage)
          console.log(resMessage)
          console.log(error.response.data.errors)
          setTimeout(() => setErrorMessage(''), 4000)
        }
      )
      .finally(() => {
        setLoading(false)
      })
    //  }
  }

  return (
    <div id="body1">
      <div className="signup-container">
        <div className="signup-form">
          <h2>Sign Up</h2>
          <div
            className="error-message"
            style={{ display: errorMessage ? 'block' : 'none' }}
          >
            {errorMessage}
          </div>
          <div
            className="sent-message"
            style={{ display: successMessage ? 'block' : 'none' }}
          >
            {successMessage}
          </div>
          <form action="#" method="post">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="mb-4"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="col-md-12 text-center">
              {loading ? (
                <div className="loading" style={{ display: 'block' }}>
                  Signing up...
                </div>
              ) : (
                <button
                  type="button"
                  onClick={(e) => handleRegistrationForm(e)}
                >
                  Sign Up
                </button>
              )}
            </div>
            <p className="text-light mt-3 mb-3">
              Already have an account?{' '}
              <Link to="/login" className="text-light font-weight-bolder">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register

import React, { useState } from 'react'

import AuthService from '../services/auth.service'
import { Link } from 'react-router-dom'

const Register = (props) => {
  const [message, setMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegistrationForm = (e) => {
    e.preventDefault()
    setLoading(true)
    AuthService.register(username, email, password)
      .then(
        (response) => {
          setMessage(response.data.message)
          setSuccessMessage(true)
          console.log(response.data)
        },
        (error) => {
          setSuccessMessage(false)
          setErrorMessage(true)
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          setMessage(resMessage)
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
            There was an error in singning up. Please try again later.
          </div>
          <div
            className="sent-message"
            style={{ display: successMessage ? 'block' : 'none' }}
          >
            {message}
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
              required
            />
            <input
              className="mb-4"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

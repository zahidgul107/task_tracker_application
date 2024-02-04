import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Index.css'

import AuthService from '../services/auth.service'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const handleLoginForm = (e) => {
    e.preventDefault()
    setLoading(true)
    AuthService.login(username, password).then(
      () => {
        navigate('/tasks')
        window.location.reload()
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()

        setLoading(false)
        setMessage(resMessage)
      }
    )
  }

  return (
    <div className="ring mx-auto mt-5">
      <i style={{ '--clr': '#00ff0a' }}></i>
      <i style={{ '--clr': '#ff0057' }}></i>
      <i style={{ '--clr': '#fffd44' }}></i>

      <div className="login">
        <h2>Login</h2>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <div className="inputBx">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="inputBx">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="inputBx">
          {loading ? (
            <div className="loading1" style={{ display: 'block' }}>
              Signing in
            </div>
          ) : (
            <input
              type="button"
              value="Sign in"
              onClick={(e) => handleLoginForm(e)}
            />
          )}
        </div>
        <div className="links">
          <a href="#">Forget Password</a>
          <Link to="/register">Signup</Link>
        </div>
      </div>
    </div>
  )
}

export default Login

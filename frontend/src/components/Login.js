import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Index.css'

import AuthService from '../services/auth.service'

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="invalid-feedback d-block">This field is required!</div>
//     )
//   }
// }

const Login = () => {
  const form = useRef()
  const checkBtn = useRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  // const onChangeUsername = (e) => {
  //   const username = e.target.value
  //   setUsername(username)
  // }

  // const onChangePassword = (e) => {
  //   const password = e.target.value
  //   setPassword(password)
  // }

  const handleLoginForm = (e) => {
    e.preventDefault()

    // setMessage('')
    setLoading(true)

    //  form.current.validateAll()

    // if (checkBtn.current.context._errors.length === 0) {
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
    // }
    // else {
    //   setLoading(false)
    // }
  }

  return (
    /*  <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>  */

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

          {/* {loading && (
            <span className="text-danger spinner-border spinner-border-sm"></span>
          )} */}
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

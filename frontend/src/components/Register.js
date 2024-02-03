import React, { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { isEmail } from 'validator'

import AuthService from '../services/auth.service'
import { Link } from 'react-router-dom'

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="invalid-feedback d-block">This field is required!</div>
//     )
//   }
// }

// const validEmail = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="invalid-feedback d-block">This is not a valid email.</div>
//     )
//   }
// }

// const vusername = (value) => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="invalid-feedback d-block">
//         The username must be between 3 and 20 characters.
//       </div>
//     )
//   }
// }

// const vpassword = (value) => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="invalid-feedback d-block">
//         The password must be between 6 and 40 characters.
//       </div>
//     )
//   }
// }

const Register = (props) => {
  const form = useRef()
  const checkBtn = useRef()

  const [successful, setSuccessful] = useState(false)

  const [message, setMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const onChangeUsername = (e) => {
  //   const username = e.target.value
  //   setUsername(username)
  // }

  // const onChangeEmail = (e) => {
  //   const email = e.target.value
  //   setEmail(email)
  // }

  // const onChangePassword = (e) => {
  //   const password = e.target.value
  //   setPassword(password)
  // }

  const handleRegistrationForm = (e) => {
    e.preventDefault()

    // setMessage('')
    // setSuccessful(false)

    setLoading(true)

    // form.current.validateAll()

    // if (checkBtn.current.context._errors.length === 0) {
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
          setSuccessful(false)
        }
      )
      .finally(() => {
        setLoading(false)
      })
    //  }
  }

  return (
    /* <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
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
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? 'alert alert-success' : 'alert alert-danger'
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>  */

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

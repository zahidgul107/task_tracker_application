import React, { useState, useEffect } from 'react'
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service'

// import AuthVerify from "./common/AuthVerify";
//import EventBus from './common/EventBus'

const Header = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined)
  const navigate = useNavigate()

  const isAuth = AuthService.getCurrentUser()

  function handleLogout() {
    AuthService.logout()
    //logOut()
    navigate('/')
  }

  /* useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'))
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
    }

    EventBus.on('logout', () => {
      logOut()
    })

    return () => {
      EventBus.remove('logout')
    }
  }, [])

  const logOut = () => {
    AuthService.logout()
    setShowModeratorBoard(false)
    setShowAdminBoard(false)
    setCurrentUser(undefined)
  }  */

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Task Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuth && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/tasks">
                  Tasks
                </NavLink>
              </li>
            )}
            {!isAuth && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Sign Up
                </NavLink>
              </li>
            )}
            {!isAuth && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Sign In
                </NavLink>
              </li>
            )}
            {isAuth && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/login"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
          {/* <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  )
}

export default Header

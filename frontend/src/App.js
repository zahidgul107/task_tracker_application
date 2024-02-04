import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, BrowserRouter, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import AuthService from './services/auth.service'

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Profile from './components/Profile'
import BoardUser from './components/BoardUser'
import BoardModerator from './components/BoardModerator'
import BoardAdmin from './components/BoardAdmin'

// import AuthVerify from "./common/AuthVerify";
import EventBus from './common/EventBus'
import Header from './components/Header'
import ListTasks from './components/ListTasks'
import Footer from './components/Footer'
import AddTask from './components/AddTask'

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined)

  function AuthenticatedRoute({ children }) {
    const isAuth = AuthService.getCurrentUser()

    if (isAuth) {
      return children
    } else {
      return <Navigate to="/" />
    }
  }

  useEffect(() => {
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
  }

  return (
    /*   <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          bezKoder
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div> */

    /* <AuthVerify logOut={logOut}/> */

    // </div>

    <>
      {/* <BrowserRouter> */}
      <Header />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/tasks"
          element={
            <AuthenticatedRoute>
              <ListTasks />
            </AuthenticatedRoute>
          }
        ></Route>
        <Route
          path="/addTask"
          element={
            <AuthenticatedRoute>
              <AddTask />
            </AuthenticatedRoute>
          }
        ></Route>
        <Route
          path="/updateTask/:id"
          element={
            <AuthenticatedRoute>
              <AddTask />
            </AuthenticatedRoute>
          }
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Footer />
      {/* </BrowserRouter> */}
    </>
  )
}

export default App

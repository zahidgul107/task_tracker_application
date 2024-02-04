import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './App.css'
import AuthService from './services/auth.service'
import Login from './components/Login'
import Register from './components/Register'
import EventBus from './common/EventBus'
import Header from './components/Header'
import ListTasks from './components/ListTasks'
import Footer from './components/Footer'
import AddTask from './components/AddTask'
import Dashboard from './components/Dashboard'

const App = () => {
  function AuthenticatedRoute({ children }) {
    const isAuth = AuthService.getCurrentUser()

    if (isAuth) {
      return children
    } else {
      return <Navigate to="/" />
    }
  }

  useEffect(() => {
    EventBus.on('logout', () => {
      logOut()
    })

    return () => {
      EventBus.remove('logout')
    }
  }, [])

  const logOut = () => {
    AuthService.logout()
  }

  return (
    <>
      {/* <BrowserRouter> */}
      <Header />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/dashboard"
          element={
            <AuthenticatedRoute>
              <Dashboard />
            </AuthenticatedRoute>
          }
        ></Route>
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

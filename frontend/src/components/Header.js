import { Link, NavLink, useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service'

const Header = () => {
  const navigate = useNavigate()

  const isAuth = AuthService.getCurrentUser()

  function handleLogout() {
    AuthService.logout()
    navigate('/')
  }

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
        </div>
      </div>
    </nav>
  )
}

export default Header

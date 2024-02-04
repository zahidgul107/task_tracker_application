import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Index.css'
import {
  completeTask,
  deleteTask,
  getAllTasks,
  getPagTasks,
  inCompleteTask,
  searchTask,
} from '../services/TaskService'
import EventBus from '../common/EventBus'

const ListTasks = () => {
  const [tasks, setTasks] = useState([])
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [message, setMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [failMessage, setFailMessage] = useState('')

  const location = useLocation()
  const successMessageFromComponent =
    location.state && location.state.successMessage

  const navigator = useNavigate()

  const dispatch = (error) => {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    setMessage(message)

    if (error.response && error.response.status === 401) {
      EventBus.dispatch('logout')
    }
  }

  useEffect(() => {
    if (successMessageFromComponent) {
      setSuccessMessage(successMessageFromComponent)
      const timeoutId = setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
    listTasks()
  }, [])

  function listTasks(page = 0) {
    getAllTasks(page)
      .then((response) => {
        const { pagTaskList, totalPages, currentPage, totalItems } =
          response.data
        setTasks(pagTaskList)
        setTotalPages(totalPages)
        setCurrentPage(currentPage)
        setTotalItems(totalItems)
      })
      .catch((error) => {
        dispatch(error)
      })
  }

  function updateTask(id) {
    navigator(`/updateTask/${id}`)
  }

  function removeTask(id) {
    deleteTask(id)
      .then((response) => {
        listTasks()
        setSuccessMessage(response.data)
      })
      .catch((error) => {
        dispatch(error)
      })
      .finally(() => {
        setTimeout(() => setSuccessMessage(null), 5000)
      })
  }

  function markCompleteTask(id) {
    completeTask(id)
      .then((response) => {
        console.log(response.data)
        listTasks()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function markInCompleteTask(id) {
    inCompleteTask(id)
      .then((response) => {
        listTasks()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // search
  function search(e) {
    e.preventDefault()
    const search = { dueDate, status }
    searchTask(search)
      .then((response) => {
        const { pagTaskList, totalPages, currentPage, totalItems } =
          response.data
        setTasks(pagTaskList)
        setTotalPages(totalPages)
        setCurrentPage(currentPage)
        setTotalItems(totalItems)
      })
      .catch((error) => {
        dispatch(error)
      })
      .finally(() => {
        setTimeout(() => setSuccessMessage(null), 5000)
      })
  }

  // pagination
  const onPageChange = (page) => {
    getPagTasks(page)
      .then((response) => {
        const { pagTaskList, totalPages, currentPage, totalItems } =
          response.data
        setTasks(pagTaskList)
        setTotalPages(totalPages)
        setCurrentPage(currentPage)
        setTotalItems(totalItems)
      })
      .catch((error) => {
        dispatch(error)
      })
  }

  const generatePageNumbers = () => {
    const maxPagesOnEachSide = 1
    const totalPagesToDisplay = maxPagesOnEachSide * 2 + 1

    const startPage = Math.max(1, currentPage - maxPagesOnEachSide)
    const endPage = Math.min(totalPages, currentPage + maxPagesOnEachSide)

    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <>
      {message ? (
        <div className="container text-center mt-5">
          <header className="jumbotron">
            <h3>{message}</h3>
          </header>
        </div>
      ) : (
        <div className="container">
          <h2 className="text-light text-center">List of Tasks</h2>
          <div class="row w-50 mx-auto">
            {failMessage && (
              <div
                class=" col-md-12 m-4 alert alert-icon alert-danger border-danger alert-dismissible fade show text-center "
                role="alert"
                style={{ width: 'fit-content' }}
              >
                {failMessage}
              </div>
            )}
            {successMessage && (
              <div
                class=" col-md-12 m-4 alert alert-icon alert-success border-success alert-dismissible fade show text-center "
                role="alert"
                style={{ width: 'fit-content' }}
              >
                {successMessage}
              </div>
            )}
          </div>
          <div className="row">
            {/* <Link
              to="/addTask"
              className="card  border-0 d-flex mb-0 text-center col-md-3 mb-2 p-2"
            >
              Add Task
            </Link> */}
            <div className="card  border-0 d-flex mb-2 text-center col-md-2 p-2">
              <strong className="font-weight-bold">
                Total Tasks :{' '}
                <span className="badge badge-success p-2 rounded-circle">
                  {totalItems}
                </span>
              </strong>
            </div>
          </div>
          <div className="card table-success mb-2 form p-4 border-0 shadow-lg">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Status</label>{' '}
                  <select
                    className="form-select form-control"
                    aria-label="Default select example"
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value === '' ? null : e.target.value)
                    }
                  >
                    <option value="">Select task status</option>
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>

                <div className="form-group col-md-6">
                  <label for="fromDate">Due Date</label>{' '}
                  <input
                    type="date"
                    className="form-control picker"
                    placeholder="Enter From Date"
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="container text-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-outline-primary"
                    onClick={search}
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <table className="table table-hover table-success table-striped">
            <thead>
              <tr>
                <th scope="col">Task Title</th>
                <th scope="col">Task Description</th>
                <th scope="col">Task Due Date</th>
                <th scope="col">Task Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.status}</td>
                  <td>
                    <a className="mr-2" onClick={() => updateTask(task.id)}>
                      <i
                        class="fa fa-edit text-success"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        data-bs-title="Update Bill "
                      ></i>
                    </a>
                    <a type="button" onClick={() => removeTask(task.id)}>
                      <i
                        class="fa fa-trash text-danger"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        data-bs-title="Delete Bill"
                      ></i>
                    </a>
                    {/* <button
                      className="btn btn-success mr-2"
                      onClick={() => markCompleteTask(task.id)}
                    >
                      Complete
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => markInCompleteTask(task.id)}
                    >
                      InComplete
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{' '}
          */
          {/* pagination */}
          /*{' '}
          {totalPages > 1 && (
            <div className="offset-md-4 col-md-8 mb-5">
              <ul className="pagination">
                <li className="page-item">
                  <button className="page-link" onClick={() => onPageChange(1)}>
                    First
                  </button>
                </li>

                <li className="page-item">
                  <button
                    className="pe-3 page-link"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                  >
                    {'<<'}
                  </button>
                </li>
                {generatePageNumbers().map((i) => (
                  <li className="page-item" key={i}>
                    <button
                      className={`page-link ${
                        currentPage === i ? 'active' : ''
                      }`}
                      onClick={() => onPageChange(i)}
                    >
                      {i}
                    </button>
                  </li>
                ))}

                <li className="page-item">
                  <button
                    className="pe-3 page-link"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                  >
                    {'>>'}
                  </button>
                </li>

                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage >= totalPages}
                  >
                    Last
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ListTasks

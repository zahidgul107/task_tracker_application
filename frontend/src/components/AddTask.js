import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { createTask, getTask, updateTask } from '../services/TaskService'
import EventBus from '../common/EventBus'

const AddTask = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [failMessage, setFailMessage] = useState('')

  const dispatch = (error) => {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    setErrorMessage(message)

    if (error.response && error.response.status === 401) {
      EventBus.dispatch('logout')
    }
  }

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: '',
  })

  const { id } = useParams()

  const navigator = useNavigate()

  useEffect(() => {
    if (id) {
      console.log('id===  ', id)
      getTask(id)
        .then((response) => {
          console.log(response.data)
          setTitle(response.data.title)
          setDescription(response.data.description)
          setDueDate(response.data.dueDate)
          setStatus(response.data.status)
        })
        .catch((error) => {
          dispatch(error)
        })
    }
  }, [id])

  function saveOrUpdateTask(e) {
    e.preventDefault()
    if (validateForm()) {
      const task = { title, description, dueDate, status }
      console.log(task)
      if (id) {
        updateTask(id, task)
          .then((response) => {
            console.log(response.data)
            setSuccessMessage(response.data.message)
            const successMessage = response.data.message
            navigator('/tasks', { state: { successMessage } })
          })
          .catch((error) => {
            dispatch(error)
          })
          .finally(() => {
            setTimeout(() => setSuccessMessage(null), 5000)
          })
      } else {
        createTask(task)
          .then((response) => {
            setSuccessMessage(response.data.message)
          })
          .catch((error) => {
            dispatch(error)
          })
          .finally(() => {
            setTimeout(() => setSuccessMessage(null), 5000)
          })
      }
    }
  }

  function validateForm() {
    let valid = true

    const errorsCopy = { ...errors }

    if (title.trim()) {
      errorsCopy.title = ''
    } else {
      errorsCopy.title = 'Title is required'
      valid = false
    }

    if (description.trim()) {
      errorsCopy.description = ''
    } else {
      errorsCopy.description = 'Description is required'
      valid = false
    }

    if (dueDate.trim()) {
      errorsCopy.dueDate = ''
    } else {
      errorsCopy.dueDate = 'DueDate is required'
      valid = false
    }

    if (status) {
      errorsCopy.status = ''
    } else {
      errorsCopy.status = 'Task status is required'
      valid = false
    }

    setErrors(errorsCopy)

    return valid
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Task</h2>
    } else {
      return <h2 className="text-center">Add Task</h2>
    }
  }
  return (
    <>
      {errorMessage ? (
        <div className="container text-center mt-5">
          <header className="jumbotron">
            <h3>{errorMessage}</h3>
          </header>
        </div>
      ) : (
        <div className="container">
          <br /> <br />
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {pageTitle()}
              <div className="row w-50 mx-auto">
                {failMessage && (
                  <div
                    className=" col-md-12 m-4 alert alert-icon alert-danger border-danger alert-dismissible fade show text-center "
                    role="alert"
                    style={{ width: 'fit-content' }}
                  >
                    {failMessage}
                  </div>
                )}
                {successMessage && (
                  <div
                    className=" col-md-12 m-4 alert alert-icon alert-success border-success alert-dismissible fade show text-center "
                    role="alert"
                    style={{ width: 'fitContent' }}
                  >
                    {successMessage}
                  </div>
                )}
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.title ? 'is-invalid' : ''
                      }`}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && (
                      <div className="invalid-feedback">{errors.title}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      type="text"
                      className={`form-control ${
                        errors.description ? 'is-invalid' : ''
                      }`}
                      id="exampleInputPassword1"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input
                      type="date"
                      className={`form-control ${
                        errors.dueDate ? 'is-invalid' : ''
                      }`}
                      id="exampleInputPassword1"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                    {errors.dueDate && (
                      <div className="invalid-feedback">{errors.dueDate}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      type="email"
                      className={`form-control ${
                        errors.status ? 'is-invalid' : ''
                      }`}
                      id="exampleInputPassword1"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select task status</option>
                      <option value="PENDING">PENDING</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                    {errors.status && (
                      <div className="invalid-feedback">{errors.status}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={saveOrUpdateTask}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AddTask

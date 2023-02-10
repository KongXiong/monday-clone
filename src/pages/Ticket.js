import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCategories, useTickets } from '../context.js'
import { getTicket } from '../services/tickets.js'

const Ticket = ({ editMode = false }) => {
  const { tickets, setTickets } = useTickets()
  const { id } = useParams()
  const { categories, setCategories } = useCategories()
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'not started',
    priority: 0,
    progress: 0,
    category: '',
    owner: '',
    avatar: '',
    timestamp: new Date().toISOString(),
  })

  const navigate = useNavigate()

  useEffect(() => {
    setCategories([...new Set(tickets?.map(({ category }) => category))])
  }, [tickets])

  useEffect(() => {
    if (editMode) {
      const res = async () => {
        const ticketData = await getTicket(id)
        setForm(ticketData)
      }
      res()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!editMode) {
      await axios
        .post('http://localhost:8000/tickets', {
          form,
        })
        .then((response) => {
          if (response.status === 200) {
            setTickets([...tickets, response.data])
            navigate('/')
          }
        })
        .catch((error) => {
          console.log('Error creating ticket!', error)
          return Promise.reject(error)
        })
    } else {
      await axios
        .put(`http://localhost:8000/tickets/${id}`, {
          form,
        })
        .then((response) => {
          if (response.status === 200) navigate('/')
        })
        .catch((error) => {
          console.log('Error editing ticket!', error)
          return Promise.reject(error)
        })
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className="ticket">
      <h1>{editMode ? 'Update your ticket' : 'Create a ticket'}</h1>
      <div className="ticket-container">
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
              required={true}
              value={form.title}
            />
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              onChange={handleChange}
              required={true}
              value={form.description}
            />
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {categories?.map((category, _index) => (
                <option key={_index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <label htmlFor="new-category">New Category</label>
            <input
              id="new-category"
              name="new-category"
              type="text"
              onChange={handleChange}
              value=""
            />
            <label>Priority</label>
            <div className="multiple-input-container">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>
                  <input
                    id={`priority-${index}`}
                    name="priority"
                    type="radio"
                    onChange={handleChange}
                    value={index}
                    checked={form.priority == index}
                  />
                  <label id={index} htmlFor={`priority-${index}`}>
                    {index}
                  </label>
                </span>
              ))}
            </div>
            {editMode && (
              <>
                <input
                  type="range"
                  id="progress"
                  name="progress"
                  value={form.progress}
                  min="0"
                  max="100"
                  onChange={handleChange}
                />
                <label htmlFor="progress">Progress</label>

                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  selected={form.data}
                >
                  <option value="">{''}</option>
                  <option value="done">Done</option>
                  <option value="working on it">Working on it</option>
                  <option value="stuck">Stuck</option>
                  <option value="not started">Not started</option>
                </select>
              </>
            )}
            <button type="submit" className="submit-btn">
              submit
            </button>
          </section>
          <section>
            <label htmlFor="owner">Owner</label>
            <input
              id="owner"
              name="owner"
              type="text"
              onChange={handleChange}
              required={true}
              value={form.owner}
            />
            <label htmlFor="avatar">Avatar</label>
            <input
              id="avatar"
              name="avatar"
              type="url"
              onChange={handleChange}
              required={true}
              value={form.avatar}
            />
            <div className="img-preview">
              {form.avatar && <img src={form.avatar} alt="image preview" />}
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}

export default Ticket

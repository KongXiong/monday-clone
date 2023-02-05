import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCategories, useTickets } from '../context.js'

const Ticket = () => {
  const [form, setForm] = useState({
    status: 'not started',
    progress: 0,
    timestamp: new Date().toISOString(),
  })
  const { tickets } = useTickets()
  const { categories, setCategories } = useCategories()
  const navigate = useNavigate()

  const editMode = false

  useEffect(() => {
    setCategories([...new Set(tickets?.map(({ category }) => category))])
  }, [tickets])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!editMode) {
      await axios
        .post('http://localhost:8000/tickets', {
          form,
        })
        .then((response) => {
          if (response.status === 200) navigate('/')
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
              name="category"
              type="text"
              onChange={handleChange}
              value={form.category}
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

                <status>Status</status>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option selected={form.data === 'done'} value="done">
                    Done
                  </option>
                  <option
                    selected={form.data === 'working on it'}
                    value="working on it"
                  >
                    Working on it
                  </option>
                  <option selected={form.data === 'stuck'} value="stuck">
                    Stuck
                  </option>
                  <option
                    selected={form.data === 'not started'}
                    value="not started"
                  >
                    Not started
                  </option>
                </select>
              </>
            )}
            <input type="submit" />
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

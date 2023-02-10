import mongoose from 'mongoose'
import Tasks from '../models/Tasks.js'

export const postTickets = async (req, res) => {
  const { form } = req.body

  const task = await Tasks(form)
  try {
    task.save()
    res.status(200).json(task)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getTickets = async (req, res) => {
  try {
    const tasks = await Tasks.find().limit(20).sort({ createdOn: -1 })
    res.status(200).json(tasks)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getTicket = async (req, res) => {
  try {
    const { id } = req.params

    const task = await Tasks.findById({
      _id: new mongoose.Types.ObjectId(id),
    })
    res.status(200).json(task)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const editTicket = async (req, res) => {
  try {
    const { form } = req.body
    const query = { _id: form._id }

    const response = await Tasks.findOneAndUpdate(query, form, { upsert: true })
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params

    const response = await Tasks.deleteOne({ _id: id })
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

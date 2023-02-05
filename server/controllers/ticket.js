import Tasks from '../models/Tasks.js'

export const postTickets = async (req, res) => {
  const form = req.body.form
  const task = await Tasks(form)

  task.save((err, task) => {
    if (err) {
      res.send(err)
      res.status(404).json({ message: error.message })
    }
    res.status(200).json(task)
  })
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
    const task = await Tasks.findById(id)
    res.status(200).json(task)
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

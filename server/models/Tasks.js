import mongoose from 'mongoose'

const TasksSchema = new mongoose.Schema(
  {
    category: String,
    title: String,
    owner: String,
    avatar: String,
    status: String,
    priority: Number,
    progress: Number,
    description: String,
  },
  { timestamps: true }
)

const Tasks = mongoose.model('Tasks', TasksSchema)

export default Tasks

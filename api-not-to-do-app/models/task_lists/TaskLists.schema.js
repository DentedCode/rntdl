import mongoose from 'mongoose'

const TaskListSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      default: '',
    },
    hr: {
      type: Number,
      require: true,
      default: 0,
    },
    todo: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const TaskList = mongoose.model('Task_list', TaskListSchema)
export default TaskList

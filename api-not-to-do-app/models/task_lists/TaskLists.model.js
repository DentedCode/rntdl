import TaskList from './TaskLists.schema.js'

export const insertTask = (newTask) => {
  return new Promise((resolve, reject) => {
    try {
      TaskList(newTask)
        .save()
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (error) {
      reject(error)
    }
  })
}
export const getTasks = () => {
  return new Promise((resolve, reject) => {
    try {
      TaskList.find()
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (error) {
      reject(error)
    }
  })
}
export const deleteTasks = (ids) => {
  if (!ids.length) return false
  return new Promise((resolve, reject) => {
    try {
      TaskList.deleteMany({
        _id: {
          $in: ids,
        },
      })
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (error) {
      reject(error)
    }
  })
}
export const updateTodo = ({ _id, todo }) => {
  if (!_id) return false
  return new Promise((resolve, reject) => {
    try {
      TaskList.findByIdAndUpdate(
        _id,
        {
          $set: { todo },
        },
        { new: true }
      )
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (error) {
      reject(error)
    }
  })
}

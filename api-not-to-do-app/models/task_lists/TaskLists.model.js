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

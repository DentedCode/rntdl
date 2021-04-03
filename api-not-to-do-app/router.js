import express from 'express'
const router = express.Router()

import {
  insertTask,
  getTasks,
  deleteTasks,
  updateTodo,
} from './models/task_lists/TaskLists.model.js'

router.all('*', (req, res, next) => {
  next()
})

router.get('/', async (req, res) => {
  const result = await getTasks()

  if (result.length) {
    return res.json({
      status: 'success',
      message: 'Your new task is added',
      result,
    })
  }
  res.json({
    status: 'error',
    message: 'Unable to add your new task, Please try again later.',
  })
})

//create new task in the database
router.post('/', async (req, res) => {
  console.log(req.body)
  const result = await insertTask(req.body)

  if (result._id) {
    return res.json({
      status: 'success',
      message: 'Your new task is added',
      result,
    })
  }
  res.json({
    status: 'error',
    message: 'Unable to add your new task, Please try again later.',
  })
})

router.patch('/', async (req, res) => {
  try {
    const { todo } = req.body

    const result = await updateTodo(todo)

    if (result?._id) {
      return res.json({
        status: 'success',
        message: 'Selected item has been updated',
      })
    }
    res.json({
      status: 'error',
      message: 'Unable to update the tasks list',
    })
  } catch (error) {
    console.log(error.message)
    res.json({
      status: 'error',
      message: error.message,
    })
  }
})
router.put('/', (req, res) => {
  console.log(req.body)
  res.send('Now you have reached the put')
})

router.delete('/', async (req, res) => {
  try {
    const ids = req.body

    const result = await deleteTasks(ids)

    if (result?.deletedCount) {
      return res.json({
        status: 'success',
        message: 'Selected Item has been deleted',
      })
    }
    res.json({
      status: 'error',
      message: 'Unable to add delete the tasks please try again later',
    })
  } catch (error) {
    console.log(error.message)
    res.json({
      status: 'error',
      message: error.message,
    })
  }
})

export default router

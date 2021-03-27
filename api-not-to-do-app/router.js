import express from 'express'
const router = express.Router()

import { insertTask } from './models/task_lists/TaskLists.model.js'

router.get('*', (req, res, next) => {
  console.log('user is verifid')
  next()
})

router.get('/', (req, res) => {
  res.send('Now you have reached the get')
})
router.get('/new', (req, res) => {
  res.send('Now you have reached the new')
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

router.patch('/', (req, res) => {
  console.log(req.body)
  res.send('Now you have reached the patch')
})
router.put('/', (req, res) => {
  console.log(req.body)
  res.send('Now you have reached the put')
})
router.delete('/', (req, res) => {
  console.log(req.body)
  res.send('Now you have reached the delete')
})

export default router

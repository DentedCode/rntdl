import mongoose from 'mongoose'

const mongoClient = async () => {
  const connStr =
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_MONGO_CLIENT
      : process.env.MONGO_CLIENT
  console.log('>>>>>>', connStr)
  try {
    const con = await mongoose.connect(
      'mongodb+srv://PremAdmin:abianszmeDHzcQkJ@cluster0.mumwt.mongodb.net/task_lists?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    )

    if (con) {
      console.log('MongoDB is connected')
    }
  } catch (error) {
    console.log(error)
  }
}

export default mongoClient

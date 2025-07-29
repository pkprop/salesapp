import mongoose from 'mongoose'
import env from '#start/env'

const connectMongoDB = async () => {
  try {
    await mongoose.connect(env.get('MONGODB_URI')||'mongodb://localhost:27017/propXpo', {
      //useNewUrlParser: true,
     // useUnifiedTopology: true,
    })
    console.log('MongoDB connected successfully!')
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}

export default connectMongoDB
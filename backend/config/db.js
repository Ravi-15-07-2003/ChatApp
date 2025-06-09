import mongoose from 'mongoose';

const connectDb = async () => {
  try {
      mongoose.connect(process.env.MONGODB_URL);
      console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
}

export default connectDb;
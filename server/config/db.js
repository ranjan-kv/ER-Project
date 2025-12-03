import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDB = async () => {
  try {
    // Try connecting to the provided URI first
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('Could not connect to local MongoDB. Starting in-memory instance...');
    try {
      // Fallback to in-memory server
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      console.log(`In-memory MongoDB started at ${uri}`);

      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected (In-Memory): ${conn.connection.host}`);
    } catch (err) {
      console.error(`Error connecting to MongoDB: ${err.message}`);
      process.exit(1);
    }
  }
};

export default connectDB;

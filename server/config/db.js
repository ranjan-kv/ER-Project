import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);

    // Only attempt in-memory server if NOT in production
    if (process.env.NODE_ENV !== 'production') {
      try {
        console.log('Attempting to start in-memory MongoDB...');
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        console.log(`In-memory MongoDB started at ${uri}`);

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected (In-Memory): ${conn.connection.host}`);
      } catch (err) {
        console.error(`Failed to start in-memory MongoDB: ${err.message}`);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
};

export default connectDB;

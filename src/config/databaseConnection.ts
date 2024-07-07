import mongoose from 'mongoose';

// Define a function to get the MongoDB URI from environment variables
// This makes the code cleaner and encapsulates the logic for getting the environment variable.
const getMongoUri = (): string => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
  }
  return mongoUri;
}

const connectDB = async () => {
  try {
    // Use the getMongoUri function to get the URI
    const mongoUri = getMongoUri();
    await mongoose.connect(mongoUri, {
      dbName: "tascopia-server",
    });
    console.log("Connected to the database");
  } catch (err) {
    // Improved error handling: Log the error message and optionally rethrow or handle it as needed
    console.error("Error connecting to the database:", err.message);
    throw err; // Rethrow if you want to handle this error further up the call stack
  }
}

export default connectDB;
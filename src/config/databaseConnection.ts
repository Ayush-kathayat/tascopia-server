//! The error message you're seeing is related to TypeScript's strict null checks. 
//? In your code, process.env.MONGO_URI is potentially undefined because not all environment variables are guaranteed to be set. 
//! However, the mongoose.connect function expects a string as its first argument.


import mongoose from 'mongoose'; 

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }
    await mongoose.connect(mongoUri, {
      dbName: "tascopia-server",
    });
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
}
export default connectDB;
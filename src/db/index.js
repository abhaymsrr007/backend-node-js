
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
       const connection = await mongoose.connect(process.env.MONGO_URI, {
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`\n Connected to MongoDB at ${connection.connection.host}:${connection.connection.port}`);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
        process.exit(1);
    }
};

export default connectDB;

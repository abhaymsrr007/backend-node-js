import "dotenv/config"; // Automatically loads environment variables from .env file

import connectDB from "./db/index.js";

// import express from "express";
// const app = express();

connectDB();

/*
;(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 5000,
        });
        app.on("error", (err) => {
            console.error("Server error:", err);
            throw err;
        });
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
})();b
*/


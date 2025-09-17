import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

const app = express();

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow specific HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow specific headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(express.json({ limit: "16kb" })); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Middleware to parse URL-encoded requests
app.use(express.static("public")); // Serve static files from the 'public' directory
app.use(cookieParser()); // Middleware to parse cookies

//routes import
import userRouter from "./routes/user.routes.js";

//route declaration
app.use("/api/v1/users", userRouter);

export { app };

import { request } from "express";

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      console.error("Async Handler Error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    });
  };
};

export { asyncHandler };

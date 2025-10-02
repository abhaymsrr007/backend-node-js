// middlewares/logger.js
import fs from "fs";
import path from "path";

// log file path
const logFile = path.join(process.cwd(), "login_logs.txt");

export const logLoginAttempt = (usernameOrEmail, success) => {
  const timestamp = new Date().toISOString();
  const status = success ? "SUCCESS" : "FAILED";

  const logEntry = `${timestamp} - ${usernameOrEmail} - ${status}\n`;
  console.log(logEntry);

  // Append log to file
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error("Error writing login log:", err);
    }
  });
};

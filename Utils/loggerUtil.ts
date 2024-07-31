import winston from "winston";
import path from "path";
import fs from 'fs';
import moment from "moment-timezone";

// Go one level above (back to 'src')
const logDir = path.resolve(__dirname, '../logs');

// Change to 'logging' folder
const loggingDir = path.join(logDir, "logs");

// Ensure logging directory exists
if (!fs.existsSync(loggingDir)) {
  fs.mkdirSync(loggingDir, { recursive: true });
}

// Function to format log entries with timestamp and timezone
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

export const getTestCaseName = () => {
  // Get the filename of the current script
  const fileName = path.basename(__filename, path.extname(__filename));
  return fileName;
};

// Set the desired timezone
//const timeZone = "Europe/London"; // For the UK
// const timeZone = 'America/New_York'; // For the US
const timeZone = "Asia/Kolkata"; // For India

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: () => moment().tz(timeZone).format() }),
    customFormat
  ),
  transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({
      filename: path.join(loggingDir, "test_info.log"),
      maxFiles: 25, // Number of log files to retain
      maxsize: 300 * 1024, // 10 * 1024 ==10 KB, specify the size in bytes
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(loggingDir, "test_error.log"),
      maxFiles: 25, // Number of log files to retain
      maxsize: 30 * 1024, // 10 KB, specify the size in bytes
      level: "error",
    }),
  ],
});

export default logger;
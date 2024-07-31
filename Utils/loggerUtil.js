"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestCaseName = void 0;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
// Go one level above (back to 'src')
const logDir = path_1.default.resolve(__dirname, '../logs');
// Change to 'logging' folder
const loggingDir = path_1.default.join(logDir, "logs");
// Ensure logging directory exists
if (!fs_1.default.existsSync(loggingDir)) {
    fs_1.default.mkdirSync(loggingDir, { recursive: true });
}
// Function to format log entries with timestamp and timezone
const customFormat = winston_1.default.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});
const getTestCaseName = () => {
    // Get the filename of the current script
    const fileName = path_1.default.basename(__filename, path_1.default.extname(__filename));
    return fileName;
};
exports.getTestCaseName = getTestCaseName;
// Set the desired timezone
//const timeZone = "Europe/London"; // For the UK
// const timeZone = 'America/New_York'; // For the US
const timeZone = "Asia/Kolkata"; // For India
const logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: () => (0, moment_timezone_1.default)().tz(timeZone).format() }), customFormat),
    transports: [
        new winston_1.default.transports.Console({ level: "debug" }),
        new winston_1.default.transports.File({
            filename: path_1.default.join(loggingDir, "test_info.log"),
            maxFiles: 25, // Number of log files to retain
            maxsize: 300 * 1024, // 10 * 1024 ==10 KB, specify the size in bytes
            level: "info",
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join(loggingDir, "test_error.log"),
            maxFiles: 25, // Number of log files to retain
            maxsize: 30 * 1024, // 10 KB, specify the size in bytes
            level: "error",
        }),
    ],
});
exports.default = logger;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptEnvFile = encryptEnvFile;
exports.decryptEnvFile = decryptEnvFile;
exports.decrypt = decrypt;


const Encryptor = require("crypto-js");
const fs = require("fs");
const path = require("path");

// Change to 'config' folder
const configDir = path.resolve(__dirname, '../config');
let envFilePath = path.join(configDir, '.env');
if (process.env.NODE_ENV) {
    envFilePath = path.join(configDir, `.env.${process.env.NODE_ENV}`);
}
//console.log(envFilePath);

function encryptEnvFile() {
    const SALT = process.env.SALT || "defaultSALT";
    // Read the .env file
    const envFileContent = fs.readFileSync(envFilePath, "utf8");
    const envLines = envFileContent.split("\n");
    // Encrypt values and update the array
    const encryptedLines = envLines.map((line) => {
        const [key, value] = line.split("=");
        if (value) {
            const encryptedValue = Encryptor.AES.encrypt(value, SALT).toString();
            return `${key}=${encryptedValue}`;
        }
        return line;
    });
    // Join the lines and write back to the .env file
    const updatedEnvContent = encryptedLines.join("\n");
    fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");
    console.log("Encryption complete. Updated .env file.");
}
function decryptEnvFile() {
    const SALT = process.env.SALT || "defaultSALT";
    // Read the .env file
    const envFileContent = fs.readFileSync(envFilePath, "utf8");
    const envLines = envFileContent.split("\n");
    // Encrypt values and update the array
    const decryptedLines = envLines.map((line) => {
        const [key, value] = line.split("=");
        if (value) {
            const decryptedValue = Encryptor.AES.decrypt(value, SALT).toString(Encryptor.enc.Utf8);
            return `${key}=${decryptedValue}`;
        }
        return line;
    });
    // Join the lines and write back to the .env file
    const updatedEnvContent = decryptedLines.join("\n");
    fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");
    console.log("Decryption complete. Updated .env file.");
}
function decrypt(cipherText) {
    // Get the SALT from the system environment variable
    const SALT = process.env.SALT || "defaultSALT";
    const bytes = Encryptor.AES.decrypt(cipherText, SALT);
    const originalText = bytes.toString(Encryptor.enc.Utf8);
    return originalText;
}

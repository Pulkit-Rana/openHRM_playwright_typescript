import CryptoJS from 'crypto-js'
import fs from 'fs'
import path from 'path'

// Convert currentDir  and __filename to ESModule equivalent
const currentDir = __dirname

// Change to 'config' folder
const configDir = path.resolve(currentDir, '../config')
let envFilePath = path.join(configDir, '.env')
if (process.env.NODE_ENV) {
  envFilePath = path.join(configDir, `.env.${process.env.NODE_ENV}`)
}
//console.log(envFilePath);

export function encryptEnvFile() {
  const SALT = process.env.SALT || 'defaultSALT'
  // Read the .env file
  const envFileContent = fs.readFileSync(envFilePath, 'utf8')
  const envLines = envFileContent.split('\n')
  // Encrypt values and update the array
  const encryptedLines = envLines.map(line => {
    const [key, value] = line.split('=')
    if (value) {
      const encryptedValue = CryptoJS.AES.encrypt(value, SALT).toString()
      return `${key}=${encryptedValue}`
    }
    return line
  })
  // Join the lines and write back to the .env file
  const updatedEnvContent = encryptedLines.join('\n')
  fs.writeFileSync(envFilePath, updatedEnvContent, 'utf8')
  console.log('Encryption complete. Updated .env file.')
}

export function decryptEnvFile() {
  const SALT = process.env.SALT || 'defaultSALT'
  // Read the .env file
  const envFileContent = fs.readFileSync(envFilePath, 'utf8')
  const envLines = envFileContent.split('\n')
  // Decrypt values and update the array
  const decryptedLines = envLines.map(line => {
    const [key, value] = line.split('=')
    if (value) {
      const decryptedValue = CryptoJS.AES.decrypt(value, SALT).toString(CryptoJS.enc.Utf8)
      return `${key}=${decryptedValue}`
    }
    return line
  })
  // Join the lines and write back to the .env file
  const updatedEnvContent = decryptedLines.join('\n')
  fs.writeFileSync(envFilePath, updatedEnvContent, 'utf8')
  console.log('Decryption complete. Updated .env file.')
}

export function decrypt(cipherText: string | CryptoJS.lib.CipherParams) {
  // Get the SALT from the system environment variable
  const SALT = process.env.SALT || 'defaultSALT'
  const bytes = CryptoJS.AES.decrypt(cipherText, SALT)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  return originalText
}

import Encryptor from 'crypto-js'
import fs from 'fs'
import path from 'path'

// Change to 'config' folder
const configDir = path.resolve(__dirname, '../config')
let envFilePath = path.join(configDir, '.env')
if (process.env.NODE_ENV) {
  envFilePath = path.join(configDir, `.env.${process.env.NODE_ENV}`)
}

// Function to encrypt the .env file
export function encryptEnvFile(): void {
  const SALT = process.env.SALT || 'defaultSALT'
  // Read the .env file
  const envFileContent = fs.readFileSync(envFilePath, 'utf8')
  const envLines = envFileContent.split('\n')

  // Encrypt values and update the array
  const encryptedLines = envLines.map(line => {
    const [key, value] = line.split('=')

    if (value) {
      const encryptedValue = Encryptor.AES.encrypt(value, SALT).toString()
      return `${key}=${encryptedValue}`
    }

    return line
  })

  // Join the lines and write back to the .env file
  const updatedEnvContent = encryptedLines.join('\n')
  fs.writeFileSync(envFilePath, updatedEnvContent, 'utf8')

  console.log('Encryption complete. Updated .env file.')
}

// Function to decrypt the .env file
export function decryptEnvFile(): void {
  const SALT = process.env.SALT || 'defaultSALT'
  // Read the .env file
  const envFileContent = fs.readFileSync(envFilePath, 'utf8')
  const envLines = envFileContent.split('\n')

  // Decrypt values and update the array
  const decryptedLines = envLines.map(line => {
    const [key, value] = line.split('=')

    if (value) {
      const decryptedValue = Encryptor.AES.decrypt(value, SALT).toString(Encryptor.enc.Utf8)
      return `${key}=${decryptedValue}`
    }

    return line
  })

  // Join the lines and write back to the .env file
  const updatedEnvContent = decryptedLines.join('\n')
  fs.writeFileSync(envFilePath, updatedEnvContent, 'utf8')

  console.log('Decryption complete. Updated .env file.')
}

// Function to decrypt a given ciphertext
export function decrypt(cipherText: string): string {
  const SALT = process.env.SALT || 'defaultSALT'
  const bytes = Encryptor.AES.decrypt(cipherText, SALT)
  const originalText = bytes.toString(Encryptor.enc.Utf8)
  return originalText
}

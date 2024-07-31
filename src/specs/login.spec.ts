import { test, expect } from '@playwright/test'
import LoginPage from '../pageObject/LoginPage'
import { decrypt } from '../../Utils/encryptor'
import logger from '../../Utils/loggerUtil'

test('Login to OrangeHRM', async ({ page }) => {
  const loginPage = new LoginPage(page)

  // Perform login
  await loginPage.login(decrypt(process.env.userid!), decrypt(process.env.password!))
  logger.debug('This is faker in use $')
  logger.info('This is an info log message')
  logger.warn('This is a warning log message')
  logger.error('This is an error log message')

  // Add your assertions here
  // Example: Check if login was successful by checking for a certain element on the dashboard
  await expect(page).toHaveURL(/dashboard/)
})

test('console', async () => {
  console.log(process.env.NODE_ENV)
  console.log(process.env.userId)
  console.log(process.env.password)
})

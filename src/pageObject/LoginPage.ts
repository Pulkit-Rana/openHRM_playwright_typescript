import { Page } from '@playwright/test'
import logger from '../../Utils/loggerUtil'
import DashboardPage from './DashboardPage'

export default class LoginPage {
  readonly page: Page
  readonly usernameInput: string
  readonly passwordInput: string
  readonly loginButton: string

  constructor(page: Page) {
    this.page = page
    this.usernameInput = 'input[name="username"]'
    this.passwordInput = 'input[name="password"]'
    this.loginButton = 'button[type="submit"]'
  }

  async navigate() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    logger.info('Navigated to orangeHRM')
  }

  async login(username: string, password: string) {
    await this.navigate()
    await this.page.fill(this.usernameInput, username)
    await this.page.fill(this.passwordInput, password)
    return await this.clickLoginButton()
  }

  async clickLoginButton() {
    await this.page
      .click(this.loginButton)
      .catch(error => {
        logger.error(`Error clicking login button: ${error}`)
        throw error // rethrow the error if needed
      })
      .then(() => logger.info('Clicked login button'))

    const dashboardPage = new DashboardPage(this.page)
    return dashboardPage
  }
}

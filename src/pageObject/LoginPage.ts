import { Page } from '@playwright/test'
import logger from '../../Utils/loggerUtil'
import WorkSummaryPage from './WorkSummaryPage'

export default class LoginPage {
  readonly page: Page
  readonly usernameInput: string
  readonly passwordInput: string
  readonly loginButton: string

  constructor(page: Page) {
    this.page = page
    this.usernameInput = 'input[name="workEmail"]'
    this.passwordInput = 'input[name="password"]'
    this.loginButton = 'button[type="submit"]'
  }

  async navigate() {
    await this.page.goto('/')
  }

  async login(username: string, password: string) {
    await this.navigate()
    await this.page.fill(this.usernameInput, username)
    await this.page.fill(this.passwordInput, password)
    return await this.clickLoginButton()
  }

  async clickLoginButton() {
    await Promise.all([
      this.page.click(this.loginButton),
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
    ])
    .catch(error => {
      logger.error(`Error clicking login button: ${error}`);
      throw error; // rethrow the error if needed
    });

    logger.info('Logged In Successfully!');

    const workSummaryPage = new WorkSummaryPage(this.page);
    return workSummaryPage;
  }
}

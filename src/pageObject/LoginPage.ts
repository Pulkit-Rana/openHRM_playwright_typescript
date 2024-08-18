import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  public page: Page;  // Change private to public
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private banner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.banner = page.locator('.orangehrm-login-branding'); // Adjust this selector as needed
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async validateBanner(): Promise<void> {
    await expect(this.banner).toBeVisible();
    const bannerText = await this.banner.textContent();
    console.log('Banner text:', bannerText);
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObject/LoginPage';

test.describe('Login Page Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('User should be able to login and validate banner', async () => {
    // Validate the presence of the banner
    await loginPage.validateBanner();

    // Perform login
    await loginPage.login(process.env.userId!, process.env.password!); // Replace with valid credentials if necessary

    // Validate successful login
    await expect(loginPage.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'); // Adjust the URL as necessary
  });
});

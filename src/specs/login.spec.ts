import { test, expect } from '@playwright/test';
import LoginPage from '../pageObject/LoginPage';

test('Login to OrangeHRM', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Navigate to the login page
  await loginPage.navigate();

  // Perform login
  await loginPage.login(process.env.userid!, process.env.password!);

  // Add your assertions here
  // Example: Check if login was successful by checking for a certain element on the dashboard
  await expect(page).toHaveURL(/dashboard/);
});

test('console', async () => {
  console.log(process.env.NODE_ENV)
  console.log(process.env.userId)
  console.log(process.env.password)

})
import { test } from '@playwright/test';
import LoginPage from '../pageObject/LoginPage';
import WorkSummaryPage from '../pageObject/WorkSummaryPage';
import { decrypt } from '../../Utils/encryptor'

test.describe('Dashboard Page Tests', () => {
  test('should verify the dashboard page elements for user1', async ({ page }) => {
    // Assuming login credentials are stored in environment variables or config
    const loginPage = new LoginPage(page);
    const workSummaryPage = await loginPage.login(decrypt(process.env.userId!), decrypt(process.env.password!))
    await workSummaryPage.verifySideMenu();
    await workSummaryPage.verifyDashboardElements();
  });
});

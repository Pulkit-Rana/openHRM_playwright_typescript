import { test } from '@playwright/test';
import LoginPage from '../pageObject/LoginPage';
import CallManagementPage from '../pageObject/CallManagementPage';
import { decrypt } from '../../Utils/encryptor';

const data = require('../fixtures/callManagement.json');

test.describe('Call Management Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(decrypt(process.env.userId!), decrypt(process.env.password!))
  });

  test('should validate user can see the call management tab and call list', async ({ page }) => {
    const callManagementPage = new CallManagementPage(page);
    await callManagementPage.navigateToCallManagement();
    await callManagementPage.verifyCallManagementPage();
  });

  test('should create a new call and validate success message', async ({ page }) => {
    const callManagementPage = new CallManagementPage(page);
    await callManagementPage.navigateToCallManagement();
    await callManagementPage.addNewCall();
    await callManagementPage.verifyCallCreated();
  });

  test('should validate the call is visible in the call list', async ({ page }) => {
    const callManagementPage = new CallManagementPage(page);
    await callManagementPage.navigateToCallManagement();
    await callManagementPage.verifyCallInList(data.callId);
  });
});

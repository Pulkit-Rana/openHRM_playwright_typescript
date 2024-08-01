import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export default class CallManagementPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToCallManagement() {
    await this.page.getByRole('link', { name: 'Call Management' }).click();
    await this.page.waitForSelector('text=Call Management');
  }

  async verifyCallManagementPage() {
    await expect(this.page).toHaveURL(/.*call/);
    await expect(this.page.getByText('Call List')).toBeVisible();
  }

  async addNewCall() {
    await this.page.getByText('Add New Call').click();
    await this.page.waitForTimeout(5000);
    await this.page.waitForSelector('#addNewCall');
    await this.page.waitForSelector('#mat-dialog-0 div:has-text("Call Type")');
    await this.page.locator('#mat-dialog-0 div').filter({ hasText: 'Call Type' }).nth(2).click();
    await this.page.getByText('Inbound').click();
    await this.page.getByText('Select ServiceSelect Service').click();
    await this.page.getByText('Id: SR-VCare-451 | HCP: Wayne').click();
    await this.page.locator('.mat-checkbox-inner-container').click();
    await this.page.locator('#mat-dialog-0 div').filter({ hasText: 'Caller Type' }).nth(3).click();
    await this.page.getByRole('option', { name: 'Sales Rep' }).locator('span').click();
    await this.page.getByLabel('Select Recipient').click();
    await this.page.getByLabel('Select Recipient').fill('adasdasd');
    await this.page.locator('div:has-text("Number")').nth(2).click();
    await this.page.locator('div').filter({ hasText: /^Number$/ }).nth(2).fill('985654444122');
    await this.page.getByLabel('Call Purpose').click();
    await this.page.getByText('Adverse Event').click();
    await this.page.getByRole('option', { name: 'Coding and Billing' }).click();
    await this.page.getByLabel('Notes/Record').fill('QWERTY');
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForSelector('text=Your call has been created');
  }

  async verifyCallCreated() {
    await expect(this.page.getByText('Your call has been created')).toBeVisible();
  }

  async verifyCallInList(callId: string) {
    await expect(this.page.getByText(callId)).toBeVisible();
  }
}

import { Page, expect } from '@playwright/test';

export default class WorkSummaryPage {
  readonly page: Page
  readonly sideMenuItems: string
  readonly dashboardHeading:string

  constructor(page: Page) {
    this.page = page;
    this.sideMenuItems = '.m-menu__link-text.ng-star-inserted:not(ul.m-menu__subnav)';
    this.dashboardHeading = '.mat-expansion-panel-header-title h3'
  }

  async verifySideMenu() {
    await this.page.waitForSelector(this.sideMenuItems);
    const expectedMenuItems = [
      'Work Summary',
      'All Services',
      'Work Queues',
      'Call Management',
      'Enrolled Patients',
      'Healthcare Professionals',
      'Settings',
      'Reports'
    ];

    const sideMenuItems = await this.page.$$eval(this.sideMenuItems, items =>
      items.map(item => item.textContent?.trim() || '')
    );

    for (const item of expectedMenuItems) {
      expect(sideMenuItems).toContain(item);
    }
  }

  async verifyDashboardElements() {
    const expectedHeadings = [
      'HCP Messages',
      'Pending Enrollments',
      'HCP Follow up - Enrollment Missing Info',
      'PA Follow Up - HCP',
      'PA Follow Up - Payer',
      'EOB Follow Up - HCP',
      'Reminder'
    ];

    const dashboardHeading = await this.page.$$eval(this.dashboardHeading, items =>
      items.map(item => item.textContent?.trim() || '')
    );

    for (const item of expectedHeadings) {
      expect(dashboardHeading).toContain(item);
    }
  }
}

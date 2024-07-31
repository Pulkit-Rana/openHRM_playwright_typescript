import { Page } from "@playwright/test"

export default class DashboardPage {
    readonly page: Page;
    readonly serviceTitleLocator: string;
    readonly contactsLinkLocator: string;

    constructor(page: Page) {
        this.page = page;
        this.serviceTitleLocator = "Service";
        this.contactsLinkLocator = "Contacts";

    }
}
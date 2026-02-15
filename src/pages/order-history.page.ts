import { Page, Locator, expect } from '@playwright/test';

export class OrderHistoryPage {
  readonly invoiceRows: Locator;

  constructor(private page: Page) {
    this.invoiceRows = page.locator('[data-test="invoice-row"]');
  }

  async open() {
    await this.page.goto('/account/invoices');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/account\/invoices/);
  }
}

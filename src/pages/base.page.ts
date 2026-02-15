import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  // ----------------------------
  // Navigation
  // ----------------------------

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
    await this.waitForPageReady();
  }

  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  // ----------------------------
  // Stable interaction helpers
  // ----------------------------

  protected async click(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.click();
  }

  protected async fill(locator: Locator, value: string): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.fill(value);
  }

  protected async type(locator: Locator, value: string): Promise<void> {
    await expect(locator).toBeVisible();
    await locator.clear();
    await locator.type(value);
  }

  // ----------------------------
  // Assertions (commonly reused)
  // ----------------------------

  async expectUrlContains(value: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(value));
  }

  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}

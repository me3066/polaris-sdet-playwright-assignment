import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ShopPage extends BasePage {
  readonly products: Locator;

  private readonly searchInput: Locator;
  private readonly ecoFriendlyFilter: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);

    this.products = page.locator('a[data-test^="product-"]');

    this.searchInput = page.getByTestId('search-query');
    this.ecoFriendlyFilter = page.getByTestId('eco-friendly-filter');
    this.sortDropdown = page.getByTestId('sort');
  }

  async open(): Promise<void> {
    await this.goto('/');
  }

  async openFirstProduct(): Promise<void> {
    // ensure product list is ready
    await this.products.first().waitFor({ state: 'visible' });
    await this.products.first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async filterEcoFriendly(): Promise<void> {
    await this.ecoFriendlyFilter.check();
  }

  async clearEcoFriendlyFilter(): Promise<void> {
    await this.ecoFriendlyFilter.uncheck();
  }

  async getVisiblePrices(): Promise<string[]> {
  return await this.page.getByTestId('product-price').allTextContents();
}

  async sortBy(value: string): Promise<void> {
    await this.sortDropdown.selectOption(value);
    // wait for DOM update after sorting
    await this.page.waitForLoadState('networkidle');
    await this.products.first().waitFor({ state: 'visible' });
  }

  async getVisibleProductNames(): Promise<string[]> {
    return await this.products.allTextContents();
  }
  
  async waitForProducts(): Promise<void> {
    await this.products.first().waitFor({ state: 'visible' });
  }
}

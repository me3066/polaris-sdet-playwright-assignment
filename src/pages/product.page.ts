import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {

  readonly name: Locator;
  readonly price: Locator;
  private readonly addToCartBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.name = page.getByTestId('product-name');
    this.price = page.getByTestId('unit-price');

    this.addToCartBtn = page.getByTestId('add-to-cart');
  }

  async addToCart(): Promise<void> {
    await this.click(this.addToCartBtn);
  }

  async expectLoaded(): Promise<void> {
    await this.expectVisible(this.name);
  }
}

import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class HeaderComponent extends BasePage {
  private readonly cartButton: Locator;
  private readonly cartQuantity: Locator;
  private readonly myOrdersLink: Locator;

  constructor(page: Page) {
    super(page);

    this.cartButton = page.getByTestId('nav-cart');
    this.cartQuantity = page.locator('[data-test="cart-quantity"]');
    this.myOrdersLink = page.getByTestId('nav-my-orders');
  }

  // ----------------------------
  // Navigation
  // ----------------------------

  async openCart(): Promise<void> {
    await this.click(this.cartButton);
  }

  async openMyOrders(): Promise<void> {
    await this.click(this.myOrdersLink);
  }

  async expectMyOrdersVisible(): Promise<void> {
    await this.expectVisible(this.myOrdersLink);
  }

  // ----------------------------
  // Cart helpers
  // ----------------------------

  async getCartQuantity(): Promise<number> {
    const text = (await this.cartQuantity.textContent())?.trim() ?? '0';
    return Number(text);
  }
}

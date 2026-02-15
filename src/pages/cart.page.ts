import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { parsePrice } from '../../utils/price.util';

export class CartPage extends BasePage {
  private readonly proceedBtn: Locator;
  private readonly total: Locator;

  private readonly quantityInput: Locator;
  private readonly removeBtn: Locator;
  private readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.proceedBtn = page.getByTestId('proceed-1');
    this.total = page.getByTestId('cart-total');

    this.quantityInput = page.getByTestId('product-quantity');
    this.removeBtn = page.locator('tbody tr').first().locator('a.btn-danger');
    this.emptyCartMessage = page.getByText(/cart is empty/i);
  }

  async open() {
    await this.goto('/checkout');
  }

  async proceedToCheckout() {
    await this.click(this.proceedBtn);
  }

  async updateQuantity(value: string) {
    await this.expectVisible(this.quantityInput);
    await this.quantityInput.fill(value);
    await this.quantityInput.press('Tab');
  }

  async waitForTotalToChange(previousTotal: number): Promise<void> {
    await expect
      .poll(async () => parsePrice(await this.getTotal()))
      .not.toBe(previousTotal);
  }

  async removeItem() {
    await this.click(this.removeBtn);
  }

  async isCartEmpty() {
    await this.expectVisible(this.emptyCartMessage);
  }

  async getTotal(): Promise<string> {
    await this.expectVisible(this.total);
    return (await this.total.textContent())?.trim() ?? '';
  }
}

import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {

  private readonly guestEmail: Locator;
  private readonly guestFirstName: Locator;
  private readonly guestLastName: Locator;
  private readonly guestSubmit: Locator;
  private readonly guestTab: Locator;

  private readonly proceedToBilling: Locator;
  private readonly proceedToPaymentBtn: Locator;

  private readonly street: Locator;
  private readonly city: Locator;
  private readonly state: Locator;
  private readonly country: Locator;
  private readonly postalCode: Locator;

  constructor(page: Page) {
    super(page);

    this.guestEmail = page.getByTestId('guest-email');
    this.guestFirstName = page.getByTestId('guest-first-name');
    this.guestLastName = page.getByTestId('guest-last-name');
    this.guestSubmit = page.getByTestId('guest-submit');
    this.guestTab = page.locator('a[href="#guest-tab"]');

    this.proceedToBilling =
      page.getByRole('button', { name: /proceed to checkout/i });

    this.street = page.getByTestId('street');
    this.city = page.getByTestId('city');
    this.state = page.getByTestId('state');
    this.country = page.getByTestId('country');
    this.postalCode = page.getByTestId('postal_code');

    this.proceedToPaymentBtn = page.getByTestId('proceed-3');
  }

  async continueAsGuest(email: string, first: string, last: string) {
    if (!(await this.guestEmail.isVisible())) {
      await this.click(this.guestTab);
    }

    await this.fill(this.guestEmail, email);
    await this.fill(this.guestFirstName, first);
    await this.fill(this.guestLastName, last);

    await this.click(this.guestSubmit);
    await this.click(this.proceedToBilling);
  }

  async fillBillingAddress() {
    await this.expectVisible(this.street);

    await this.fill(this.street, '1 Test Street');
    await this.fill(this.city, 'London');
    await this.fill(this.state, 'London');
    await this.fill(this.country, 'UK');
    await this.fill(this.postalCode, 'SW1A1AA');
  }

  async proceedToPayment() {
    await this.click(this.proceedToPaymentBtn);
  }

  async expectPaymentStep() {
    await expect(
      this.page.getByRole('heading', { name: 'Payment' })
    ).toBeVisible();
  }
}

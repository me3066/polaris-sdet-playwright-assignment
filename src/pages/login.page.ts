import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly submit: Locator;
  private readonly loginError: Locator;

  constructor(page: Page) {
    super(page);

    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.submit = page.getByTestId('login-submit');
    this.loginError = page.getByText('Invalid email or password');
  }

  async open() {
    await this.goto('/auth/login');
    await expect(this.email).toBeVisible();
  }

  async loginAs(email: string, password: string) {
    await this.fill(this.email, email);
    await this.fill(this.password, password);
    await this.click(this.submit);
  }

  async expectInvalidCredentialsError() {
    await this.expectVisible(this.loginError);
  }
}

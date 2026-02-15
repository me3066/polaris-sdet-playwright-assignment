import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';

test('User can login with valid credentials', async ({ page }) => {
  const login = new LoginPage(page);

  await login.open();
  await login.loginAs(
    process.env.TEST_EMAIL!,
    process.env.TEST_PASSWORD!
  );

  await expect(page).toHaveURL(/account/);
});

test('User sees error with invalid credentials', async ({ page }) => {
  const login = new LoginPage(page);

  await login.open();
  await login.loginAs('wrong@email.com', 'wrongpass');
  await login.expectInvalidCredentialsError();
});

test('User session persists after navigation', async ({ page }) => {
  const login = new LoginPage(page);

  await login.open();
  await login.loginAs(
    process.env.TEST_EMAIL!,
    process.env.TEST_PASSWORD!
  );

  // navigate away
  await page.goto('/');

  // verify session still valid
  await page.goto('/account/invoices');
  await expect(page).toHaveURL(/account\/invoices/);
});

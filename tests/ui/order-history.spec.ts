import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { OrderHistoryPage } from '../../src/pages/order-history.page';

test('User can view order history page', async ({ page }) => {
  const login = new LoginPage(page);
  const orderHistory = new OrderHistoryPage(page);

  await login.open();
  await login.loginAs(
    process.env.TEST_EMAIL!,
    process.env.TEST_PASSWORD!
  );

  await page.waitForURL(/account/);
  await page.waitForLoadState('networkidle');
  await orderHistory.open();
  await orderHistory.expectLoaded();
});

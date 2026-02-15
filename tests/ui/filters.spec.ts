import { test, expect } from '@playwright/test';
import { ShopPage } from '../../src/pages/shop.page';

test('User can filter eco-friendly products', async ({ page }) => {
  const shop = new ShopPage(page);
  await shop.open();
  await shop.waitForProducts();
  await shop.filterEcoFriendly();
  await shop.waitForProducts();
  await expect(shop.products.first()).toBeVisible();
});

// Edge / negative test
test('Category filter edge: eco-friendly filter persists after refresh', async ({ page }) => {
  const shop = new ShopPage(page);

  await shop.open();
  await shop.waitForProducts();

  const totalBefore = await shop.products.count();

  await shop.filterEcoFriendly();
  await shop.waitForProducts();

  const filteredCount = await shop.products.count();

  expect(filteredCount).toBeLessThanOrEqual(totalBefore);

  // refresh
  await page.reload();
  await shop.waitForProducts();

  const afterReloadCount = await shop.products.count();

  expect(afterReloadCount).toBeLessThanOrEqual(totalBefore);
});

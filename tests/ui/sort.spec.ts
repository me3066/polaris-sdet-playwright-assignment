import { test, expect } from '@playwright/test';
import { ShopPage } from '../../src/pages/shop.page';

test('User can sort products', async ({ page }) => {
  const shop = new ShopPage(page);
  await shop.open();
  await shop.sortBy('name,asc');
  await expect(shop.products.first()).toBeVisible();
});

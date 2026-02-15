import { test, expect } from '@playwright/test';
import { ShopPage } from '../../src/pages/shop.page';

test('User can search for products by name', async ({ page }) => {
  const shop = new ShopPage(page);

  await shop.open();
  await shop.waitForProducts();
  await shop.search('hammer');
  await shop.waitForProducts();

  const names = await shop.getVisibleProductNames();
  const lower = names.map(n => n.toLowerCase());

  expect(lower.some(n => n.includes('hammer'))).toBeTruthy();
});

test('Search shows no matching products', async ({ page }) => {
  const shop = new ShopPage(page);

  await shop.open();
  await shop.waitForProducts();
  await shop.search('THIS_PRODUCT_DOES_NOT_EXIST_12345');
  await expect(shop.products).toHaveCount(0);
});

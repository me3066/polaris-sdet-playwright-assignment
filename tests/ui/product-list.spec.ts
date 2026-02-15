import { test, expect } from '@playwright/test';
import { ShopPage } from '../../src/pages/shop.page';

test('User can view product list', async ({ page }) => {
  const shop = new ShopPage(page);
  await shop.open();
  //  stability wait (render complete)
  await expect(shop.products.first()).toBeVisible();
  const productCount = await shop.products.count();
  expect(productCount).toBeGreaterThan(0);
});

test('Product list edge: navigating to invalid product URL does not show product details', async ({ page }) => {
  const shop = new ShopPage(page);
  await shop.open();

  // Try an obviously invalid product route (edge case)
  await page.goto('/product/this-product-does-not-exist');

  // Expect we are NOT on a product detail with an Add to Cart button visible
  await expect(page.getByTestId('add-to-cart')).toHaveCount(0);

  // Go back to shop and ensure products are visible
  await shop.open();
  await expect(shop.products.first()).toBeVisible();
});
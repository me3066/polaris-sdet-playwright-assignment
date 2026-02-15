import { test, expect } from '@playwright/test';
import { ShopPage } from '../../src/pages/shop.page';
import { ProductPage } from '../../src/pages/product.page';

test('User can open product details', async ({ page }) => {
  const shop = new ShopPage(page);
  const product = new ProductPage(page);
  await shop.open();
  const firstProduct = shop.products.first();
  const nameBeforeClick = await firstProduct
    .getByTestId('product-name')
    .textContent();

  await Promise.all([
    page.waitForURL(/product/),
    firstProduct.click()
  ]);

  await expect(product.name).toHaveText(nameBeforeClick!.trim());
  await expect(product.price).toBeVisible();
});

test('Product details negative: required fields are present (name + price)', async ({ page }) => {
  const shop = new ShopPage(page);
  const product = new ProductPage(page);

  await shop.open();
  await shop.openFirstProduct();

  await product.expectLoaded();

  // Required fields must not be empty
  await expect(product.name).not.toHaveText('');
  await expect(product.price).not.toHaveText('');
});

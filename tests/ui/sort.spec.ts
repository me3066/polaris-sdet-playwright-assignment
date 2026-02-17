import { test, expect } from '@playwright/test';
import { ShopPage } from '../../src/pages/shop.page';
import { parsePrice } from '../../utils/price.util';

test('User can sort products by price ascending', async ({ page }) => {
  const shop = new ShopPage(page);

  await shop.open();
  await shop.sortBy('price,asc');

  const prices = await shop.getVisiblePrices();
  const numericPrices = prices.map(parsePrice);
  const sorted = [...numericPrices].sort((a, b) => a - b);
  expect(numericPrices).toEqual(sorted);
});

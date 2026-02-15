import { test, expect } from '@playwright/test';
import { ShopPage } from '../../src/pages/shop.page';
import { CartPage } from '../../src/pages/cart.page';
import { HeaderComponent } from '../../src/pages/components/header.component';
import { ProductPage } from '../../src/pages/product.page';
import { parsePrice } from '../../utils/price.util';

test.describe('Cart', () => {

  test('User can add product to cart', async ({ page }) => {
    const shop = new ShopPage(page);
    const cart = new CartPage(page);
    const header = new HeaderComponent(page);
    const product = new ProductPage(page);

    await shop.open();
    await shop.openFirstProduct();
    await product.addToCart();
    await header.openCart();

    const total = await cart.getTotal();
    expect(parsePrice(total)).toBeGreaterThan(0);
  });

  test('User can update quantity in cart', async ({ page }) => {
    const shop = new ShopPage(page);
    const cart = new CartPage(page);
    const header = new HeaderComponent(page);
    const product = new ProductPage(page);

    await shop.open();
    await shop.openFirstProduct();
    await product.addToCart();

    await header.openCart();
    const totalBefore = parsePrice(await cart.getTotal());
    await cart.updateQuantity('2');
    await cart.waitForTotalToChange(totalBefore);

    const totalAfter = parsePrice(await cart.getTotal());

    expect(totalAfter).toBeGreaterThanOrEqual(totalBefore);
  });

  test('User can remove product from cart', async ({ page }) => {
    const shop = new ShopPage(page);
    const cart = new CartPage(page);
    const header = new HeaderComponent(page);
    const product = new ProductPage(page);

    await shop.open();
    await shop.openFirstProduct();
    await product.addToCart();

    await header.openCart();
    await cart.removeItem();

    await cart.isCartEmpty();
  });

});

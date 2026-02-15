import { test, expect } from '@playwright/test';
import { ShopPage } from '../../src/pages/shop.page';
import { CheckoutPage } from '../../src/pages/checkout.page';
import { HeaderComponent } from '../../src/pages/components/header.component';
import { CartPage } from '../../src/pages/cart.page';
import { ProductPage } from '../../src/pages/product.page';

test('User can complete checkout', async ({ page }) => {
  const shop = new ShopPage(page);
  const checkout = new CheckoutPage(page);
  const header = new HeaderComponent(page);
  const cart = new CartPage(page);
  const product = new ProductPage(page);

  await shop.open();

  await shop.openFirstProduct();
  await product.addToCart();

  await header.openCart();
  await cart.proceedToCheckout();

  await checkout.continueAsGuest(
    'test@test.com',
    'Test',
    'User'
  );

  await checkout.fillBillingAddress();
  await checkout.proceedToPayment();
  await checkout.expectPaymentStep();
});

test('User cannot continue checkout with empty billing address', async ({ page }) => {
  const shop = new ShopPage(page);
  const checkout = new CheckoutPage(page);

  await shop.open();
  await shop.openFirstProduct();
  await page.getByTestId('add-to-cart').click();
  await page.getByTestId('nav-cart').click();
  await page.getByTestId('proceed-1').click();
  await checkout.continueAsGuest('test@test.com', 'Test', 'User');
  await expect(page.getByTestId('proceed-3')).toBeDisabled();
});
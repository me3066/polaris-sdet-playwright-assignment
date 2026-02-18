import { test, expect } from '@playwright/test';

test('API returns products sorted by price asc', async ({ request }) => {

  // Call the REAL API endpoint
  const response = await request.get(
    'https://api.practicesoftwaretesting.com/products?sort=price,asc'
  );

  // Basic response validation
  expect(response.ok()).toBeTruthy();

  // ---- DEBUG (very useful while developing) ----
  const contentType = response.headers()['content-type'];
  console.log('Content-Type:', contentType);

  // If API ever returns HTML, print it to debug quickly
  if (!contentType?.includes('application/json')) {
    const text = await response.text();
    console.log('Response was not JSON:\n', text);
  }

  // Ensure we got JSON before parsing
  expect(contentType).toContain('application/json');

  // Parse response body
  const body = await response.json();

  // Validate structure
  expect(Array.isArray(body.data)).toBeTruthy();

  // Extract prices
  const prices = body.data.map((p: any) => p.price);

  // Create correctly sorted copy
  const sorted = [...prices].sort((a, b) => a - b);

  // Validate API sorting behaviour
  expect(prices).toEqual(sorted);
});

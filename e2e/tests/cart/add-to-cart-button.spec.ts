import { test, expect } from '@playwright/test';

test.describe('Add to Cart Button', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a product page before each test
    await page.goto('/products/1'); // Adjust the URL based on your routing
  });

  test('should display "Add to cart" button when product is not in cart', async ({ page }) => {
    // Clear cart before test
    await page.evaluate(() => {
      localStorage.setItem('cart', JSON.stringify([]));
    });

    // Reload page to reflect cart changes
    await page.reload();

    const addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    await expect(addToCartButton).toBeVisible();
  });

  test('should display "Voir le panier" button when product is in cart', async ({ page }) => {
    // Add product to cart
    await page.evaluate(() => {
      localStorage.setItem('cart', JSON.stringify([{
        id: '1',
        quantity: 1
      }]));
    });

    // Reload page to reflect cart changes
    await page.reload();

    const viewCartButton = page.getByRole('button', { name: 'Voir le panier' });
    await expect(viewCartButton).toBeVisible();
  });

  test('should show loading state when adding to cart', async ({ page }) => {
    // Clear cart before test
    await page.evaluate(() => {
      localStorage.setItem('cart', JSON.stringify([]));
    });

    // Reload page to reflect cart changes
    await page.reload();

    const addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    await addToCartButton.click();

    // Check if loader is visible
    const loader = page.locator('.custom-loader');
    await expect(loader).toBeVisible();

    // Wait for loading to complete
    await expect(loader).toBeHidden();
  });

  test('should show success toast when adding to cart', async ({ page }) => {
    // Clear cart before test
    await page.evaluate(() => {
      localStorage.setItem('cart', JSON.stringify([]));
    });

    // Reload page to reflect cart changes
    await page.reload();

    const addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    await addToCartButton.click();

    // Check for success toast
    const successToast = page.getByText('Product added to cart');
    await expect(successToast).toBeVisible();
  });

  test('should navigate to cart page when clicking "Voir le panier"', async ({ page }) => {
    // Add product to cart
    await page.evaluate(() => {
      localStorage.setItem('cart', JSON.stringify([{
        id: '1',
        quantity: 1
      }]));
    });

    // Reload page to reflect cart changes
    await page.reload();

    const viewCartButton = page.getByRole('button', { name: 'Voir le panier' });
    await viewCartButton.click();

    // Check if we're on the cart page
    await expect(page).toHaveURL('/cart');
  });
});

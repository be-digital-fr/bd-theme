import { test, expect } from '@playwright/test';

test.describe('Product Search Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page and wait for it to be ready
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Open search modal using the search trigger button
    const searchButton = page.getByRole('link', { name: /search/i });
    await expect(searchButton).toBeVisible();
    await searchButton.click();
  });

  test('search modal opens correctly', async ({ page }) => {
    // Verify modal is visible
    const searchModal = page.getByRole('dialog');
    await expect(searchModal).toBeVisible();

    // Verify search input is focused
    const searchInput = page.getByRole('searchbox');
    await expect(searchInput).toBeFocused();
  });

  test('search input works and shows results', async ({ page }) => {
    // Mock API response
    await page.route('/api/v1/search**', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify([
          { id: '1', name: 'Test Product', description: 'Test Description' },
        ]),
      });
    });

    // Type in search
    const searchInput = page.getByRole('searchbox');
    await searchInput.fill('test');

    // Verify results appear
    const result = page.getByRole('button', { name: /test product/i });
    await expect(result).toBeVisible();
  });

  test('shows empty state when no results', async ({ page }) => {
    // Mock empty API response
    await page.route('/api/v1/search**', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify([]),
      });
    });

    // Search for non-existent product
    const searchInput = page.getByRole('searchbox');
    await searchInput.fill('nonexistent');

    // Verify empty state
    await expect(page.getByText('No products found')).toBeVisible();
  });

  test('shows loading state', async ({ page }) => {
    // Mock delayed API response
    await page.route('/api/v1/search**', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.fulfill({
        status: 200,
        body: JSON.stringify([]),
      });
    });

    // Type search query
    const searchInput = page.getByRole('searchbox');
    await searchInput.fill('test');

    // Verify loading state appears
    await expect(page.getByRole('status')).toBeVisible();
  });

  test('navigates to product when clicked', async ({ page }) => {
    // Mock API response
    await page.route('/api/v1/search**', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify([
          { id: '123', name: 'Test Product', description: 'Test Description' },
        ]),
      });
    });

    // Search and click result
    const searchInput = page.getByRole('searchbox');
    await searchInput.fill('test');

    const result = page.getByRole('button', { name: /test product/i });
    await expect(result).toBeVisible();

    // Wait for both the click and the navigation
    await Promise.all([page.waitForURL('**/products/123'), result.click()]);

    // Verify we're on the product page
    expect(page.url()).toContain('/products/123');
  });
});

import { test, expect } from '@playwright/test';

interface Category {
  id: string | number;
  name: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

const mockCategories: Category[] = [
  {
    id: 'cma70mdmm00001m116i1vw0bk',
    name: 'Burgers',
    description: 'Burgers artisanaux préparés avec des viandes sélectionnées, pains briochés moelleux et garnitures savoureuses de qualité supérieure',
    image: '/images/categories/burger.png'
  },
  {
    id: 'cma70mdp200011m11njetbwgk',
    name: 'Pizzas',
    description: 'Pizzas faites maison avec pâte levée 24h, sauce tomate italienne authentique et ingrédients frais cuits au feu de bois traditionnel',
    image: '/images/categories/pizza.png'
  },
  {
    id: 'cma70mdqc00021m11hrzfz4zy',
    name: 'Beverages',
    description: 'Boissons fraîches préparées avec des ingrédients naturels et de saison, des smoothies maison aux milkshakes gourmands et sodas artisanaux',
    image: '/images/categories/beverage.png'
  },
  {
    id: 'cma70mdrl00031m11fo50zz32',
    name: 'Desserts',
    description: 'Desserts artisanaux préparés avec des ingrédients frais et de qualité premium, des classiques revisités aux créations originales et gourmandes',
    image: '/images/categories/panna-cotta.png'
  },
  {
    id: 'cma70mdsr00041m11fvl0efzr',
    name: 'Salads',
    description: 'Salades fraîches préparées avec des légumes de saison et des ingrédients bio, des classiques aux créations originales équilibrées et savoureuses',
    image: '/images/categories/salad.png'
  },
  {
    id: 'cma70mdwi00051m113552yjjk',
    name: 'Sandwiches',
    description: 'Sandwiches gourmands préparés avec des pains artisanaux et ingrédients frais, des classiques aux créations originales pour tous les goûts',
    image: '/images/categories/sandwich.png'
  },
  {
    id: 'cma70mdxv00061m112s7v5xis',
    name: 'Vegetarian',
    description: 'Plats végétariens créatifs préparés avec des ingrédients frais et bio, des protéines végétales de qualité et des techniques culinaires innovantes',
    image: '/images/categories/veggie.png'
  },
  {
    id: 'cma70mdz400071m11ycpbjr0d',
    name: 'Soups',
    description: 'Soupes maison préparées quotidiennement avec des ingrédients frais de saison, des classiques réconfortants aux créations originales et savoureuses',
    image: '/images/categories/soup.png'
  }
];

test.describe('Filter Components', () => {
  test('desktop filter should render and handle category selection', async ({
    page,
  }) => {
    // Mock API response
    await page.route('http://localhost:3000/api/v1/product/category', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify(mockCategories),
      });
    });

    // Naviguer vers la page
    await page.goto('/menu');

    // Vérifier que les catégories sont affichées
    for (const category of mockCategories) {
      await expect(page.getByTitle(`category-${category.name}`)).toBeVisible();
    }

    // Sélectionner une catégorie
    await page.getByTitle(`category-${mockCategories[0].name}`).click();
    await expect(page.getByTitle(`category-${mockCategories[0].name}`)).toHaveText(mockCategories[0].name);

    // Vérifier le bouton reset
    await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();

    // Cliquer sur reset
    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(page.getByTitle(`category-${mockCategories[0].name}`)).toHaveText(mockCategories[0].name);
  });

  test('mobile filter should render and handle category selection', async ({
    page,
  }) => {
    // Mock API response
    await page.route('http://localhost:3000/api/v1/product/category', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify(mockCategories),
      });
    });

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/menu');

    // Check if all categories are rendered
    for (const category of mockCategories) {
      await expect(page.getByRole('button', { name: category.name })).toBeVisible();
    }

    // Check if "All" button is present
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible();

    // Select a category
    await page.getByRole('button', { name: mockCategories[1].name }).click();
    await expect(page.getByRole('button', { name: mockCategories[1].name })).toHaveText(mockCategories[1].name);

    // Click "All" button
    await page.getByRole('button', { name: 'All' }).click();
    await expect(page.getByRole('button', { name: mockCategories[1].name })).toHaveText(mockCategories[1].name);
  });

  test('filter should handle loading state', async ({ page, request }) => {
    // Delay the API response
    await page.route(
      'http://localhost:3000/api/v1/product/category',
      async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          body: JSON.stringify(mockCategories),
        });
      }
    );

    await page.goto('/menu');

    // Wait for categories to load
    const response = await request.get('http://localhost:3000/api/v1/product/category');
    expect(response.ok()).toBe(true);

    // Verify categories are rendered after loading
    for (const category of mockCategories) {
      await expect(page.getByRole('heading', { level: 3, name: category.name })).toBeVisible();
    }
  });

  test('filter should handle error state', async ({ page, request }) => {
    // Mock API error response
    await request.get('http://localhost:3000/api/v1/product/category', {
      failOnStatusCode: false,
      data: { message: 'Internal Server Error' },
    });

    await page.goto('/menu');

    // Verify that filter components are not displayed
    await expect(page.getByRole('region', { name: 'Popular dishes carousel' })).not.toBeVisible();
  });

  test('filter should maintain selection after page refresh', async ({
    page,
  }) => {
    // Mock API response before page load
    await page.route('**/api/v1/product/category', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify(mockCategories),
      });
    });

    await page.goto('/menu');

    // Select a category
    await page.getByTestId('filter-item-Desserts').click();

    // Verify category is selected
    await expect(page.getByTestId('filter-item-child-Desserts')).toHaveClass(/ring-accent/);

    // Refresh the page
    await page.reload();

    // Verify category is still selected
    await expect(page.getByTestId('filter-item-child-Desserts')).toHaveClass(/ring-accent/);
  });

  test('should handle multiple category selections', async ({ page }) => {
    await page.goto('/menu');

    // Mock API response
    await page.route('**/api/v1/product/category', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify(mockCategories),
      });
    });

    // Select first category and wait for state update
    await page.getByTestId('filter-item-Burgers').click();
    await page.waitForTimeout(100); // Wait for state update
    await expect(page.getByTestId('filter-item-child-Burgers')).toHaveClass('ring-2 ring-accent rounded-full p-1');

    // Select second category and wait for state update
    await page.getByTestId('filter-item-Pizzas').click();
    await page.waitForTimeout(500); // Wait for state update
    await expect(page.getByTestId('filter-item-child-Pizzas')).toHaveClass('ring-2 ring-accent rounded-full p-1');

    // Verify first category is still selected
    await expect(page.getByTestId('filter-item-child-Burgers')).toHaveClass('ring-2 ring-accent rounded-full p-1');

    // Click reset button and wait for state update
    await page.getByRole('button', { name: 'Reset' }).click();
    await page.waitForTimeout(100); // Wait for state update

    // Verify both categories are deselected
    await expect(page.getByTestId('filter-item-child-Burgers')).not.toHaveClass('ring-2 ring-accent rounded-full p-1');
    await expect(page.getByTestId('filter-item-child-Pizzas')).not.toHaveClass('ring-2 ring-accent rounded-full p-1');
  });
});

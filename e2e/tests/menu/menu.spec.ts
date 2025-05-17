import { test, expect } from '@playwright/test';

const mockCategories = [
  {
    id: 1,
    name: 'Burgers',
    description:
      'Burgers artisanaux préparés avec des viandes sélectionnées, pains briochés moelleux et garnitures savoureuses de qualité supérieure',
    image: '/images/categories/burger.png',
  },
  {
    id: 2,
    name: 'Pizzas',
    description:
      'Pizzas faites maison avec pâte levée 24h, sauce tomate italienne authentique et ingrédients frais cuits au feu de bois traditionnel',
    image: '/images/categories/pizza.png',
  },
  {
    id: 3,
    name: 'Beverages',
    description:
      'Boissons fraîches préparées avec des ingrédients naturels et de saison, des smoothies maison aux milkshakes gourmands et sodas artisanaux',
    image: '/images/categories/beverage.png',
  },
];

const mockProducts = {
  burgers: [
    {
      id: 1,
      name: 'Classic Burger',
      description:
        'Notre burger signature avec steak haché frais, salade, tomate et sauce maison',
      price: 8.99,
      calories: 650,
      preparationTime: 12,
      image: '/images/products/classic-burger.png',
      reviews: [],
    },
    {
      id: 2,
      name: 'Cheese Burger Deluxe',
      description:
        'Burger avec double fromage fondu, oignons caramélisés et sauce spéciale',
      price: 10.99,
      calories: 850,
      preparationTime: 15,
      image: '/images/products/cheese-burger-deluxe.png',
      reviews: [],
    },
  ],
  pizzas: [
    {
      id: 3,
      name: 'Margherita',
      description: 'Sauce tomate, mozzarella, basilic frais',
      price: 11.99,
      calories: 800,
      preparationTime: 15,
      image: '/images/products/margherita.png',
      reviews: [],
    },
    {
      id: 4,
      name: 'Végétarienne',
      description:
        'Sauce tomate, mozzarella, champignons, poivrons, oignons, olives',
      price: 13.99,
      calories: 750,
      preparationTime: 15,
      image: '/images/products/vegetarian-pizza.png',
      reviews: [],
    },
  ],
  beverages: [
    {
      id: 5,
      name: 'Coca-Cola',
      description: 'Soda rafraîchissant',
      price: 2.99,
      calories: 140,
      preparationTime: 1,
      image: '/images/products/coca-cola.png',
      reviews: [],
    },
    {
      id: 6,
      name: 'Limonade Maison',
      description: 'Limonade fraîche avec menthe',
      price: 3.99,
      calories: 120,
      preparationTime: 2,
      image: '/images/products/limonade-maison.png',
      reviews: [],
    },
  ],
};

test.describe('Menu Page', () => {
  test.beforeEach(async ({ page }) => {
    // Intercepter les requêtes API

    // Naviguer vers la page menu
    await page.goto('/menu');
  });

  test('should display all sections correctly', async ({ page, request }) => {
    // réponse de la requête API /product
    const productsResponse = await request.get(
      'http://localhost:3000/api/v1/product'
    );
    const productsData = await productsResponse.json();

    const categoriesResponse = await request.get(
      'http://localhost:3000/api/v1/product/category'
    );
    const categories = await categoriesResponse.json();

    // Vérifier le titre principal
    await expect(
      page.getByRole('heading', { name: 'Our menu', level: 1 })
    ).toBeVisible();

    // Vérifier les catégories
    for (const category of categories) {
      await expect(page.getByText(category.name)).toBeVisible();
    }

    // Vérifier les produits
    const products = productsData.data;
    for (const product of products) {
      await expect(page.getByText(product.name)).toBeVisible();
      await expect(
        page.getByTestId(`product-price-${product.name}`)
      ).toHaveText(`${product.price} €`);
    }
  });

  test('should filter products by category', async ({ page, request }) => {
    // Cliquer sur la catégorie Burgers
    await page.getByText('Burgers').click();

    // Vérifier que seuls les produits de la catégorie Burgers sont affichés
    for (const product of mockProducts.burgers) {
      await expect(page.getByText(product.name)).toBeVisible();
    }
    for (const product of mockProducts.pizzas) {
      await expect(page.getByText(product.name)).not.toBeVisible();
    }

    // Vérifier que le bouton de réinitialisation est visible
    await expect(page.getByText('Reset Filter')).toBeVisible();

    // Cliquer sur le bouton de réinitialisation
    await page.getByText('Reset Filter').click();

    const productsResponse = await request.get(
      'http://localhost:3000/api/v1/product'
    );
    const productsData = await productsResponse.json();

    // Vérifier que tous les produits sont à nouveau visibles
    const products = productsData.data;
    for (const product of products) {
      await expect(page.getByText(product.name)).toBeVisible();
      await expect(
        page.getByTestId(`product-price-${product.name}`)
      ).toHaveText(`${product.price} €`);
    }
  });

  test('should handle mobile view correctly', async ({ page }) => {
    // Simuler une vue mobile
    await page.setViewportSize({ width: 375, height: 1040 });

    // Vérifier que le filtre mobile est visible
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible();

    // Cliquer sur une catégorie
    await page.getByRole('button', { name: 'Pizzas' }).click();

    // Vérifier que le style de sélection est appliqué
    const pizzaButton = page.getByRole('button', { name: 'Pizzas' });
    await expect(pizzaButton).toHaveClass(/bg-primary-dark/);

    // Vérifier que seuls les produits de la catégorie Pizzas sont affichés
    for (const product of mockProducts.pizzas) {
      await expect(page.getByText(product.name)).toBeVisible();
    }

    // Cliquer sur "All"
    await page.getByRole('button', { name: 'All' }).click();

    // Vérifier que le filtre est réinitialisé
    await expect(pizzaButton).not.toHaveClass(/bg-primary-dark/);
  });

  test('should handle loading state', async ({ page }) => {
    // Intercepter la requête avec un délai
    await page.route('**/api/v1/product**', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: [],
          pagination: {
            total: 0,
            totalPages: 0,
            currentPage: 1,
            limit: 10,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        }),
      });
    });

    // Recharger la page
    await page.reload();

    // Vérifier l'état de chargement
    await expect(page.getByRole('status')).toBeVisible();
  });

  test('should handle error state', async ({ page }) => {
    // Intercepter la requête avec une erreur
    await page.route('**/api/v1/product**', async (route) => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    // Recharger la page
    await page.reload();

    // Vérifier le message d'erreur
    await expect(page.getByText(/Une erreur est survenue/)).toBeVisible();
  });

  test('should handle empty state', async ({ page }) => {
    // Intercepter la requête avec des données vides
    await page.route('**/api/v1/product**', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: [],
          pagination: {
            total: 0,
            totalPages: 0,
            currentPage: 1,
            limit: 10,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        }),
      });
    });

    // Recharger la page
    await page.reload();

    // Vérifier le message d'état vide
    await expect(page.getByText(/Aucun produit trouvé/)).toBeVisible();
  });
});

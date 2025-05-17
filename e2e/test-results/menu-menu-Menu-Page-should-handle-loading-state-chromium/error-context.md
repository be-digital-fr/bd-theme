# Test info

- Name: Menu Page >> should handle loading state
- Location: /Users/mamadouseck/Desktop/be-digital/bd-theme/e2e/tests/menu/menu.spec.ts:198:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('status')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByRole('status')

    at /Users/mamadouseck/Desktop/be-digital/bd-theme/e2e/tests/menu/menu.spec.ts:222:44
```

# Page snapshot

```yaml
- banner "En-tête principal du site":
  - navigation "Navigation principale":
    - region "Logo de l'entreprise":
      - link "Retour à l'accueil":
        - /url: /
        - img "Logo de l'entreprise"
    - navigation "Navigation principale":
      - list:
        - listitem:
          - link "Home":
            - /url: /
        - listitem:
          - link "Menu":
            - /url: /menu
        - listitem:
          - link "About":
            - /url: /about
        - listitem:
          - link "Blogs":
            - /url: /blogs
        - listitem:
          - link "Contact":
            - /url: /contact
    - region "Actions utilisateur":
      - link "Search":
        - /url: /search-product
      - link "Sign in":
        - /url: /auth/sign-in
      - link "Cart - 0 article":
        - /url: /cart
- main "Menu page":
  - heading "Our menu" [level=1]:
    - list "Our menu"
  - contentinfo: Lorem ipsum dolor sit amet consectetur adipiscing elit ugue quam diam vitae velit bibendum elementum dolor.
  - region "Popular dishes carousel":
    - region:
      - group:
        - img "Burgers"
        - heading "Burgers" [level=3]
      - group:
        - img "Pizzas"
        - heading "Pizzas" [level=3]
      - group:
        - img "Beverages"
        - heading "Beverages" [level=3]
      - group:
        - img "Desserts"
        - heading "Desserts" [level=3]
      - group:
        - img "Salads"
        - heading "Salads" [level=3]
      - group:
        - img "Sandwiches"
        - heading "Sandwiches" [level=3]
      - group:
        - img "Vegetarian"
        - heading "Vegetarian" [level=3]
      - group:
        - img "Soups"
        - heading "Soups" [level=3]
    - group "Carousel navigation":
      - button "Previous slide" [disabled]
      - progressbar
      - button "Next slide" [disabled]
  - article "Product card for Soupe Miso":
    - img "Image of Soupe Miso"
    - button "Add to favorites"
    - group "Product information":
      - group "Rating information": 0.0 (0)
      - group "Preparation time": ~8 mins
    - heading "Soupe Miso" [level=2]
    - group "Product actions":
      - button "Add to cart"
      - 'button "Price: 9.99 euros"': 9.99 €
  - article "Product card for Soupe de Lentilles":
    - img "Image of Soupe de Lentilles"
    - button "Add to favorites"
    - group "Product information":
      - group "Rating information": 0.0 (0)
      - group "Preparation time": ~12 mins
    - heading "Soupe de Lentilles" [level=2]
    - group "Product actions":
      - button "Add to cart"
      - 'button "Price: 8.99 euros"': 8.99 €
  - article "Product card for Soupe Tomate Basilic":
    - img "Image of Soupe Tomate Basilic"
    - button "Add to favorites"
    - group "Product information":
      - group "Rating information": 0.0 (0)
      - group "Preparation time": ~8 mins
    - heading "Soupe Tomate Basilic" [level=2]
    - group "Product actions":
      - button "Add to cart"
      - 'button "Price: 7.99 euros"': 7.99 €
  - article "Product card for Soupe de Potiron":
    - img "Image of Soupe de Potiron"
    - button "Add to favorites"
    - group "Product information":
      - group "Rating information": 0.0 (0)
      - group "Preparation time": ~8 mins
    - heading "Soupe de Potiron" [level=2]
    - group "Product actions":
      - button "Add to cart"
      - 'button "Price: 7.99 euros"': 7.99 €
  - article "Product card for Soupe à l'Oignon":
    - img "Image of Soupe à l'Oignon"
    - button "Add to favorites"
    - group "Product information":
      - group "Rating information": 0.0 (0)
      - group "Preparation time": ~10 mins
    - heading "Soupe à l'Oignon" [level=2]
    - group "Product actions":
      - button "Add to cart"
      - 'button "Price: 8.99 euros"': 8.99 €
  - article "Product card for Tacos Végétariens":
    - img "Image of Tacos Végétariens"
    - button "Add to favorites"
    - group "Product information":
      - group "Rating information": 0.0 (0)
      - group "Preparation time": ~8 mins
    - heading "Tacos Végétariens" [level=2]
    - group "Product actions":
      - button "Add to cart"
      - 'button "Price: 11.99 euros"': 11.99 €
  - article "Product card for Curry de Légumes":
    - img "Image of Curry de Légumes"
    - button "Add to favorites"
    - group "Product information":
      - group "Rating information": 0.0 (0)
      - group "Preparation time": ~12 mins
    - heading "Curry de Légumes" [level=2]
    - group "Product actions":
      - button "Add to cart"
      - 'button "Price: 13.99 euros"': 13.99 €
  - article "Product card for Lasagnes aux Légumes":
    - img "Image of Lasagnes aux Légumes"
    - button "Add to favorites"
    - group "Product information":
      - group "Rating information": 0.0 (0)
      - group "Preparation time": ~15 mins
    - heading "Lasagnes aux Légumes" [level=2]
    - group "Product actions":
      - button "Add to cart"
      - 'button "Price: 15.99 euros"': 15.99 €
  - article "Product card for Poke Bowl Végétarien":
    - img "Image of Poke Bowl Végétarien"
    - button "Add to favorites"
    - group "Product information":
      - group "Rating information": 0.0 (0)
      - group "Preparation time": ~10 mins
    - heading "Poke Bowl Végétarien" [level=2]
    - group "Product actions":
      - button "Add to cart"
      - 'button "Price: 14.99 euros"': 14.99 €
  - article "Product card for Burger aux Champignons":
    - img "Image of Burger aux Champignons"
    - button "Add to favorites"
    - group "Product information":
      - group "Rating information": 0.0 (0)
      - group "Preparation time": ~12 mins
    - heading "Burger aux Champignons" [level=2]
    - group "Product actions":
      - button "Add to cart"
      - 'button "Price: 13.99 euros"': 13.99 €
  - article "Product card for Wrap Végétalien":
    - img "Image of Wrap Végétalien"
    - button "Add to favorites"
    - group "Product information":
      - group "Rating information": 0.0 (0)
      - group "Preparation time": ~7 mins
    - heading "Wrap Végétalien" [level=2]
    - group "Product actions":
      - button "Add to cart"
      - 'button "Price: 9.99 euros"': 9.99 €
  - article "Product card for Salade Méditerranéenne":
    - img "Image of Salade Méditerranéenne"
    - button "Add to favorites"
    - group "Product information":
      - group "Rating information": 0.0 (0)
      - group "Preparation time": ~8 mins
    - heading "Salade Méditerranéenne" [level=2]
    - group "Product actions":
      - button "Add to cart"
      - 'button "Price: 11.99 euros"': 11.99 €
  - navigation "pagination":
    - list:
      - listitem:
        - link "Go to previous page":
          - /url: "#"
          - text: Previous
      - listitem:
        - link "1":
          - /url: "#"
      - listitem:
        - link "2":
          - /url: "#"
      - listitem:
        - link "3":
          - /url: "#"
      - listitem:
        - link "4":
          - /url: "#"
      - listitem:
        - link "Go to next page":
          - /url: "#"
          - text: Next
  - list "Order via app"
  - contentinfo: Lorem ipsum dolor sit amet consectetur adipiscing elit ugue quam diam vitae velit bibendum elementum dolor.
  - list "Food delivery partners":
    - listitem "Uber Eats - Food delivery partner":
      - img "Uber Eats - Food delivery partner"
    - listitem "Doordash - Food delivery partner":
      - img "Doordash - Food delivery partner"
    - listitem "Postmates - Food delivery partner":
      - img "Postmates - Food delivery partner"
    - listitem "Rappi - Food delivery partner":
      - img "Rappi - Food delivery partner"
  - region "Témoignages clients carousel":
    - list "Customer Testimonials"
    - group "Navigation du carousel":
      - button "Slide précédente" [disabled]
      - text: 01 / 03
      - button "Slide suivante"
    - region:
      - group:
        - paragraph: “Service exceptionnel, je recommande vivement !”
        - img "Photo de Alice Dupont"
        - heading "Alice Dupont" [level=4]
      - group:
        - paragraph: “Une équipe à l'écoute et très professionnelle.”
        - img "Photo de Jean Martin"
        - heading "Jean Martin" [level=4]
      - group:
        - paragraph: “Résultats impressionnants en un temps record.”
        - img "Photo de Sophie Bernard"
        - heading "Sophie Bernard" [level=4]
  - banner "Section Check Our Blog":
    - list "Check Our Blog"
    - link "View all Check Our Blog":
      - /url: /blog
      - text: View all
  - region "Blog posts carousel":
    - group:
      - link "The Benefits of Meal Prepping for a Healthy Lifestyle":
        - /url: /blog/post-1
        - article "The Benefits of Meal Prepping for a Healthy Lifestyle":
          - img "The Benefits of Meal Prepping for a Healthy Lifestyle":
            - img "The Benefits of Meal Prepping for a Healthy Lifestyle"
            - text: 31 Sept
          - heading "The Benefits of Meal Prepping for a Healthy Lifestyle" [level=3]
    - group:
      - link "The Benefits of Meal Prepping for a Healthy Lifestyle":
        - /url: /blog/post-2
        - article "The Benefits of Meal Prepping for a Healthy Lifestyle":
          - img "Quick and Nutritious Breakfast Ideas for Busy Professionals":
            - img "Quick and Nutritious Breakfast Ideas for Busy Professionals"
            - text: 31 Sept
          - heading "Quick and Nutritious Breakfast Ideas for Busy Professionals" [level=3]
    - group:
      - link "The Benefits of Meal Prepping for a Healthy Lifestyle":
        - /url: /blog/post-3
        - article "The Benefits of Meal Prepping for a Healthy Lifestyle":
          - 'img "Understanding Macronutrients: A Guide to Balanced Meals"':
            - 'img "Understanding Macronutrients: A Guide to Balanced Meals"'
            - text: 31 Sept
          - 'heading "Understanding Macronutrients: A Guide to Balanced Meals" [level=3]'
    - group:
      - link "The Benefits of Meal Prepping for a Healthy Lifestyle":
        - /url: /blog/post-4
        - article "The Benefits of Meal Prepping for a Healthy Lifestyle":
          - img "Plant-Based Protein Sources for a Healthy Diet":
            - img "Plant-Based Protein Sources for a Healthy Diet"
            - text: 31 Sept
          - heading "Plant-Based Protein Sources for a Healthy Diet" [level=3]
    - group:
      - link "The Benefits of Meal Prepping for a Healthy Lifestyle":
        - /url: /blog/post-5
        - article "The Benefits of Meal Prepping for a Healthy Lifestyle":
          - 'img "Smart Snacking: Healthy Options for Between Meals"':
            - 'img "Smart Snacking: Healthy Options for Between Meals"'
            - text: 31 Sept
          - 'heading "Smart Snacking: Healthy Options for Between Meals" [level=3]'
- contentinfo:
  - paragraph: 123 Broadway Street, New York, NY 10001, USA
  - paragraph: "Open: 09:00 AM-01:00PM"
  - heading "Utility Links" [level=3]
  - list:
    - listitem: Link 1
    - listitem: Link 2
    - listitem: Link 3
  - heading "Legals" [level=3]
  - list:
    - listitem: Privacy Policy
    - listitem: Terms of Service
    - listitem: Cookie Policy
  - text: NEWSLETTER
  - paragraph: 2025 Eat a Box. All rights reserved
  - link:
    - /url: /
  - link:
    - /url: /
  - link:
    - /url: /
- region "Notifications alt+T"
- alert
- button "Open Next.js Dev Tools":
  - img
- button "Open issues overlay": 1 Issue
- button "Collapse issues badge":
  - img
```

# Test source

```ts
  122 |     ).toBeVisible();
  123 |
  124 |     // Vérifier les catégories
  125 |     for (const category of categories) {
  126 |       await expect(page.getByText(category.name)).toBeVisible();
  127 |     }
  128 |
  129 |     // Vérifier les produits
  130 |     const products = productsData.data;
  131 |     for (const product of products) {
  132 |       await expect(page.getByText(product.name)).toBeVisible();
  133 |       await expect(
  134 |         page.getByTestId(`product-price-${product.name}`)
  135 |       ).toHaveText(`${product.price} €`);
  136 |     }
  137 |   });
  138 |
  139 |   test('should filter products by category', async ({ page, request }) => {
  140 |     // Cliquer sur la catégorie Burgers
  141 |     await page.getByText('Burgers').click();
  142 |
  143 |     // Vérifier que seuls les produits de la catégorie Burgers sont affichés
  144 |     for (const product of mockProducts.burgers) {
  145 |       await expect(page.getByText(product.name)).toBeVisible();
  146 |     }
  147 |     for (const product of mockProducts.pizzas) {
  148 |       await expect(page.getByText(product.name)).not.toBeVisible();
  149 |     }
  150 |
  151 |     // Vérifier que le bouton de réinitialisation est visible
  152 |     await expect(page.getByText('Reset Filter')).toBeVisible();
  153 |
  154 |     // Cliquer sur le bouton de réinitialisation
  155 |     await page.getByText('Reset Filter').click();
  156 |
  157 |     const productsResponse = await request.get(
  158 |       'http://localhost:3000/api/v1/product'
  159 |     );
  160 |     const productsData = await productsResponse.json();
  161 |
  162 |     // Vérifier que tous les produits sont à nouveau visibles
  163 |     const products = productsData.data;
  164 |     for (const product of products) {
  165 |       await expect(page.getByText(product.name)).toBeVisible();
  166 |       await expect(
  167 |         page.getByTestId(`product-price-${product.name}`)
  168 |       ).toHaveText(`${product.price} €`);
  169 |     }
  170 |   });
  171 |
  172 |   test('should handle mobile view correctly', async ({ page }) => {
  173 |     // Simuler une vue mobile
  174 |     await page.setViewportSize({ width: 375, height: 1040 });
  175 |
  176 |     // Vérifier que le filtre mobile est visible
  177 |     await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
  178 |
  179 |     // Cliquer sur une catégorie
  180 |     await page.getByRole('button', { name: 'Pizzas' }).click();
  181 |
  182 |     // Vérifier que le style de sélection est appliqué
  183 |     const pizzaButton = page.getByRole('button', { name: 'Pizzas' });
  184 |     await expect(pizzaButton).toHaveClass(/bg-primary-dark/);
  185 |
  186 |     // Vérifier que seuls les produits de la catégorie Pizzas sont affichés
  187 |     for (const product of mockProducts.pizzas) {
  188 |       await expect(page.getByText(product.name)).toBeVisible();
  189 |     }
  190 |
  191 |     // Cliquer sur "All"
  192 |     await page.getByRole('button', { name: 'All' }).click();
  193 |
  194 |     // Vérifier que le filtre est réinitialisé
  195 |     await expect(pizzaButton).not.toHaveClass(/bg-primary-dark/);
  196 |   });
  197 |
  198 |   test('should handle loading state', async ({ page }) => {
  199 |     // Intercepter la requête avec un délai
  200 |     await page.route('**/api/v1/product**', async (route) => {
  201 |       await new Promise((resolve) => setTimeout(resolve, 1000));
  202 |       await route.fulfill({
  203 |         status: 200,
  204 |         body: JSON.stringify({
  205 |           data: [],
  206 |           pagination: {
  207 |             total: 0,
  208 |             totalPages: 0,
  209 |             currentPage: 1,
  210 |             limit: 10,
  211 |             hasNextPage: false,
  212 |             hasPreviousPage: false,
  213 |           },
  214 |         }),
  215 |       });
  216 |     });
  217 |
  218 |     // Recharger la page
  219 |     await page.reload();
  220 |
  221 |     // Vérifier l'état de chargement
> 222 |     await expect(page.getByRole('status')).toBeVisible();
      |                                            ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  223 |   });
  224 |
  225 |   test('should handle error state', async ({ page }) => {
  226 |     // Intercepter la requête avec une erreur
  227 |     await page.route('**/api/v1/product**', async (route) => {
  228 |       await route.fulfill({
  229 |         status: 500,
  230 |         body: JSON.stringify({ error: 'Internal Server Error' }),
  231 |       });
  232 |     });
  233 |
  234 |     // Recharger la page
  235 |     await page.reload();
  236 |
  237 |     // Vérifier le message d'erreur
  238 |     await expect(page.getByText(/Une erreur est survenue/)).toBeVisible();
  239 |   });
  240 |
  241 |   test('should handle empty state', async ({ page }) => {
  242 |     // Intercepter la requête avec des données vides
  243 |     await page.route('**/api/v1/product**', async (route) => {
  244 |       await route.fulfill({
  245 |         status: 200,
  246 |         body: JSON.stringify({
  247 |           data: [],
  248 |           pagination: {
  249 |             total: 0,
  250 |             totalPages: 0,
  251 |             currentPage: 1,
  252 |             limit: 10,
  253 |             hasNextPage: false,
  254 |             hasPreviousPage: false,
  255 |           },
  256 |         }),
  257 |       });
  258 |     });
  259 |
  260 |     // Recharger la page
  261 |     await page.reload();
  262 |
  263 |     // Vérifier le message d'état vide
  264 |     await expect(page.getByText(/Aucun produit trouvé/)).toBeVisible();
  265 |   });
  266 | });
  267 |
```
import { PrismaClient } from '@/generated/prisma';
import slugify from 'slugify';
const prisma = new PrismaClient();
const BASE_IMAGE_URL = '/images/products/';
const BURGER_IMAGE = '/images/categories/burger.png';
const PIZZA_IMAGE = '/images/categories/pizza.png';
const BEVERAGE_IMAGE = '/images/categories/beverage.png';
const DESSERT_IMAGE = '/images/categories/panna-cotta.png';
const SALAD_IMAGE = '/images/categories/salad.png';
const SANDWICH_IMAGE = '/images/categories/sandwich.png';
const VEGGIE_IMAGE = '/images/categories/veggie.png';
const SOUP_IMAGE = '/images/categories/soup.png';

export default async function productSeed() {
  // Nettoyer la base de données existante
  await prisma.orderItem.deleteMany();
  await prisma.extra.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Créer les catégories
  const burgerCategory = await prisma.category.create({
    data: {
      name: 'Burgers',
      description: 'Burgers artisanaux préparés avec des viandes sélectionnées, pains briochés moelleux et garnitures savoureuses de qualité supérieure',
      image: BURGER_IMAGE,
    },
  });

  const pizzaCategory = await prisma.category.create({
    data: {
      name: 'Pizzas',
      description: 'Pizzas faites maison avec pâte levée 24h, sauce tomate italienne authentique et ingrédients frais cuits au feu de bois traditionnel',
      image: PIZZA_IMAGE,
    },
  });

  const beverageCategory = await prisma.category.create({
    data: {
      name: 'Beverages',
      description: 'Boissons fraîches préparées avec des ingrédients naturels et de saison, des smoothies maison aux milkshakes gourmands et sodas artisanaux',
      image: BEVERAGE_IMAGE,
    },
  });

  const dessertCategory = await prisma.category.create({
    data: {
      name: 'Desserts',
      description: 'Desserts artisanaux préparés avec des ingrédients frais et de qualité premium, des classiques revisités aux créations originales et gourmandes',
      image: DESSERT_IMAGE,
    },
  });

  const saladCategory = await prisma.category.create({
    data: {
      name: 'Salads',
      description: 'Salades fraîches préparées avec des légumes de saison et des ingrédients bio, des classiques aux créations originales équilibrées et savoureuses',
      image: SALAD_IMAGE,
    },
  });

  const sandwichCategory = await prisma.category.create({
    data: {
      name: 'Sandwiches',
      description: 'Sandwiches gourmands préparés avec des pains artisanaux et ingrédients frais, des classiques aux créations originales pour tous les goûts',
      image: SANDWICH_IMAGE,
    },
  });

  const vegetarianCategory = await prisma.category.create({
    data: {
      name: 'Vegetarian',
      description: 'Plats végétariens créatifs préparés avec des ingrédients frais et bio, des protéines végétales de qualité et des techniques culinaires innovantes',
      image: VEGGIE_IMAGE,
    },
  });

  const soupCategory = await prisma.category.create({
    data: {
      name: 'Soups',
      description: 'Soupes maison préparées quotidiennement avec des ingrédients frais de saison, des classiques réconfortants aux créations originales et savoureuses',
      image: SOUP_IMAGE,
    },
  });

  // Créer les variants communs
  const createSizeVariant = async (productId: string) => {
    return prisma.variant.create({
      data: {
        name: 'Taille',
        options: ['Simple', 'Double', 'Triple'],
        price: 2.0,
        productId,
      },
    });
  };

  const createCookingVariant = async (productId: string) => {
    return prisma.variant.create({
      data: {
        name: 'Cuisson',
        options: ['Bleu', 'Saignant', 'À point', 'Bien cuit'],
        productId,
      },
    });
  };

  // Créer les extras communs
  const createCommonExtras = async (productId: string) => {
    const extras = [
      { name: 'Fromage supplémentaire', price: 1.0 },
      { name: 'Bacon', price: 1.5 },
      { name: 'Sauce spéciale', price: 0.5 },
    ];

    for (const extra of extras) {
      await prisma.extra.create({
        data: {
          ...extra,
          productId,
        },
      });
    }
  };

  // Créer les extras végétariens
  const createVegetarianExtras = async (productId: string) => {
    const extras = [
      { name: 'Avocat supplémentaire', price: 1.5 },
      { name: 'Fromage végétal', price: 1.0 },
      { name: 'Sauce végan', price: 0.5 },
    ];

    for (const extra of extras) {
      await prisma.extra.create({
        data: {
          ...extra,
          productId,
        },
      });
    }
  };

  // Créer les produits burger
  const burgerProducts = [
    {
      name: 'Classic Burger',
      description:
        'Notre burger signature avec steak haché frais, salade, tomate et sauce maison',
      price: 8.99,
      calories: 650,
      preparationTime: 12,
      image: `${BASE_IMAGE_URL}classic-burger.png`,
    },
    {
      name: 'Cheese Burger Deluxe',
      description:
        'Burger avec double fromage fondu, oignons caramélisés et sauce spéciale',
      price: 10.99,
      calories: 850,
      preparationTime: 15,
      image: `${BASE_IMAGE_URL}cheese-burger-deluxe.png`,
    },
    {
      name: 'Veggie Burger',
      description:
        'Galette de légumes maison, avocat, roquette et sauce végane',
      price: 9.99,
      calories: 450,
      preparationTime: 10,
      image: `${BASE_IMAGE_URL}veggie-burger.png`,
    },
    {
      name: 'Spicy Burger',
      description:
        'Burger épicé avec jalapeños, sauce piquante et cheddar fondu',
      price: 11.99,
      calories: 750,
      preparationTime: 12,
      image: `${BASE_IMAGE_URL}spicy-burger.png`,
    },
    {
      name: 'Royal Bacon Burger',
      description:
        'Triple steak, triple bacon, triple fromage pour les grandes faims',
      price: 14.99,
      calories: 1200,
      preparationTime: 18,
      image: `${BASE_IMAGE_URL}royal-bacon-burger.png`,
    },
  ];

  // Créer les produits végétariens
  const vegetarianProducts = [
    {
      name: 'Buddha Bowl',
      description: 'Bol composé de quinoa, légumes grillés, avocat et houmous',
      price: 12.99,
      calories: 450,
      preparationTime: 10,
      image: `${BASE_IMAGE_URL}buddha-bowl.png`,
    },
    {
      name: 'Salade Méditerranéenne',
      description: 'Salade fraîche avec falafel, olives, tomates et sauce tahini',
      price: 11.99,
      calories: 380,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}mediterranean-salad.png`,
    },
    {
      name: 'Wrap Végétalien',
      description: 'Wrap aux légumes grillés, houmous et légumes croquants',
      price: 9.99,
      calories: 420,
      preparationTime: 7,
      image: `${BASE_IMAGE_URL}vegan-wrap.png`,
    },
    {
      name: 'Burger aux Champignons',
      description: 'Steak de champignons portobello, fromage végétal, roquette et sauce truffe',
      price: 13.99,
      calories: 480,
      preparationTime: 12,
      image: `${BASE_IMAGE_URL}mushroom-burger.png`,
    },
    {
      name: 'Poke Bowl Végétarien',
      description: 'Riz, tofu mariné, algues, avocat, edamame et sauce soja',
      price: 14.99,
      calories: 520,
      preparationTime: 10,
      image: `${BASE_IMAGE_URL}poke-bowl.png`,
    },
    {
      name: 'Lasagnes aux Légumes',
      description: 'Lasagnes maison aux légumes de saison, sauce tomate et béchamel végétale',
      price: 15.99,
      calories: 580,
      preparationTime: 15,
      image: `${BASE_IMAGE_URL}vegan-lasagna.png`,
    },
    {
      name: 'Curry de Légumes',
      description: 'Curry de légumes au lait de coco, riz basmati et naan',
      price: 13.99,
      calories: 460,
      preparationTime: 12,
      image: `${BASE_IMAGE_URL}vegan-curry.png`,
    },
    {
      name: 'Tacos Végétariens',
      description: 'Tacos aux haricots noirs, maïs, guacamole et crème végétale',
      price: 11.99,
      calories: 420,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}vegan-tacos.png`,
    }
  ];

  // Créer les produits pizza
  const pizzaProducts = [
    {
      name: 'Margherita',
      description: 'Sauce tomate, mozzarella, basilic frais',
      price: 11.99,
      calories: 800,
      preparationTime: 15,
      image: `${BASE_IMAGE_URL}margherita.png`,
    },
    {
      name: 'Végétarienne',
      description: 'Sauce tomate, mozzarella, champignons, poivrons, oignons, olives',
      price: 13.99,
      calories: 750,
      preparationTime: 15,
      image: `${BASE_IMAGE_URL}vegetarian-pizza.png`,
    },
    {
      name: 'Quattro Formaggi',
      description: 'Sauce tomate, mozzarella, gorgonzola, parmesan, chèvre',
      price: 14.99,
      calories: 900,
      preparationTime: 15,
      image: `${BASE_IMAGE_URL}quattro-formaggi.png`,
    },
    {
      name: 'Hawaïenne',
      description: 'Sauce tomate, mozzarella, jambon, ananas',
      price: 13.99,
      calories: 850,
      preparationTime: 15,
      image: `${BASE_IMAGE_URL}hawaiian-pizza.png`,
    },
    {
      name: 'Calzone',
      description: 'Pizza pliée avec sauce tomate, mozzarella, jambon, champignons',
      price: 14.99,
      calories: 950,
      preparationTime: 18,
      image: `${BASE_IMAGE_URL}calzone.png`,
    }
  ];

  // Créer les produits boissons
  const beverageProducts = [
    {
      name: 'Coca-Cola',
      description: 'Soda rafraîchissant',
      price: 2.99,
      calories: 140,
      preparationTime: 1,
      image: `${BASE_IMAGE_URL}coca-cola.png`,
    },
    {
      name: 'Limonade Maison',
      description: 'Limonade fraîche avec menthe',
      price: 3.99,
      calories: 120,
      preparationTime: 2,
      image: `${BASE_IMAGE_URL}limonade-maison.png`,
    },
    {
      name: 'Ice Tea',
      description: 'Thé glacé à la pêche',
      price: 2.99,
      calories: 90,
      preparationTime: 1,
      image: `${BASE_IMAGE_URL}ice-tea.png`,
    },
    {
      name: 'Smoothie Fruits Rouges',
      description: 'Mélange de fruits rouges frais',
      price: 4.99,
      calories: 180,
      preparationTime: 3,
      image: `${BASE_IMAGE_URL}strawberry-smoothie.png`,
    },
    {
      name: 'Milkshake Chocolat',
      description: 'Milkshake au chocolat avec chantilly',
      price: 5.99,
      calories: 450,
      preparationTime: 4,
      image: `${BASE_IMAGE_URL}chocolate-milkshake.png`,
    }
  ];

  // Créer les produits desserts
  const dessertProducts = [
    {
      name: 'Tiramisu',
      description: 'Dessert italien au café et mascarpone',
      price: 6.99,
      calories: 350,
      preparationTime: 2,
      image: `${BASE_IMAGE_URL}tiramisu.png`,
    },
    {
      name: 'Cheesecake',
      description: 'Cheesecake New York avec coulis de fruits rouges',
      price: 7.99,
      calories: 420,
      preparationTime: 2,
      image: `${BASE_IMAGE_URL}cheesecake.png`,
    },
    {
      name: 'Crème Brûlée',
      description: 'Crème vanille caramélisée',
      price: 5.99,
      calories: 280,
      preparationTime: 2,
      image: `${BASE_IMAGE_URL}creme-brulee.png`,
    },
    {
      name: 'Fondant au Chocolat',
      description: 'Gâteau au chocolat coulant avec glace vanille',
      price: 6.99,
      calories: 380,
      preparationTime: 3,
      image: `${BASE_IMAGE_URL}chocolate-fondant.png`,
    },
    {
      name: 'Tarte aux Pommes',
      description: 'Tarte aux pommes caramélisées',
      price: 5.99,
      calories: 320,
      preparationTime: 2,
      image: `${BASE_IMAGE_URL}apple-pie.png`,
    }
  ];

  // Créer les produits salades
  const saladProducts = [
    {
      name: 'César',
      description: 'Laitue, croûtons, parmesan, sauce césar, poulet grillé',
      price: 12.99,
      calories: 450,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}cesar-salad.png`,
    },
    {
      name: 'Salade Niçoise',
      description: 'Thon, olives, tomates, anchois, œufs, poivrons',
      price: 13.99,
      calories: 420,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}niciose-salad.png`,
    },
    {
      name: 'Salade Végétarienne',
      description: 'Légumes de saison, avocat, noix, vinaigrette balsamique',
      price: 11.99,
      calories: 380,
      preparationTime: 7,
      image: `${BASE_IMAGE_URL}vegan-salad.png`,
    },
    {
      name: 'Salade Quinoa',
      description: 'Quinoa, légumes grillés, feta, vinaigrette citron',
      price: 12.99,
      calories: 400,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}quinoa-salad.png`,
    },
    {
      name: 'Salade César Végétarienne',
      description: 'Laitue, croûtons, parmesan, sauce césar, tofu grillé',
      price: 11.99,
      calories: 380,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}vegan-salad-2.png`,
    }
  ];

  // Créer les produits sandwichs
  const sandwichProducts = [
    {
      name: 'Club Sandwich',
      description: 'Poulet, bacon, laitue, tomate, mayonnaise',
      price: 10.99,
      calories: 650,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}club-sandwich.png`,
    },
    {
      name: 'Sandwich Végétarien',
      description: 'Légumes grillés, houmous, avocat, roquette',
      price: 9.99,
      calories: 450,
      preparationTime: 7,
      image: `${BASE_IMAGE_URL}vegan-sandwich.png`,
    },
    {
      name: 'BLT',
      description: 'Bacon, laitue, tomate, mayonnaise',
      price: 11.99,
      calories: 580,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}blt-sandwich.png`,
    },
    {
      name: 'Sandwich Thon',
      description: 'Thon, mayonnaise, cornichons, laitue',
      price: 10.99,
      calories: 520,
      preparationTime: 7,
      image: `${BASE_IMAGE_URL}vegan-sandwich.png`,
    },
    {
      name: 'Sandwich Falafel',
      description: 'Falafel, houmous, légumes croquants, sauce tahini',
      price: 9.99,
      calories: 480,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}vegan-sandwich-2.png`,
    }
  ];

  // Créer les produits soupes
  const soupProducts = [
    {
      name: 'Soupe à l\'Oignon',
      description: 'Soupe traditionnelle française avec oignons caramélisés, croûtons et fromage gratiné',
      price: 8.99,
      calories: 320,
      preparationTime: 10,
      image: `${BASE_IMAGE_URL}onion-soup.png`,
    },
    {
      name: 'Soupe de Potiron',
      description: 'Velouté de potiron avec crème fraîche et graines de courge torréfiées',
      price: 7.99,
      calories: 280,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}pumpkin-soup.png`,
    },
    {
      name: 'Soupe Tomate Basilic',
      description: 'Velouté de tomates fraîches avec basilic frais et crème de coco',
      price: 7.99,
      calories: 250,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}tomato-soup.png`,
    },
    {
      name: 'Soupe de Lentilles',
      description: 'Soupe traditionnelle aux lentilles avec légumes de saison et épices douces',
      price: 8.99,
      calories: 350,
      preparationTime: 12,
      image: `${BASE_IMAGE_URL}lentil-soup.png`,
    },
    {
      name: 'Soupe Miso',
      description: 'Soupe japonaise traditionnelle avec tofu, algues et champignons shiitake',
      price: 9.99,
      calories: 180,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}miso-soup.png`,
    }
  ];

  // Créer les burgers
  for (const product of burgerProducts) {
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        categoryId: burgerCategory.id,
      },
    });

    await createSizeVariant(createdProduct.id);
    await createCookingVariant(createdProduct.id);
    await createCommonExtras(createdProduct.id);
  }

  // Créer les pizzas
  for (const product of pizzaProducts) {
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        categoryId: pizzaCategory.id,
      },
    });

    await createSizeVariant(createdProduct.id);
    await createCommonExtras(createdProduct.id);
  }

  // Créer les boissons
  for (const product of beverageProducts) {
    await prisma.product.create({
      data: {
        ...product,
        categoryId: beverageCategory.id,
      },
    });
  }

  // Créer les desserts
  for (const product of dessertProducts) {
    await prisma.product.create({
      data: {
        ...product,
        categoryId: dessertCategory.id,
      },
    });
  }

  // Créer les salades
  for (const product of saladProducts) {
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        categoryId: saladCategory.id,
      },
    });

    // Ajouter des extras spécifiques aux salades
    await prisma.extra.create({
      data: {
        name: 'Protéines supplémentaires',
        price: 3.0,
        productId: createdProduct.id,
      },
    });
  }

  // Créer les sandwichs
  for (const product of sandwichProducts) {
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        categoryId: sandwichCategory.id,
      },
    });

    await createSizeVariant(createdProduct.id);
    await createCommonExtras(createdProduct.id);
  }

  // Créer les produits végétariens
  for (const product of vegetarianProducts) {
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        categoryId: vegetarianCategory.id,
      },
    });

    await createSizeVariant(createdProduct.id);
    await createVegetarianExtras(createdProduct.id);
  }

  // Créer les soupes
  for (const product of soupProducts) {
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        categoryId: soupCategory.id,
      },
    });

    // Ajouter des extras spécifiques aux soupes
    await prisma.extra.create({
      data: {
        name: 'Croutons supplémentaires',
        price: 1.5,
        productId: createdProduct.id,
      },
    });
  }

  console.log('Base de données initialisée avec succès !');
}

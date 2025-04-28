import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

const BURGER_IMAGE =
'/images/products/pizza.png';

export default async function productSeed() {
  // Nettoyer la base de données existante
  await prisma.orderItem.deleteMany();
  await prisma.extra.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Créer les catégories
  const burgerCategory = await prisma.category.create({
    data: {
      name: 'Burgers',
      description: 'Nos délicieux burgers faits maison',
      image: BURGER_IMAGE,
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

  // Créer les produits
  const products = [
    {
      name: 'Classic Burger',
      description:
        'Notre burger signature avec steak haché frais, salade, tomate et sauce maison',
      price: 8.99,
      calories: 650,
      preparationTime: 12,
      image: BURGER_IMAGE,
    },
    {
      name: 'Cheese Burger Deluxe',
      description:
        'Burger avec double fromage fondu, oignons caramélisés et sauce spéciale',
      price: 10.99,
      calories: 850,
      preparationTime: 15,
      image: BURGER_IMAGE,
    },
    {
      name: 'Veggie Burger',
      description:
        'Galette de légumes maison, avocat, roquette et sauce végane',
      price: 9.99,
      calories: 450,
      preparationTime: 10,
      image: BURGER_IMAGE,
    },
    {
      name: 'Spicy Burger',
      description:
        'Burger épicé avec jalapeños, sauce piquante et cheddar fondu',
      price: 11.99,
      calories: 750,
      preparationTime: 12,
      image: BURGER_IMAGE,
    },
    {
      name: 'Royal Bacon Burger',
      description:
        'Triple steak, triple bacon, triple fromage pour les grandes faims',
      price: 14.99,
      calories: 1200,
      preparationTime: 18,
      image: BURGER_IMAGE,
    },
  ];

  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        categoryId: burgerCategory.id,
      },
    });

    // Ajouter les variants
    await createSizeVariant(createdProduct.id);
    await createCookingVariant(createdProduct.id);

    // Ajouter les extras
    await createCommonExtras(createdProduct.id);
  }

  console.log('Base de données initialisée avec succès !');
}

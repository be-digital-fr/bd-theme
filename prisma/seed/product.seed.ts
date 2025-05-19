import { PrismaClient } from '@/generated/prisma';
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
      slug: 'burgers',
      shortDescription: 'Découvrez notre sélection de burgers artisanaux préparés avec des ingrédients frais et de qualité. Des recettes authentiques qui raviront les amateurs de street food gourmande.',
      description: 'Notre collection de burgers artisanaux représente le summum de la cuisine street food moderne. Chaque burger est méticuleusement assemblé avec des ingrédients soigneusement sélectionnés : viandes de race premium, pains briochés fraîchement cuits, légumes croquants de saison et sauces maison exclusives. Nos chefs allient techniques traditionnelles et créativité contemporaine pour vous offrir une expérience gustative incomparable. Que vous soyez amateur de classiques revisités ou en quête de saveurs innovantes, notre carte saura satisfaire toutes vos envies de burger gourmet.',
      image: BURGER_IMAGE,
    },
  });

  const pizzaCategory = await prisma.category.create({
    data: {
      name: 'Pizzas',
      slug: 'pizzas',
      shortDescription: 'Des pizzas authentiques cuites au feu de bois, préparées selon la tradition italienne avec une pâte fraîche levée 24h et des ingrédients de première qualité importés d\'Italie.',
      description: 'Plongez dans l\'authenticité de la véritable pizza italienne avec notre sélection exclusive. Notre pâte, préparée quotidiennement et levée naturellement pendant 24 heures, offre une texture incomparable : croustillante à l\'extérieur et moelleuse à l\'intérieur. Nous utilisons uniquement des tomates San Marzano AOP, de la mozzarella fior di latte et des ingrédients frais sélectionnés avec soin. Chaque pizza est cuite dans notre four à bois traditionnel à plus de 400°C, garantissant cette authentique saveur napolitaine tant recherchée. Des classiques intemporels aux créations contemporaines, découvrez l\'excellence de la pizza artisanale.',
      image: PIZZA_IMAGE,
    },
  });

  const beverageCategory = await prisma.category.create({
    data: {
      name: 'Beverages',
      slug: 'beverages',
      shortDescription: 'Une sélection rafraîchissante de boissons artisanales, des cocktails sans alcool aux smoothies vitaminés. Des créations originales préparées avec des fruits frais et des ingrédients naturels.',
      description: 'Notre carte des boissons propose une expérience rafraîchissante unique, alliant créativité et qualité premium. Chaque boisson est élaborée avec précision, utilisant des fruits frais de saison, des sirops artisanaux et des ingrédients naturels soigneusement sélectionnés. De nos smoothies énergisants à nos limonades maison en passant par nos créations signatures, découvrez des saveurs innovantes qui révolutionnent l\'art des boissons sans alcool. Nos mixologistes experts créent des associations surprenantes pour une expérience gustative mémorable.',
      image: BEVERAGE_IMAGE,
    },
  });

  const dessertCategory = await prisma.category.create({
    data: {
      name: 'Desserts',
      slug: 'desserts',
      shortDescription: 'Une collection de desserts raffinés alliant tradition pâtissière et innovation culinaire. Des créations uniques préparées quotidiennement par nos chefs pâtissiers passionnés.',
      description: 'Laissez-vous tenter par notre collection de desserts d\'exception, où l\'art de la pâtisserie française rencontre la créativité contemporaine. Nos chefs pâtissiers, formés dans les plus grandes maisons, créent quotidiennement des œuvres gustatives utilisant les meilleurs ingrédients : chocolat grand cru, fruits frais de saison, et produits laitiers AOC. Chaque dessert est pensé pour offrir un équilibre parfait entre textures et saveurs, du croustillant au fondant, de l\'acidulé au sucré. Une attention particulière est portée à la présentation, faisant de chaque assiette une véritable œuvre d\'art gourmande.',
      image: DESSERT_IMAGE,
    },
  });

  const saladCategory = await prisma.category.create({
    data: {
      name: 'Salads',
      slug: 'salads',
      shortDescription: 'Des salades fraîches et créatives, composées de produits de saison et de mélanges de textures surprenants. Une option saine et gourmande pour un repas équilibré.',
      description: 'Nos salades représentent l\'équilibre parfait entre nutrition et plaisir gustatif. Composées exclusivement de produits frais et de saison, chaque création est un festival de couleurs, de textures et de saveurs. Nos chefs sélectionnent quotidiennement les meilleurs légumes auprès de producteurs locaux engagés dans une agriculture responsable. Les vinaigrettes et sauces sont préparées maison, sans conservateurs ni additifs. De la classique César revisitée aux compositions végétariennes innovantes, découvrez des associations audacieuses qui réinventent le concept de salade gourmande.',
      image: SALAD_IMAGE,
    },
  });

  const sandwichCategory = await prisma.category.create({
    data: {
      name: 'Sandwiches',
      slug: 'sandwiches',
      shortDescription: 'Une sélection de sandwiches gourmets préparés avec des pains artisanaux et des garnitures généreuses. Des recettes créatives qui réinventent le sandwich traditionnel.',
      description: 'Découvrez l\'excellence du sandwich gourmet à travers notre sélection unique. Chaque création commence par un pain artisanal, pétri et cuit quotidiennement dans notre fournil. Les garnitures sont méticuleusement sélectionnées : charcuteries fines, fromages affinés, légumes croquants et sauces maison exclusives. Nos chefs innovent constamment pour proposer des combinaisons originales qui transcendent le sandwich traditionnel. De la street food raffinée aux classiques revisités, chaque bouchée est une explosion de saveurs qui révolutionne votre pause déjeuner.',
      image: SANDWICH_IMAGE,
    },
  });

  const vegetarianCategory = await prisma.category.create({
    data: {
      name: 'Vegetarian',
      slug: 'vegetarian',
      shortDescription: 'Des plats végétariens savoureux et créatifs, élaborés avec des produits bio et locaux. Une cuisine végétale moderne qui prouve que manger végétarien peut être une expérience gastronomique.',
      description: 'Notre menu végétarien redéfinit les standards de la cuisine végétale contemporaine. Chaque plat est une célébration des légumes, légumineuses et céréales, sourcés en priorité auprès de producteurs bio locaux. Nos chefs utilisent des techniques culinaires innovantes pour créer des textures surprenantes et des saveurs complexes. Des protéines végétales préparées avec expertise aux légumes sublimés par des cuissons précises, chaque assiette est pensée pour offrir un équilibre nutritionnel optimal sans compromis sur le goût. Une cuisine végétarienne moderne qui séduira même les plus carnivores.',
      image: VEGGIE_IMAGE,
    },
  });

  const soupCategory = await prisma.category.create({
    data: {
      name: 'Soups',
      slug: 'soups',
      shortDescription: 'Des soupes maison réconfortantes, préparées chaque jour avec des légumes frais de saison. Des recettes traditionnelles aux créations modernes pour réchauffer corps et esprit.',
      description: 'Nos soupes artisanales incarnent le meilleur du réconfort culinaire. Préparées quotidiennement dans nos cuisines, elles mettent à l\'honneur les légumes de saison, sélectionnés pour leur fraîcheur et leur qualité gustative. Nos chefs marient expertise traditionnelle et créativité moderne pour créer des recettes uniques, du velouté onctueux au bouillon revigorant. Chaque soupe est mijotée avec patience, permettant aux saveurs de se développer pleinement. Les herbes fraîches et épices soigneusement dosées apportent la touche finale qui fait de chaque cuillère un moment de pure délectation.',
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
      slug: 'classic-burger',
      shortDescription: 'Le burger traditionnel par excellence : un steak haché juteux, des légumes frais et notre sauce signature, le tout dans un pain brioché doré. Une valeur sûre qui ravira tous les amateurs de burger.',
      description: 'Notre Classic Burger est l\'incarnation de la perfection du burger traditionnel. Composé d\'un steak haché de bœuf français de 150g, sélectionné pour sa qualité supérieure et son persillage idéal, il est grillé à la demande pour préserver toute sa jutosité. Le pain brioché, fabriqué quotidiennement par notre boulanger, est légèrement toasté pour un contraste de textures parfait. Garni de salade croquante, de tomates mûries sur pied, d\'oignons rouges finement émincés et de notre sauce secrète élaborée selon une recette exclusive, chaque bouchée est un moment de pure gourmandise. Un classique intemporel qui satisfait même les palais les plus exigeants.',
      price: 8.99,
      calories: 650,
      preparationTime: 12,
      image: `${BASE_IMAGE_URL}classic-burger.png`,
      ingredients: ['Steak haché de bœuf', 'Pain brioché', 'Salade', 'Tomates', 'Oignons rouges', 'Sauce secrète']
    },
    {
      name: 'Cheese Burger Deluxe',
      slug: 'cheese-burger-deluxe',
      shortDescription: 'Une explosion de fromages fondants sur un steak juteux, rehaussée par la douceur des oignons caramélisés et notre sauce spéciale. Le paradis des amateurs de fromage.',
      description: 'Le Cheese Burger Deluxe est une célébration du fromage sous toutes ses formes. Un généreux steak de bœuf de 180g sert de base à un assortiment de fromages soigneusement sélectionnés : cheddar affiné, emmental français et mozzarella di bufala, créant une harmonie de saveurs fondantes. Les oignons, caramélisés lentement pendant plus d\'une heure, apportent une touche de douceur sucrée qui complète parfaitement les fromages. Notre sauce spéciale, mélange secret d\'épices et de condiments, vient lier l\'ensemble. Le tout est servi dans un pain aux graines de sésame spécialement développé pour ce burger. Une création qui élève le cheeseburger au rang d\'expérience gastronomique.',
      price: 10.99,
      calories: 850,
      preparationTime: 15,
      image: `${BASE_IMAGE_URL}cheese-burger-deluxe.png`,
      ingredients: ['Steak de bœuf', 'Cheddar', 'Emmental', 'Mozzarella', 'Oignons caramélisés', 'Sauce spéciale', 'Pain aux graines de sésame']
    },
    {
      name: 'Veggie Burger',
      slug: 'veggie-burger',
      shortDescription: 'Un burger végétarien savoureux avec une galette de légumes maison, de l\'avocat crémeux et une sauce végane. Prouve que les alternatives végétariennes peuvent être tout aussi délicieuses.',
      description: 'Notre Veggie Burger redéfinit les standards du burger végétarien. La galette, préparée quotidiennement dans nos cuisines, est un mélange savant de légumineuses, quinoa et légumes frais, relevé d\'épices soigneusement dosées. L\'avocat, sélectionné à parfaite maturité, apporte une onctuosité naturelle, tandis que la roquette bio ajoute une note poivrée rafraîchissante. Notre sauce végane maison, à base d\'herbes fraîches et de condiments naturels, complète harmonieusement l\'ensemble. Servi dans un pain aux céréales riches en fibres, ce burger prouve qu\'une alternative végétarienne peut être aussi savoureuse que satisfaisante. Une option saine qui ne fait aucun compromis sur le goût.',
      price: 9.99,
      calories: 450,
      preparationTime: 10,
      image: `${BASE_IMAGE_URL}veggie-burger.png`,
      ingredients: ['Galette de légumes', 'Avocat', 'Roquette', 'Sauce végane', 'Pain aux céréales']
    },
    {
      name: 'Spicy Burger',
      slug: 'spicy-burger',
      shortDescription: 'Un burger qui met le feu aux papilles avec ses jalapeños frais, sa sauce piquante maison et son cheddar fondu. Une explosion de saveurs pour les amateurs de sensations fortes.',
      description: 'Le Spicy Burger est conçu pour les amateurs de sensations fortes. Un steak de bœuf épicé de 170g forme la base de cette création audacieuse, relevée par une généreuse portion de jalapeños frais et notre sauce piquante signature, élaborée à partir d\'un mélange secret de piments. Le cheddar fondu apporte une touche crémeuse qui équilibre parfaitement le piquant, tandis que les oignons rouges et la laitue croquante ajoutent fraîcheur et texture. Le pain brioché est légèrement toasté et badigeonné d\'une huile infusée aux piments pour une expérience épicée à chaque bouchée. Un burger qui vous fera voyager à travers une palette de saveurs intenses et complexes.',
      price: 11.99,
      calories: 750,
      preparationTime: 12,
      image: `${BASE_IMAGE_URL}spicy-burger.png`,
      ingredients: ['Steak de bœuf épicé', 'Jalapeños', 'Sauce piquante', 'Cheddar', 'Oignons rouges', 'Laitue', 'Pain brioché']
    },
    {
      name: 'Royal Bacon Burger',
      slug: 'royal-bacon-burger',
      shortDescription: 'Le burger ultime avec triple steak, triple bacon et triple fromage. Une création démesurée pour les plus grandes faims, où chaque couche révèle de nouvelles saveurs.',
      description: 'Le Royal Bacon Burger est l\'ultime expression de l\'excès culinaire maîtrisé. Trois steaks de bœuf de 150g chacun, soigneusement sélectionnés pour leur persillage optimal, sont grillés à la perfection. Chaque steak est surmonté d\'une tranche de bacon fumé artisanalement et d\'un fromage différent : cheddar affiné, emmental français et raclette, créant une symphonie de saveurs. Les oignons caramélisés et notre sauce barbecue maison apportent une touche de douceur qui équilibre l\'ensemble. Le pain brioché spécial, plus épais et robuste, est conçu pour supporter cette création monumentale. Un véritable défi gastronomique qui ravira les amateurs de sensations fortes.',
      price: 14.99,
      calories: 1200,
      preparationTime: 18,
      image: `${BASE_IMAGE_URL}royal-bacon-burger.png`,
      ingredients: ['Steak de bœuf', 'Bacon', 'Cheddar', 'Emmental', 'Raclette', 'Oignons caramélisés', 'Sauce barbecue', 'Pain brioché']
    },
  ];

  // Créer les produits végétariens
  const vegetarianProducts = [
    {
      name: 'Buddha Bowl',
      slug: 'buddha-bowl',
      shortDescription: 'Un bol complet et équilibré associant quinoa, légumes grillés, avocat et houmous. Une explosion de saveurs et de textures pour un repas sain et rassasiant.',
      description: 'Notre Buddha Bowl est une véritable célébration de la cuisine végétarienne moderne. À la base, un lit de quinoa bio, riche en protéines et cuit al dente, est accompagné de légumes de saison grillés avec des herbes fraîches. L\'avocat, sélectionné à parfaite maturité, apporte onctuosité et acides gras essentiels. Notre houmous maison, préparé quotidiennement avec des pois chiches bio et du tahini premium, ajoute une touche crémeuse et protéinée. Le tout est agrémenté de graines torréfiées, de pousses fraîches et d\'une vinaigrette aux agrumes qui lie harmonieusement l\'ensemble des saveurs. Un plat complet qui prouve que l\'équilibre nutritionnel peut rimer avec plaisir gustatif.',
      price: 12.99,
      calories: 450,
      preparationTime: 10,
      image: `${BASE_IMAGE_URL}buddha-bowl.png`,
      ingredients: ['Quinoa', 'Légumes grillés', 'Avocat', 'Houmous', 'Graines torréfiées', 'Pousses fraîches', 'Vinaigrette aux agrumes']
    },
    {
      name: 'Salade Méditerranéenne',
      slug: 'salade-mediterraneenne',
      shortDescription: 'Une salade généreuse aux saveurs méditerranéennes avec falafels maison, olives Kalamata, tomates cerises et sauce tahini crémeuse. Un voyage gustatif vers le Moyen-Orient.',
      description: 'Notre Salade Méditerranéenne est une invitation au voyage culinaire. Les falafels, préparés chaque jour selon une recette traditionnelle, sont croustillants à l\'extérieur et moelleux à l\'intérieur. Les olives Kalamata, importées de Grèce, et les tomates cerises cultivées localement apportent une authenticité méditerranéenne. La base de salade mélange plusieurs variétés de laitues croquantes, complétée par des concombres frais, des oignons rouges et du persil plat. Notre sauce tahini, préparée avec du sésame premium et relevée d\'une pointe de citron, lie parfaitement l\'ensemble. Un plat qui combine fraîcheur, saveurs authentiques et équilibre nutritionnel.',
      price: 11.99,
      calories: 380,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}mediterranean-salad.png`,
      ingredients: ['Falafels', 'Olives Kalamata', 'Tomates cerises', 'Laitues', 'Concombres', 'Oignons rouges', 'Persil plat', 'Sauce tahini']
    },
    {
      name: 'Wrap Végétalien',
      slug: 'wrap-vegetalien',
      shortDescription: 'Un wrap généreux garni de légumes grillés, houmous onctueux et crudités croquantes. Une option végétalienne savoureuse qui satisfait les plus gros appétits.',
      description: 'Notre Wrap Végétalien réinvente le concept du sandwich roulé avec une approche 100% végétale. La tortilla, spécialement sélectionnée pour sa souplesse et son goût neutre, enveloppe un mélange généreux de légumes grillés marinés aux herbes de Provence. Notre houmous maison, onctueux et parfumé au cumin, forme une base crémeuse complétée par des légumes croquants fraîchement coupés. Les pousses de jeunes pousses et graines germées ajoutent une touche de fraîcheur et des nutriments essentiels. Une sauce tahini légèrement citronnée vient parfaire l\'ensemble. Un repas complet qui prouve que la cuisine végétalienne peut être à la fois roborative et délicieuse.',
      price: 9.99,
      calories: 420,
      preparationTime: 7,
      image: `${BASE_IMAGE_URL}vegan-wrap.png`,
      ingredients: ['Tortilla', 'Légumes grillés', 'Houmous', 'Crudités', 'Pousses', 'Graines germées', 'Sauce tahini']
    },
    {
      name: 'Burger aux Champignons',
      slug: 'burger-aux-champignons',
      shortDescription: 'Un burger végétarien gourmet avec un généreux champignon portobello grillé, du fromage végétal fondant et une sauce à la truffe. Une alternative sophistiquée au burger traditionnel.',
      description: 'Notre Burger aux Champignons est une création végétarienne sophistiquée qui rivalise avec les meilleurs burgers traditionnels. Le champignon portobello, mariné dans une préparation aux herbes et grillé à la perfection, offre une texture charnue et des saveurs umami intenses. Le fromage végétal, sélectionné pour ses qualités fondantes, apporte l\'onctuosité caractéristique d\'un grand burger. La roquette fraîche ajoute une note poivrée qui contraste avec la douceur de notre sauce à la truffe, préparée avec de la truffe noire d\'été et une émulsion végétale crémeuse. Le pain aux céréales complètes, légèrement toasté, complète parfaitement cette création gastronomique végétarienne.',
      price: 13.99,
      calories: 480,
      preparationTime: 12,
      image: `${BASE_IMAGE_URL}mushroom-burger.png`,
      ingredients: ['Champignon portobello', 'Fromage végétal', 'Roquette', 'Sauce à la truffe', 'Pain aux céréales']
    },
    {
      name: 'Poke Bowl Végétarien',
      slug: 'poke-bowl-vegetarien',
      shortDescription: 'Un bol hawaïen revisité avec du tofu mariné, du riz complet, des légumes croquants et une sauce soja maison. Une explosion de saveurs asiatiques dans un bol coloré et nutritif.',
      description: 'Notre Poke Bowl Végétarien réinvente ce classique hawaïen avec une touche végétarienne créative. Le tofu bio extra-ferme est mariné pendant 24h dans une sauce asiatique maison avant d\'être légèrement grillé pour plus de caractère. Le riz complet, cuit à la perfection, est assaisonné avec un vinaigre de riz artisanal. Les algues nori et wakame apportent des saveurs marines authentiques, tandis que l\'avocat, les edamame et les légumes croquants créent un festival de textures. Notre sauce soja maison, enrichie de gingembre frais et de sésame torréfié, lie harmonieusement l\'ensemble. Un plat qui allie équilibre nutritionnel et explosion de saveurs.',
      price: 14.99,
      calories: 520,
      preparationTime: 10,
      image: `${BASE_IMAGE_URL}poke-bowl.png`,
      ingredients: ['Tofu mariné', 'Riz complet', 'Légumes croquants', 'Algues nori', 'Wakame', 'Avocat', 'Edamame', 'Sauce soja']
    },
    {
      name: 'Lasagnes aux Légumes',
      slug: 'lasagnes-aux-legumes',
      shortDescription: 'Des lasagnes végétariennes généreuses aux légumes de saison, avec une sauce tomate maison et une béchamel végétale crémeuse. Un plat réconfortant qui séduira tous les palais.',
      description: 'Nos Lasagnes aux Légumes réinventent ce classique italien en version végétarienne gourmande. Les pâtes fraîches, préparées artisanalement, alternent avec des couches généreuses de légumes de saison grillés et une sauce tomate mijotée pendant des heures avec des herbes fraîches. Notre béchamel végétale, préparée à base de lait d\'amande et de noix de muscade, apporte une onctuosité surprenante. Chaque couche est parsemée d\'un mélange de fromages végétaux sélectionnés pour leurs qualités fondantes. Le plat est gratiné jusqu\'à obtenir une croûte dorée parfaite. Une création qui prouve que la cuisine végétarienne peut être aussi réconfortante que sophistiquée.',
      price: 15.99,
      calories: 580,
      preparationTime: 15,
      image: `${BASE_IMAGE_URL}vegan-lasagna.png`,
      ingredients: ['Pâtes fraîches', 'Légumes de saison', 'Sauce tomate', 'Béchamel végétale', 'Fromages végétaux']
    },
    {
      name: 'Curry de Légumes',
      slug: 'curry-de-legumes',
      shortDescription: 'Un curry végétarien onctueux au lait de coco, avec des légumes de saison et des épices soigneusement dosées. Servi avec du riz basmati parfumé et du pain naan maison.',
      description: 'Notre Curry de Légumes est une symphonie d\'épices et de saveurs inspirée des traditions culinaires indiennes. Les légumes de saison, sélectionnés pour leur fraîcheur, sont mijotés dans une sauce au lait de coco crémeuse, parfumée par un mélange d\'épices torréfiées et moulues sur place. Le curry, préparé à la minute, développe des saveurs complexes et équilibrées. Le riz basmati, importé des meilleures régions de culture, est cuit à la perfection pour rester léger et parfumé. Notre pain naan, pétri et cuit sur place dans un four tandoor traditionnel, complète idéalement ce voyage gustatif. Un plat qui allie authenticité et créativité végétarienne.',
      price: 13.99,
      calories: 460,
      preparationTime: 12,
      image: `${BASE_IMAGE_URL}vegan-curry.png`,
      ingredients: ['Légumes de saison', 'Lait de coco', 'Épices', 'Riz basmati', 'Pain naan']
    },
    {
      name: 'Tacos Végétariens',
      slug: 'tacos-vegetariens',
      shortDescription: 'Des tacos créatifs garnis de haricots noirs épicés, de maïs grillé et de guacamole frais. Une explosion de saveurs mexicaines revisitées en version végétarienne.',
      description: 'Nos Tacos Végétariens réinventent la street food mexicaine avec une approche végétarienne créative. Les tortillas de maïs, produites artisanalement, sont garnies de haricots noirs mijotés avec un mélange d\'épices traditionnelles. Le maïs, grillé à la flamme, développe des notes fumées caractéristiques. Notre guacamole, préparé plusieurs fois par jour avec des avocats à parfaite maturité, des oignons rouges et de la coriandre fraîche, apporte fraîcheur et onctuosité. La crème végétale maison, légèrement citronnée, complète harmonieusement l\'ensemble. Chaque taco est une célébration de saveurs authentiques revisitées avec une touche contemporaine.',
      price: 11.99,
      calories: 420,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}vegan-tacos.png`,
      ingredients: ['Tortillas de maïs', 'Haricots noirs', 'Maïs grillé', 'Guacamole', 'Oignons rouges', 'Coriandre', 'Crème végétale']
    }
  ];

  // Créer les produits pizza
  const pizzaProducts = [
    {
      name: 'Margherita',
      slug: 'margherita',
      shortDescription: 'La pizza napolitaine par excellence : sauce tomate fraîche, mozzarella di bufala et basilic. Un classique intemporel qui met en valeur la qualité des ingrédients.',
      description: 'Notre Margherita incarne l\'essence même de la pizza napolitaine authentique. La pâte, préparée selon la tradition avec de la farine italienne type 00, est levée naturellement pendant 24h pour développer ses arômes. La sauce tomate, préparée avec des tomates San Marzano AOP, est relevée d\'un filet d\'huile d\'olive extra vierge. La mozzarella di bufala Campana DOP, importée deux fois par semaine, fond délicatement sur la pizza. Le basilic frais, ajouté après cuisson, apporte sa touche aromatique caractéristique. Cuite à plus de 400°C dans notre four à bois traditionnel, cette pizza offre la véritable expérience napolitaine.',
      price: 11.99,
      calories: 800,
      preparationTime: 15,
      image: `${BASE_IMAGE_URL}margherita.png`,
      ingredients: ['Pâte à pizza', 'Sauce tomate', 'Mozzarella di bufala', 'Basilic', 'Huile d\'olive']
    },
    {
      name: 'Végétarienne',
      slug: 'vegetarienne',
      shortDescription: 'Une pizza généreuse garnie de légumes frais de saison, avec une base de sauce tomate et de mozzarella fondante. Un festival de couleurs et de saveurs végétariennes.',
      description: 'Notre Pizza Végétarienne célèbre la fraîcheur et la diversité des légumes de saison. Sur une base de sauce tomate maison et de mozzarella fior di latte, nous disposons un assortiment coloré de légumes grillés : champignons de Paris frais, poivrons multicolores, oignons rouges caramélisés et olives noires de Kalamata. Chaque légume est préparé séparément pour préserver ses saveurs distinctives. Un filet d\'huile d\'olive extra vierge et des herbes fraîches du jardin viennent parfaire cette création végétarienne qui prouve que les pizzas sans viande peuvent être tout aussi savoureuses que leurs homologues traditionnelles.',
      price: 13.99,
      calories: 750,
      preparationTime: 15,
      image: `${BASE_IMAGE_URL}vegetarian-pizza.png`,
      ingredients: ['Pâte à pizza', 'Sauce tomate', 'Mozzarella', 'Champignons', 'Poivrons', 'Oignons rouges', 'Olives noires', 'Herbes fraîches']
    },
    {
      name: 'Quattro Formaggi',
      slug: 'quattro-formaggi',
      shortDescription: 'Une pizza gourmande aux quatre fromages italiens sélectionnés : mozzarella, gorgonzola, parmesan et chèvre. Un délice pour les amateurs de fromages.',
      description: 'Sauce tomate, mozzarella, gorgonzola, parmesan, chèvre',
      price: 14.99,
      calories: 900,
      preparationTime: 15,
      image: `${BASE_IMAGE_URL}quattro-formaggi.png`,
      ingredients: ['Pâte à pizza', 'Sauce tomate', 'Mozzarella', 'Gorgonzola', 'Parmesan', 'Chèvre']
    },
    {
      name: 'Hawaïenne',
      slug: 'hawaienne',
      shortDescription: 'L\'alliance sucrée-salée par excellence : jambon italien de qualité et ananas frais sur une base de sauce tomate et mozzarella fondante.',
      description: 'Sauce tomate, mozzarella, jambon, ananas',
      price: 13.99,
      calories: 850,
      preparationTime: 15,
      image: `${BASE_IMAGE_URL}hawaiian-pizza.png`,
      ingredients: ['Pâte à pizza', 'Sauce tomate', 'Mozzarella', 'Jambon', 'Ananas']
    },
    {
      name: 'Calzone',
      slug: 'calzone',
      shortDescription: 'Une pizza pliée et farcie de jambon, champignons et fromage fondu. Un classique de la cuisine italienne revisité avec des ingrédients premium.',
      description: 'Pizza pliée avec sauce tomate, mozzarella, jambon, champignons',
      price: 14.99,
      calories: 950,
      preparationTime: 18,
      image: `${BASE_IMAGE_URL}calzone.png`,
      ingredients: ['Pâte à pizza', 'Sauce tomate', 'Mozzarella', 'Jambon', 'Champignons']
    }
  ];

  // Créer les produits boissons
  const beverageProducts = [
    {
      name: 'Coca-Cola',
      slug: 'coca-cola',
      shortDescription: 'Le soda rafraîchissant par excellence, servi bien frais avec des glaçons. Un classique incontournable pour accompagner votre repas.',
      description: 'Soda rafraîchissant',
      price: 2.99,
      calories: 140,
      preparationTime: 1,
      image: `${BASE_IMAGE_URL}coca-cola.png`,
      ingredients: ['Eau gazéifiée', 'Sucre', 'Colorant caramel', 'Acide phosphorique', 'Extraits végétaux', 'Caféine']
    },
    {
      name: 'Limonade Maison',
      slug: 'limonade-maison',
      shortDescription: 'Notre limonade artisanale préparée avec des citrons pressés, de la menthe fraîche et un sirop maison. Une boisson rafraîchissante et naturelle.',
      description: 'Limonade fraîche avec menthe',
      price: 3.99,
      calories: 120,
      preparationTime: 2,
      image: `${BASE_IMAGE_URL}limonade-maison.png`,
      ingredients: ['Citrons pressés', 'Menthe fraîche', 'Sirop maison', 'Eau']
    },
    {
      name: 'Ice Tea',
      slug: 'ice-tea',
      shortDescription: 'Un thé glacé à la pêche rafraîchissant, préparé avec du thé infusé maison et un sirop de pêche naturel. Une alternative désaltérante aux sodas.',
      description: 'Thé glacé à la pêche',
      price: 2.99,
      calories: 90,
      preparationTime: 1,
      image: `${BASE_IMAGE_URL}ice-tea.png`,
      ingredients: ['Thé infusé', 'Sirop de pêche', 'Eau', 'Sucre']
    },
    {
      name: 'Smoothie Fruits Rouges',
      slug: 'smoothie-fruits-rouges',
      shortDescription: 'Un smoothie onctueux aux fruits rouges frais de saison, mixés avec du yaourt grec. Une explosion de saveurs et de vitamines.',
      description: 'Mélange de fruits rouges frais',
      price: 4.99,
      calories: 180,
      preparationTime: 3,
      image: `${BASE_IMAGE_URL}strawberry-smoothie.png`,
      ingredients: ['Fruits rouges', 'Yaourt grec', 'Sucre']
    },
    {
      name: 'Milkshake Chocolat',
      slug: 'milkshake-chocolat',
      shortDescription: 'Un milkshake gourmand au chocolat belge, garni de chantilly maison et de copeaux de chocolat. Un dessert glacé irrésistible.',
      description: 'Milkshake au chocolat avec chantilly',
      price: 5.99,
      calories: 450,
      preparationTime: 4,
      image: `${BASE_IMAGE_URL}chocolate-milkshake.png`,
      ingredients: ['Chocolat belge', 'Lait', 'Chantilly', 'Copeaux de chocolat']
    }
  ];

  // Créer les produits desserts
  const dessertProducts = [
    {
      name: 'Tiramisu',
      slug: 'tiramisu',
      shortDescription: 'Le dessert italien par excellence : biscuits imbibés de café, crème au mascarpone et cacao. Une recette authentique pour un moment de pure gourmandise.',
      description: 'Dessert italien au café et mascarpone',
      price: 6.99,
      calories: 350,
      preparationTime: 2,
      image: `${BASE_IMAGE_URL}tiramisu.png`,
      ingredients: ['Biscuits', 'Café', 'Mascarpone', 'Cacao']
    },
    {
      name: 'Cheesecake',
      slug: 'cheesecake',
      shortDescription: 'Un cheesecake new-yorkais crémeux sur une base de biscuits graham, nappé d\'un coulis de fruits rouges maison. Un classique américain revisité.',
      description: 'Cheesecake New York avec coulis de fruits rouges',
      price: 7.99,
      calories: 420,
      preparationTime: 2,
      image: `${BASE_IMAGE_URL}cheesecake.png`,
      ingredients: ['Biscuits graham', 'Fromage à la crème', 'Coulis de fruits rouges']
    },
    {
      name: 'Crème Brûlée',
      slug: 'creme-brulee',
      shortDescription: 'Une crème vanille onctueuse sous une fine croûte de caramel craquant. Un dessert français traditionnel qui allie douceur et croquant.',
      description: 'Crème vanille caramélisée',
      price: 5.99,
      calories: 280,
      preparationTime: 2,
      image: `${BASE_IMAGE_URL}creme-brulee.png`,
      ingredients: ['Crème', 'Vanille', 'Sucre', 'Caramel']
    },
    {
      name: 'Fondant au Chocolat',
      slug: 'fondant-au-chocolat',
      shortDescription: 'Un gâteau au chocolat au cœur coulant, servi avec une boule de glace vanille. L\'alliance parfaite du chaud et du froid pour les amateurs de chocolat.',
      description: 'Gâteau au chocolat coulant avec glace vanille',
      price: 6.99,
      calories: 380,
      preparationTime: 3,
      image: `${BASE_IMAGE_URL}chocolate-fondant.png`,
      ingredients: ['Chocolat', 'Œufs', 'Beurre', 'Sucre', 'Glace vanille']
    },
    {
      name: 'Tarte aux Pommes',
      slug: 'tarte-aux-pommes',
      shortDescription: 'Une tarte aux pommes traditionnelle avec des pommes caramélisées sur une pâte feuilletée maison. Un dessert réconfortant qui sent bon la France.',
      description: 'Tarte aux pommes caramélisées',
      price: 5.99,
      calories: 320,
      preparationTime: 2,
      image: `${BASE_IMAGE_URL}apple-pie.png`,
      ingredients: ['Pommes', 'Pâte feuilletée', 'Sucre', 'Beurre']
    }
  ];

  // Créer les produits salades
  const saladProducts = [
    {
      name: 'César',
      slug: 'cesar',
      shortDescription: 'La salade César classique avec poulet grillé, croûtons maison, copeaux de parmesan et notre sauce César crémeuse. Un incontournable de la cuisine américaine.',
      description: 'Laitue, croûtons, parmesan, sauce césar, poulet grillé',
      price: 12.99,
      calories: 450,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}cesar-salad.png`,
      ingredients: ['Laitue', 'Croûtons', 'Parmesan', 'Sauce César', 'Poulet grillé']
    },
    {
      name: 'Salade Niçoise',
      slug: 'salade-nicoise',
      shortDescription: 'Une salade traditionnelle du sud de la France avec thon, olives niçoises, œufs et légumes frais. Un plat complet aux saveurs méditerranéennes.',
      description: 'Thon, olives, tomates, anchois, œufs, poivrons',
      price: 13.99,
      calories: 420,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}niciose-salad.png`,
      ingredients: ['Thon', 'Olives niçoises', 'Tomates', 'Anchois', 'Œufs', 'Poivrons']
    },
    {
      name: 'Salade Végétarienne',
      slug: 'salade-vegetarienne',
      shortDescription: 'Une salade colorée aux légumes de saison, avocat crémeux et vinaigrette balsamique. Une option végétarienne fraîche et nourrissante.',
      description: 'Légumes de saison, avocat, noix, vinaigrette balsamique',
      price: 11.99,
      calories: 380,
      preparationTime: 7,
      image: `${BASE_IMAGE_URL}vegan-salad.png`,
      ingredients: ['Légumes de saison', 'Avocat', 'Noix', 'Vinaigrette balsamique']
    },
    {
      name: 'Salade Quinoa',
      slug: 'salade-quinoa',
      shortDescription: 'Une salade healthy au quinoa, légumes grillés et feta, relevée d\'une vinaigrette au citron. Un repas équilibré riche en protéines végétales.',
      description: 'Quinoa, légumes grillés, feta, vinaigrette citron',
      price: 12.99,
      calories: 400,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}quinoa-salad.png`,
      ingredients: ['Quinoa', 'Légumes grillés', 'Feta', 'Vinaigrette citron']
    },
    {
      name: 'Salade César Végétarienne',
      slug: 'salade-cesar-vegetarienne',
      shortDescription: 'Notre version végétarienne de la salade César avec du tofu grillé mariné remplaçant le poulet. Tout le goût d\'une César, sans la viande.',
      description: 'Laitue, croûtons, parmesan, sauce césar, tofu grillé',
      price: 11.99,
      calories: 380,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}vegan-salad-2.png`,
      ingredients: ['Laitue', 'Croûtons', 'Parmesan', 'Sauce César', 'Tofu grillé']
    }
  ];

  // Créer les produits sandwichs
  const sandwichProducts = [
    {
      name: 'Club Sandwich',
      slug: 'club-sandwich',
      shortDescription: 'Le sandwich trois étages classique avec poulet grillé, bacon croustillant, laitue et tomate. Un repas complet entre deux tranches de pain toasté.',
      description: 'Poulet, bacon, laitue, tomate, mayonnaise',
      price: 10.99,
      calories: 650,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}club-sandwich.png`,
      ingredients: ['Poulet grillé', 'Bacon', 'Laitue', 'Tomate', 'Mayonnaise', 'Pain toasté']
    },
    {
      name: 'Sandwich Végétarien',
      slug: 'sandwich-vegetarien',
      shortDescription: 'Un sandwich gourmet aux légumes grillés, houmous crémeux et avocat frais. Une option végétarienne savoureuse et nourrissante.',
      description: 'Légumes grillés, houmous, avocat, roquette',
      price: 9.99,
      calories: 450,
      preparationTime: 7,
      image: `${BASE_IMAGE_URL}vegan-sandwich.png`,
      ingredients: ['Légumes grillés', 'Houmous', 'Avocat', 'Roquette', 'Pain']
    },
    {
      name: 'BLT',
      slug: 'blt',
      shortDescription: 'Le classique américain : bacon croustillant, laitue fraîche et tomates mûries sur pied. Un sandwich simple mais parfaitement exécuté.',
      description: 'Bacon, laitue, tomate, mayonnaise',
      price: 11.99,
      calories: 580,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}blt-sandwich.png`,
      ingredients: ['Bacon', 'Laitue', 'Tomate', 'Mayonnaise', 'Pain']
    },
    {
      name: 'Sandwich Thon',
      slug: 'sandwich-thon',
      shortDescription: 'Un sandwich généreux au thon frais, accompagné de cornichons croquants et d\'une mayonnaise maison. Un classique de la cuisine française.',
      description: 'Thon, mayonnaise, cornichons, laitue',
      price: 10.99,
      calories: 520,
      preparationTime: 7,
      image: `${BASE_IMAGE_URL}vegan-sandwich.png`,
      ingredients: ['Thon', 'Mayonnaise', 'Cornichons', 'Laitue', 'Pain']
    },
    {
      name: 'Sandwich Falafel',
      slug: 'sandwich-falafel',
      shortDescription: 'Des falafels maison croustillants, accompagnés de houmous crémeux et de légumes frais. Une option végétarienne savoureuse inspirée du Moyen-Orient.',
      description: 'Falafel, houmous, légumes croquants, sauce tahini',
      price: 9.99,
      calories: 480,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}vegan-sandwich-2.png`,
      ingredients: ['Falafel', 'Houmous', 'Légumes croquants', 'Sauce tahini', 'Pain']
    }
  ];

  // Créer les produits soupes
  const soupProducts = [
    {
      name: 'Soupe à l\'Oignon',
      slug: 'soupe-oignon',
      shortDescription: 'Une soupe traditionnelle française aux oignons caramélisés, gratinée au fromage et accompagnée de croûtons dorés. Un classique réconfortant.',
      description: 'Soupe traditionnelle française avec oignons caramélisés, croûtons et fromage gratiné',
      price: 8.99,
      calories: 320,
      preparationTime: 10,
      image: `${BASE_IMAGE_URL}onion-soup.png`,
      ingredients: ['Oignons', 'Fromage', 'Croûtons', 'Bouillon']
    },
    {
      name: 'Soupe de Potiron',
      slug: 'soupe-potiron',
      shortDescription: 'Un velouté onctueux de potiron, relevé de crème fraîche et garni de graines de courge torréfiées. Une soupe d\'automne parfaite.',
      description: 'Velouté de potiron avec crème fraîche et graines de courge torréfiées',
      price: 7.99,
      calories: 280,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}pumpkin-soup.png`,
      ingredients: ['Potiron', 'Crème fraîche', 'Graines de courge', 'Bouillon']
    },
    {
      name: 'Soupe Tomate Basilic',
      slug: 'soupe-tomate-basilic',
      shortDescription: 'Un velouté de tomates fraîches parfumé au basilic frais et à la crème de coco. Une soupe estivale rafraîchissante.',
      description: 'Velouté de tomates fraîches avec basilic frais et crème de coco',
      price: 7.99,
      calories: 250,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}tomato-soup.png`,
      ingredients: ['Tomates', 'Basilic', 'Crème de coco', 'Bouillon']
    },
    {
      name: 'Soupe de Lentilles',
      slug: 'soupe-lentilles',
      shortDescription: 'Une soupe traditionnelle aux lentilles, enrichie de légumes de saison et d\'épices douces. Un plat réconfortant et nourrissant.',
      description: 'Soupe traditionnelle aux lentilles avec légumes de saison et épices douces',
      price: 8.99,
      calories: 350,
      preparationTime: 12,
      image: `${BASE_IMAGE_URL}lentil-soup.png`,
      ingredients: ['Lentilles', 'Légumes de saison', 'Épices', 'Bouillon']
    },
    {
      name: 'Soupe Miso',
      slug: 'soupe-miso',
      shortDescription: 'Une soupe japonaise traditionnelle au miso, garnie de tofu, d\'algues et de champignons shiitake. Une expérience culinaire asiatique authentique.',
      description: 'Soupe japonaise traditionnelle avec tofu, algues et champignons shiitake',
      price: 9.99,
      calories: 180,
      preparationTime: 8,
      image: `${BASE_IMAGE_URL}miso-soup.png`,
      ingredients: ['Miso', 'Tofu', 'Algues', 'Champignons shiitake', 'Bouillon']
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
        name: 'Croutons',
        price: 1.5,
        productId: createdProduct.id,
      },
    });

    await prisma.extra.create({
      data: {
        name: 'Lentilles',
        price: 1.5,
        productId: createdProduct.id,
      },
    });
  }

  console.log('Base de données initialisée avec succès !');
}

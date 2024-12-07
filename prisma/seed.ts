import {Prisma, PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    //models for deletion
    const models = [
        'menu',
        'discount',
        'category_position',
        'restaurant',
        'restaurant_menu',
        'position',
    ];

    for (const model of models) {
        console.log(`Clearing data from ${model}`);
        // @ts-ignore to suppress type errors for dynamic access
        await prisma[model].deleteMany();
    }
    const RestoStateCount = await prisma.restaurant_state.count();
    if (RestoStateCount < 3) {
        // Insert sample data for `restaurant_state`
        await prisma.$transaction([
            prisma.restaurant_state.create({data: {name: 'Open'}}),
            prisma.restaurant_state.create({data: {name: 'Closed'}}),
            prisma.restaurant_state.create({data: {name: 'Rush'}}),
        ]);
    }

    // Insert sample data for `restaurants`
    await prisma.$transaction([
        prisma.restaurant.create({
            data: {
                formal_name: 'The Gourmet Kitchen',
                display_name: 'Gourmet Kitchen',
                restaurant_state_id: 1, // Open
            },
        }),
        prisma.restaurant.create({
            data: {
                formal_name: 'The Rustic Table',
                display_name: 'Rustic Table',
                restaurant_state_id: 3, // Rush
            },
        }),
        prisma.restaurant.create({
            data: {
                formal_name: 'Ocean Delights',
                display_name: 'Ocean Delights',
                restaurant_state_id: 2, // Closed
            },
        }),
        prisma.restaurant.create({
            data: {
                formal_name: 'Urban Eats',
                display_name: 'Urban Eats',
                restaurant_state_id: 1, // Open
            },
        }),
        prisma.restaurant.create({
            data: {
                formal_name: 'The Cozy Corner',
                display_name: 'Cozy Corner',
                restaurant_state_id: 3, // Rush
            },
        }),
    ]);
    const menuTypesCount = await prisma.menu_type.count();
    if (menuTypesCount === 0) {
        // Insert sample data for `menu_types`
        await prisma.$transaction([
            prisma.menu_type.create({data: {name: 'Breakfast'}}),
            prisma.menu_type.create({data: {name: 'Lunch'}}),
            prisma.menu_type.create({data: {name: 'Dinner'}}),
        ]);
    }

    // Insert sample data for `menus`
    await prisma.$transaction([
        prisma.menu.create({
            data: {
                name: 'Morning Delights',
                description: 'Start your day right with a selection of hearty breakfasts and energizing drinks.',
                menu_type_id: 0, // Breakfast
            },
        }),
        prisma.menu.create({
            data: {
                name: 'Noon Favorites',
                description: 'Perfect for lunch, featuring savory sandwiches, fresh salads, and light soups.',
                menu_type_id: 1, // Lunch
            },
        }),
        prisma.menu.create({
            data: {
                name: 'Evening Specials',
                description: 'A delightful dinner experience, with a mix of gourmet dishes and classic favorites.',
                menu_type_id: 2, // Dinner
            },
        }),
        prisma.menu.create({
            data: {
                name: 'Weekend Brunch',
                description: 'The best of breakfast and lunch, with eggs, pastries, and specialty drinks.',
                menu_type_id: 1, // Lunch
            },
        }),
        prisma.menu.create({
            data: {
                name: 'Sweet Indulgence',
                description: 'A collection of desserts to satisfy every sweet tooth, from cakes to ice creams.',
                menu_type_id: 2, // Dinner
            },
        }),
        prisma.menu.create({
            data: {
                name: 'Healthy Start',
                description: 'Nutritious and delicious dishes for a light yet fulfilling breakfast or brunch.',
                menu_type_id: 0, // Breakfast
            },
        }),
        prisma.menu.create({
            data: {
                name: 'Power Lunch',
                description: 'A power-packed lunch to keep you energized with fresh salads and protein-rich options.',
                menu_type_id: 1, // Lunch
            },
        }),
        prisma.menu.create({
            data: {
                name: 'Evening Elegance',
                description: 'Sophisticated dinner options featuring fine wines, appetizers, and elegant main courses.',
                menu_type_id: 2, // Dinner
            },
        }),
        prisma.menu.create({
            data: {
                name: 'After Hours',
                description: 'A selection of late-night snacks and light bites perfect for those after-hours cravings.',
                menu_type_id: 2, // Dinner
            },
        }),
        prisma.menu.create({
            data: {
                name: 'Seasonal Feasts',
                description: 'Celebrate the seasons with dishes inspired by the freshest ingredients of the time.',
                menu_type_id: 2, // Dinner
            },
        }),
        prisma.menu.create({
            data: {
                name: 'Veggie Power',
                description: 'For the plant-based eaters, enjoy a menu full of fresh veggies and wholesome, meat-free dishes.',
                menu_type_id: 0, // Breakfast
            },
        }),
        prisma.menu.create({
            data: {
                name: 'Brunch & Bites',
                description: 'A delightful mix of light and hearty options perfect for your weekend brunch.',
                menu_type_id: 1, // Lunch
            },
        }),
        prisma.menu.create({
            data: {
                name: 'Comfort Classics',
                description: 'Classic comfort food like mac and cheese, burgers, and hearty soups, ideal for any time of day.',
                menu_type_id: 2, // Dinner
            },
        }),
        prisma.menu.create({
            data: {
                name: 'Global Plates',
                description: 'A journey through global cuisine with international dishes packed with vibrant flavors.',
                menu_type_id: 2, // Dinner
            },
        }),
    ]);


    const categoriesCount = await prisma.category.count();
    if (categoriesCount === 0) {
        // Insert sample data for `categories`
        await prisma.$transaction([
            prisma.category.create({
                data: {
                    name: 'Appetizers',
                    description: 'Start your meal with a variety of savory appetizers, perfect for stimulating your appetite and setting the tone for the rest of the meal.',
                },
            }),
            prisma.category.create({
                data: {
                    name: 'Main Courses',
                    description: 'Indulge in hearty main courses featuring fresh, seasonal ingredients and expertly crafted recipes that highlight rich flavors and satisfying textures.',
                },
            }),
            prisma.category.create({
                data: {
                    name: 'Desserts',
                    description: 'End your meal with a selection of delectable desserts, ranging from decadent cakes to refreshing fruit-based treats, perfect for every sweet tooth.',
                },
            }),
            prisma.category.create({
                data: {
                    name: 'Beverages',
                    description: 'Quench your thirst with a variety of beverages, from freshly brewed coffee and tea to invigorating cold drinks, all designed to complement your meal.',
                },
            }),
            prisma.category.create({
                data: {
                    name: 'Salads',
                    description: 'Savor the freshness of our selection of salads, featuring vibrant vegetables, tangy dressings, and healthy toppings to brighten your meal.',
                },
            }),
            prisma.category.create({
                data: {
                    name: 'Soups',
                    description: 'Warm up with our flavorful soups, ranging from creamy and comforting to light and brothy, perfect for every season and taste preference.',
                },
            }),
            prisma.category.create({
                data: {
                    name: 'Sandwiches',
                    description: 'Enjoy our wide variety of sandwiches, crafted with fresh bread, premium meats, and tasty fillings for a satisfying meal on the go.',
                },
            }),
            prisma.category.create({
                data: {
                    name: 'Pasta',
                    description: 'Delight in our selection of freshly made pastas, featuring classic Italian sauces, rich cheeses, and a perfect blend of flavors for pasta lovers.',
                },
            }),
        ]);
    }

    // Insert sample data for `positions`
    await prisma.$transaction([
        // Appetizers
        prisma.position.create({
            data: {
                name: 'Grilled Salmon',
                description: 'Fresh salmon grilled to perfection.',
                display_options: true,
                display_price: true,
                price: 25.99,
            },
        }),
        prisma.position.create({
            data: {
                name: 'Bruschetta',
                description: 'Toasted bread topped with tomatoes, garlic, and basil.',
                display_options: true,
                display_price: true,
                price: 8.99,
            },
        }),
        prisma.position.create({
            data: {
                name: 'Stuffed Mushrooms',
                description: 'Mushrooms filled with a savory mix of cheese and herbs.',
                display_options: false,
                display_price: true,
                price: 11.99,
            },
        }),

        // Main Course
        prisma.position.create({
            data: {
                name: 'Grilled Ribeye Steak',
                description: 'Juicy ribeye steak grilled to perfection.',
                display_options: true,
                display_price: true,
                price: 32.99,
            },
        }),
        prisma.position.create({
            data: {
                name: 'Chicken Alfredo',
                description: 'Pasta with grilled chicken in a creamy Alfredo sauce.',
                display_options: true,
                display_price: true,
                price: 19.99,
            },
        }),
        prisma.position.create({
            data: {
                name: 'Vegetable Stir Fry',
                description: 'A healthy mix of vegetables stir-fried in a savory sauce.',
                display_options: true,
                display_price: true,
                price: 14.99,
            },
        }),

        // Desserts
        prisma.position.create({
            data: {
                name: 'Chocolate Lava Cake',
                description: 'Warm chocolate cake with a gooey center.',
                display_options: false,
                display_price: true,
                price: 7.99,
            },
        }),
        prisma.position.create({
            data: {
                name: 'Cheesecake',
                description: 'Creamy cheesecake with a graham cracker crust.',
                display_options: true,
                display_price: true,
                price: 6.99,
            },
        }),
        prisma.position.create({
            data: {
                name: 'Tiramisu',
                description: 'Classic Italian dessert with layers of coffee-soaked sponge.',
                display_options: false,
                display_price: true,
                price: 8.49,
            },
        }),

        // Beverages
        prisma.position.create({
            data: {
                name: 'Margarita',
                description: 'A refreshing mix of lime, tequila, and triple sec.',
                display_options: true,
                display_price: true,
                price: 12.99,
            },
        }),
        prisma.position.create({
            data: {
                name: 'Iced Latte',
                description: 'Chilled espresso mixed with milk and ice.',
                display_options: true,
                display_price: true,
                price: 4.99,
            },
        }),
        prisma.position.create({
            data: {
                name: 'Mojito',
                description: 'A refreshing cocktail with mint, lime, and rum.',
                display_options: true,
                display_price: true,
                price: 9.99,
            },
        }),
    ]);

    const optionsCount = await prisma.option.count();
    if (optionsCount === 0) {
        await prisma.$transaction([
            prisma.option.create({data: {name: 'Garlic'}}),
            prisma.option.create({data: {name: 'Chilli'}}),
            prisma.option.create({data: {name: 'Cream'}}),
            prisma.option.create({data: {name: 'Tomato Sauce'}}),
            prisma.option.create({data: {name: 'Cheese'}}),
            prisma.option.create({data: {name: 'Bacon'}}),
            prisma.option.create({data: {name: 'Olives'}}),
            prisma.option.create({data: {name: 'Onions'}}),
            prisma.option.create({data: {name: 'Mushrooms'}}),
            prisma.option.create({data: {name: 'Avocado'}}),
            prisma.option.create({data: {name: 'Lettuce'}}),
            prisma.option.create({data: {name: 'Pickles'}}),
            prisma.option.create({data: {name: 'Feta Cheese'}}),
            prisma.option.create({data: {name: 'Spinach'}}),
            prisma.option.create({data: {name: 'Tomatoes'}}),
            prisma.option.create({data: {name: 'Pineapple'}}),
            prisma.option.create({data: {name: 'Cucumber'}}),
            prisma.option.create({data: {name: 'Sweet Corn'}}),
            prisma.option.create({data: {name: 'Bell Peppers'}}),
            prisma.option.create({data: {name: 'Mustard'}}),
            prisma.option.create({data: {name: 'BBQ Sauce'}}),
            prisma.option.create({data: {name: 'Ranch Dressing'}}),
            prisma.option.create({data: {name: 'Chives'}}),
            prisma.option.create({data: {name: 'Pesto'}}),
            prisma.option.create({data: {name: 'Sour Cream'}}),
        ]);

        //Can only delete option if there is no relation, so if one is missing the other is too
        await prisma.$transaction([
            // Grilled Salmon
            prisma.position_option.create({
                data: {
                    option_id: 1, // Garlic
                    position_id: 1, // Grilled Salmon
                    amount: 2, //in grams
                    description: 'Add a garlic flavor to your salmon.',
                },
            }),
            prisma.position_option.create({
                data: {
                    option_id: 2, // Chilli
                    position_id: 1, // Grilled Salmon
                    amount: 1,
                    description: 'Add some spice with fresh chilli.',
                },
            }),

            // Caesar Salad
            prisma.position_option.create({
                data: {
                    option_id: 3, // Cream
                    position_id: 2, // Caesar Salad
                    amount: 60,
                    description: 'Add a creamy touch to your salad.',
                },
            }),
            prisma.position_option.create({
                data: {
                    option_id: 7, // Olives
                    position_id: 2, // Caesar Salad
                    amount: 5,
                    description: 'Add some olives for extra flavor.',
                },
            }),

            // Chocolate Lava Cake
            prisma.position_option.create({
                data: {
                    option_id: 4, // Cheese
                    position_id: 3, // Chocolate Lava Cake
                    amount: 25,
                    description: 'Top with a rich creamy cheese.',
                },
            }),

            // Margarita Pizza
            prisma.position_option.create({
                data: {
                    option_id: 6, // Bacon
                    position_id: 4, // Margarita Pizza
                    amount: 50,
                    description: 'Top your pizza with crispy bacon.',
                },
            }),
            prisma.position_option.create({
                data: {
                    option_id: 8, // Onions
                    position_id: 4, // Margarita Pizza
                    amount: 25,
                    description: 'Add fresh onions for extra crunch.',
                },
            }),

            // Grilled Ribeye Steak
            prisma.position_option.create({
                data: {
                    option_id: 5, // Tomato Sauce
                    position_id: 5, // Grilled Ribeye Steak
                    amount: 60,
                    description: 'A tangy tomato sauce on the side.',
                },
            }),

            // Chicken Alfredo
            prisma.position_option.create({
                data: {
                    option_id: 9, // Lettuce
                    position_id: 6, // Chicken Alfredo
                    amount: 60,
                    description: 'Add a refreshing lettuce garnish.',
                },
            }),

            // Vegetable Stir Fry
            prisma.position_option.create({
                data: {
                    option_id: 10, // Pickles
                    position_id: 7, // Vegetable Stir Fry
                    amount: 20,
                    description: 'Add tangy pickles for extra flavor.',
                },
            }),
        ]);
    }


    const discountTypesCount = await prisma.discount_type.count();
    if (discountTypesCount === 0) {
        // Insert sample data for `discount_types`
        await prisma.$transaction([
            prisma.discount_type.create({data: {name: 'Seasonal Offer'}}),
            prisma.discount_type.create({data: {name: 'Happy Hour'}}),
        ]);
    }
    type DiscountCreateInput = Omit<Prisma.discountUncheckedCreateInput, 'id' | 'code'>;
    // Insert sample data for `discounts`
    const discountInputOne:DiscountCreateInput = {
        start: new Date('2023-12-01'),
        end: new Date('2023-12-31'),
        percentage: 15.5,
        menu_id: 3,
        discount_type_id: 1, // Seasonal Offer
    }

    const discountInputTwo:DiscountCreateInput = {
        start: new Date('2024-01-01'),
        end: new Date('2024-01-31'),
        percentage: 10.0,
        menu_id: 4,
        discount_type_id: 2, // Happy Hour
    }
    await prisma.$transaction([
        prisma.discount.create({
            // @ts-ignore
            data: discountInputOne,
        }),
        prisma.discount.create({
            // @ts-ignore
            data: discountInputTwo,
        }),
    ]);

    console.log('Seed data inserted successfully!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('Error seeding data:', e);
        await prisma.$disconnect();
        process.exit(1);
    });

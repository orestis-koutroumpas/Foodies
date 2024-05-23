const fs = require('fs');
const Database = require('better-sqlite3');

// Read the SQL file
const sql = fs.readFileSync('./model/db/foodies_db.sql', 'utf8');

// Open the SQLite database
const db = new Database('./model/db/foodies.sqlite');

// Execute the SQL commands to create the tables
db.exec(sql);

// Insert example data into store table
const stores = [
    { id: 1, name: 'Sandwich Spot', address: 'Solwmou 11 26222 Patra', description: 'Dive into fresh wraps bursting with flavor at Sandwich Spot. Our wraps are made with the freshest ingredients and bold flavors, making them the perfect choice for a quick and satisfying meal.', category: 'Sandwich', rating: 3, min_order: 5, delivery_fee: 0.5, estimated_delivery_time: '00:30:00', delivery_times: 'Mon-Fri: 10:30 AM - 8:00 PM', phone_number: '261 049 3456' },
    { id: 2, name: 'Pizza House', address: 'Smyrnis 61 26222 Patra', description: 'Enjoy authentic Italian pizzas made with love at Pizzeria. Our pizzas are crafted using traditional techniques and the finest ingredients, ensuring a taste of Italy in every slice.', category: 'Pizza', rating: 3, min_order: 8, delivery_fee: 2, estimated_delivery_time: '00:45:00', delivery_times: 'Mon-Fri: 11:00 AM - 9:00 PM', phone_number: '261 049 7789' },
    { id: 3, name: 'Fast Pizza', address: 'Danihlidos 17 26331 Patra', description: 'Delight in delicious pizzas served hot and fresh at Fast Pizza. Our dedication to quality shines through in every aspect of our pizzas, from the homemade dough to the carefully selected toppings.', category: 'Pizza', rating: 4, min_order: 25, delivery_fee: 0.5, estimated_delivery_time: '00:40:00', delivery_times: 'Mon-Sat: 11:30 AM - 10:00 PM', phone_number: '261 049 1234' },
    { id: 4, name: 'Pasta Pulse', address: 'Maizwnos 315 26222 Patra', description: 'Experience the pulse of pasta at Pasta Pulse, where comforting and flavorful dishes await. Each dish is expertly prepared using the finest ingredients and time-honored recipes, ensuring a dining experience that\'s both satisfying and memorable.', category: 'Pasta', rating: 4, min_order: 5, delivery_fee: 0, estimated_delivery_time: '00:35:00', delivery_times: 'Mon-Sat: 11:00 AM - 9:00 PM', phone_number: '261 049 5567' },
    { id: 5, name: 'Burger de Papa', address: 'Syrogiannh 14 26504 Patra', description: 'Indulge in the juiciest burgers made with premium ingredients at Burger de Papa. Our secret blend of spices and handcrafted sauces elevate the burger experience to a whole new level.', category: 'Burger', rating: 5, min_order: 8, delivery_fee: 0.60, estimated_delivery_time: '00:15:00', delivery_times: 'Mon-Sat: 11:00 AM - 9:00 PM', phone_number: '261 049 8901' },
    { id: 6, name: 'Burger Urge', address: 'Androu 31 26442 Patra', description: 'Craving a burger that packs a punch? Look no further than Burger Urge! Our bold flavors and generous portions will satisfy even the most voracious appetite.', category: 'Burger', rating: 3, min_order: 4, delivery_fee: 1, estimated_delivery_time: '00:45:00', delivery_times: 'Mon-Sat: 11:00 AM - 9:00 PM', phone_number: '261 049 2345' },
    { id: 7, name: 'Burger Park', address: 'Riga Feraiou 30 26221 Patra', description: 'Savor the juiciest burgers in town at Burger Park. Crafted with premium ingredients and bursting with flavor, each bite is a testament to burger perfection.', category: 'Burger', rating: 4, min_order: 10, delivery_fee: 1, estimated_delivery_time: '00:30:00', delivery_times: 'Mon-Sat: 10:00 AM - 10:00 PM, Sun: 12:00 PM - 9:00 PM', phone_number: '261 049 1122' },
    { id: 8, name: 'Burger Premium', address: 'Lontou 150 26224 Patra', description: 'Treat yourself to delicious, freshly-made burgers at Burger Premium. Our burgers are meticulously prepared with the freshest ingredients, ensuring each bite is a taste sensation.', category: 'Burger', rating: 4, min_order: 10, delivery_fee: 1, estimated_delivery_time: '00:30:00', delivery_times: 'Mon-Sun: 11:00 AM - 10:00 PM', phone_number: '261 049 2356' },
    { id: 9, name: 'Mr Coffee', address: 'Papaflessa 52 26222 Patra', description: 'Experience the aroma of freshly brewed coffee at Mr Coffee. Our commitment to quality shines through in every cup, as we source the finest beans and expertly roast them for maximum flavor.', category: 'Coffee', rating: 3, min_order: 8, delivery_fee: 2, estimated_delivery_time: '00:45:00', delivery_times: 'Mon-Fri: 11:00 AM - 9:00 PM', phone_number: '261 049 4433' },
    { id: 10, name: 'Crepes Go', address: 'Astiggos 9 26223 Patra', description: 'Indulge in savory and sweet crepes made to order at Crepes Go. Our skilled chefs use only the finest ingredients to create crepes that are as delicious as they are satisfying.', category: 'Crepes', rating: 3, min_order: 8, delivery_fee: 2, estimated_delivery_time: '00:45:00', delivery_times: 'Mon-Fri: 11:00 AM - 9:00 PM', phone_number: '261 049 5678' },
    { id: 11, name: 'Hendersons', address: 'Zaimi 93 26225 Patra', description: 'Satisfy your hunger with gourmet sandwiches from Hendersons. Crafted with care and creativity, our sandwiches are made with premium ingredients and bursting with flavor.', category: 'Sandwich', rating: 3, min_order: 8, delivery_fee: 2, estimated_delivery_time: '00:45:00', delivery_times: 'Mon-Fri: 11:00 AM - 9:00 PM', phone_number: '261 049 9012' },
    { id: 12, name: 'Crepe Runner', address: 'Feidiou 20 26442 Patra', description: 'Embark on a culinary journey with Crepe Runner, where savory and sweet crepes take center stage. Satisfy your cravings with our delectable creations made just the way you like.', category: 'Crepes', rating: 3, min_order: 5, delivery_fee: 0.50, estimated_delivery_time: '00:30:00', delivery_times: 'Mon-Sat: 11:00 AM - 9:00 PM', phone_number: '261 049 0123' },
    { id: 13, name: 'Imperia', address: 'Lemesou 12 26441 Patra', description: 'Indulge in the rich flavors of Italy at Imperia. From classic pasta dishes to innovative creations, each plate is a masterpiece crafted with passion and tradition.', category: 'Pasta', rating: 4, min_order: 5, delivery_fee: 0.90, estimated_delivery_time: '00:40:00', delivery_times: 'Mon-Sat: 11:00 AM - 9:00 PM', phone_number: '261 049 4567' },
    { id: 14, name: 'Kopisarasa', address: 'Fratti 7 26222 Patra', description: 'Awaken your senses with the aroma of freshly brewed coffee at Kopisarasa. Our expertly crafted blends and cozy atmosphere make every sip an experience to savor.', category: 'Coffee', rating: 5, min_order: 2, delivery_fee: 0.50, estimated_delivery_time: '00:40:00', delivery_times: 'Mon-Sat: 11:00 AM - 9:00 PM', phone_number: '261 049 2345' },
    { id: 15, name: 'Milios', address: 'Kanakarh 233 26222 Patra', description: 'At Milios, we believe that a great sandwich starts with great bread. That\'s why we bake ours fresh daily, ensuring each bite is a delicious blend of quality and flavor.', category: 'Sandwich', rating: 5, min_order: 2.5, delivery_fee: 0, estimated_delivery_time: '00:25:00', delivery_times: 'Mon-Sat: 11:00 AM - 9:00 PM', phone_number: '261 049 6789' },
    { id: 16, name: 'Nilli', address: 'Karaiskakh 168-176 26221 Patra', description: 'Transport your taste buds to Italy with Nilli\'s exquisite pasta dishes. From creamy carbonara to tangy marinara, each recipe is a celebration of authentic Italian cuisine.', category: 'Pasta', rating: 5, min_order: 6, delivery_fee: 0.50, estimated_delivery_time: '00:30:00', delivery_times: 'Mon-Sat: 11:00 AM - 9:00 PM', phone_number: '261 049 1234' },
    { id: 17, name: 'Pizza Joes', address: 'Hleias 56-74 26224 Patra', description: 'At Pizza Joe\'s, we believe that pizza is more than just a meal—it\'s a way of life. With our mouthwatering pies and endless topping combinations, every slice is a taste of perfection.', category: 'Pizza', rating: 3, min_order: 8, delivery_fee: 0, estimated_delivery_time: '00:50:00', delivery_times: 'Mon-Sat: 11:00 AM - 9:00 PM', phone_number: '261 049 5678' },
    { id: 18, name: 'Pizza Luce', address: 'Karatza 48-50 26224 Patra', description: 'Experience pizza like never before at Pizza Luce. From classic favorites to gourmet creations, our pizzas are crafted with the finest ingredients and a dash of culinary flair.', category: 'Pizza', rating: 5, min_order: 10, delivery_fee: 1, estimated_delivery_time: '00:30:00', delivery_times: 'Mon-Sat: 11:00 AM - 9:00 PM', phone_number: '261 049 9012' },
    { id: 19, name: 'Portela', address: 'Gounarh 80 26224 Patra', description: 'Savor the rich flavors of freshly brewed coffee at Portela. Whether you prefer a bold espresso or a creamy latte, each cup is a testament to quality and craftsmanship.', category: 'Coffee', rating: 5, min_order: 0, delivery_fee: 0, estimated_delivery_time: '00:20:00', delivery_times: 'Mon-Sat: 11:00 AM - 9:00 PM', phone_number: '261 049 3456' },
    { id: 20, name: 'The Burger Stop', address: 'Iwnias 42 26224 Patra', description: 'At The Burger Stop, we\'re passionate about burgers. From our juicy patties to our artisanal buns, each bite is a celebration of flavor and quality.', category: 'Burger', rating: 5, min_order: 5, delivery_fee: 0.50, estimated_delivery_time: '00:40:00', delivery_times: 'Mon-Sat: 11:00 AM - 9:00 PM', phone_number: '261 049 7890' },
    { id: 21, name: 'Capriottis', address: 'Arhths 12 26442 Patra', description: 'At Capriottis, we craft sandwiches that are a cut above the rest. From our freshly baked bread to our signature fillings, each bite is a taste of sandwich perfection.', category: 'Sandwich', rating: 5, min_order: 3, delivery_fee: 0.50, estimated_delivery_time: '00:30:00', delivery_times: 'Mon-Sat: 11:00 AM - 9:00 PM', phone_number: '261 049 6789' },
    { id: 22, name: 'Jimmy Johns Sandwiches', address: 'Pakson 21 26223 Patra', description: 'Craving a sandwich that\'s fast and fresh? Look no further than Jimmy John\'s! With lightning-fast delivery and quality ingredients, satisfaction is always guaranteed.', category: 'Sandwich', rating: 5, min_order: 4, delivery_fee: 0.40, estimated_delivery_time: '00:20:00', delivery_times: 'Mon-Sat: 11:00 AM - 9:00 PM', phone_number: '261 049 8901' },
    { id: 23, name: 'Coffee Lab', address: 'Anaksimandrou 16 26335 Patra', description: 'Explore artisanal coffee blends at Coffee Lab, where every cup is crafted with care and expertise. Step into Coffee Lab and elevate your coffee experience with every sip.', category: 'Coffee', rating: 3, min_order: 8, delivery_fee: 2, estimated_delivery_time: '00:45:00', delivery_times: 'Mon-Fri: 11:00 AM - 9:00 PM', phone_number: '261 049 8890' }
];

const insertStore = db.prepare(`
    INSERT INTO "store" ("id", "name", "address", "description", "category", "rating", "min_order", "delivery_fee", "estimated_delivery_time", "delivery_times", "phone_number")
    VALUES (@id, @name, @address, @description, @category, @rating, @min_order, @delivery_fee, @estimated_delivery_time, @delivery_times, @phone_number)
`);

stores.forEach(store => insertStore.run(store));

const menuItems = [
    // Coffees
    { id: 1, name: 'Espresso', category: 'Coffees', description: 'Strong and bold espresso', image: '/images/store-items/menu-items/coffees/espresso_single.avif' },
    { id: 2, name: 'Latte', category: 'Coffees', description: 'Creamy and smooth latte', image: '/images/store-items/menu-items/coffees/decaf_latte.avif' },
    { id: 3, name: 'Cappuccino', category: 'Coffees', description: 'Rich and foamy cappuccino', image: '/images/store-items/menu-items/coffees/cappuccino.avif' },
    { id: 4, name: 'Freddo Espresso', category: 'Coffees', description: 'Classic freddo espresso', image: '/images/store-items/menu-items/coffees/freddo_espresso.avif' },
    { id: 5, name: 'Cappuccino Latte', category: 'Coffees', description: 'Creamy and light coffee', image: '/images/store-items/menu-items/coffees/cappuccino_latte.avif' },
    { id: 6, name: 'Freddo Cappuccino', category: 'Coffees', description: 'Classic freddo cappuccino', image: '/images/store-items/menu-items/coffees/freddo_cappuccino.avif' },

    // Teas
    { id: 7, name: 'Green Tea', category: 'Teas', description: 'Refreshing green tea', image: '/images/store-items/menu-items/teas/green_tea.avif' },
    { id: 8, name: 'Chamomile Tea', category: 'Teas', description: 'Soothing chamomile tea', image: '/images/store-items/menu-items/teas/chamomile_tea.avif' },
    { id: 9, name: 'Iced Tea', category: 'Teas', description: 'Cool and refreshing iced tea', image: '/images/store-items/menu-items/teas/iced_tea.avif' },
    { id: 10, name: 'Peach Tea', category: 'Teas', description: 'Sweet and fruity peach tea', image: '/images/store-items/menu-items/teas/peach_tea.avif' },
    { id: 11, name: 'Lemon Tea', category: 'Teas', description: 'Zesty lemon tea', image: '/images/store-items/menu-items/teas/lemon_tea.avif' },

    // Sodas
    { id: 12, name: 'Schweppes Soda Water', category: 'Sodas', description: 'Refreshing soda water', image: '/images/store-items/menu-items/sodas/schweppes.avif' },
    { id: 13, name: 'Schweppes Soda Lemon', category: 'Sodas', description: 'Zesty soda lemon', image: '/images/store-items/menu-items/sodas/schweppes_lemon.avif' },
    { id: 14, name: 'Schweppes Pink Grapefruit', category: 'Sodas', description: 'Summery, tasty soda with soda with an aftertaste of pink grapefruit', image: '/images/store-items/menu-items/sodas/schweppes_pink_grapefruit.avif' },
    { id: 15, name: 'Tuborg Soda', category: 'Sodas', description: 'Summery, tasty soda', image: '/images/store-items/menu-items/sodas/tuborg_soda.avif' },
    { id: 16, name: 'Tuborg Soda Lemon', category: 'Sodas', description: 'Summery, tasty soda with soda with an aftertaste of lemon', image: '/images/store-items/menu-items/sodas/tuborg_soda_lemon.avif' },
    { id: 17, name: 'Souroti Soda Water', category: 'Sodas', description: 'Refreshing soda water', image: '/images/store-items/menu-items/sodas/souroti.avif' },

    // Sandwiches
    { id: 18, name: 'Chicken Sandwich', category: 'Sandwiches', description: 'Grilled chicken sandwich with lettuce and tomato', image: '/images/store-items/menu-items/sandwiches/chicken_sandwich.avif' },
    { id: 19, name: 'Veggie Sandwich', category: 'Sandwiches', description: 'Sandwich with hummus and vegetables', image: '/images/store-items/menu-items/sandwiches/veggie_sandwich.avif' },
    { id: 20, name: 'Turkey Sandwich', category: 'Sandwiches', description: 'Sandwich with turkey and cheese', image: '/images/store-items/menu-items/sandwiches/turkey_sandwich.avif' },
    { id: 21, name: 'Ham Sandwich', category: 'Sandwiches', description: 'Sandwich with ham and Swiss cheese', image: '/images/store-items/menu-items/sandwiches/ham_sandwich.avif' },
    { id: 22, name: 'BLT Sandwich', category: 'Sandwiches', description: 'Sandwich with bacon, lettuce, and tomato', image: '/images/store-items/menu-items/sandwiches/blt_sandwich.avif' },
    { id: 23, name: 'Avocado Sandwich', category: 'Sandwiches', description: 'Sandwich with avocado, pulled pork, melted cheddar, chili pepper, dry onion, avocado and sweet chili mayo. Accompanied by French fries and BBQ dip', image: '/images/store-items/menu-items/sandwiches/avocado_sandwich.avif' },
    { id: 24, name: 'Grilled Cheese Sandwich', category: 'Sandwiches', description: 'Sandwich with melted cheese', image: '/images/store-items/menu-items/sandwiches/grilled_cheese_sandwich.avif' },
    { id: 25, name: 'Philly Cheesesteak', category: 'Sandwiches', description: 'Sandwich with steak and cheese', image: '/images/store-items/menu-items/sandwiches/philly_sandwich.avif' },
    { id: 26, name: 'Meatball Sub', category: 'Sandwiches', description: 'Sub with meatballs and marinara', image: '/images/store-items/menu-items/sandwiches/meatball_sandwich.avif' },

    // Sweet Loukoumades
    { id: 27, name: 'Sweet Loukoumades', category: 'Sweet Loukoumades', description: 'Greek honey puffs with cinnamon', image: '/images/store-items/menu-items/loukoumades/sweet_loukoumades.avif' },
    { id: 28, name: 'Chocolate Loukoumades', category: 'Sweet Loukoumades', description: 'Greek puffs with chocolate sauce', image: '/images/store-items/menu-items/loukoumades/chocolate_loukoumades.avif' },
    { id: 29, name: 'Strawberry Loukoumades', category: 'Sweet Loukoumades', description: 'Greek puffs with strawberry sauce', image: '/images/store-items/menu-items/loukoumades/strawberry_loukoumades.avif' },
    { id: 30, name: 'Honey Nut Loukoumades', category: 'Sweet Loukoumades', description: 'Greek puffs with honey and nuts', image: '/images/store-items/menu-items/loukoumades/honey_loukoumades.avif' },
    { id: 31, name: 'Vanilla Cream Loukoumades', category: 'Sweet Loukoumades', description: 'Greek puffs with vanilla cream filling', image: '/images/store-items/menu-items/loukoumades/vanilla_cream_loukoumades.avif' },

    // Savory Loukoumades
    { id: 32, name: 'Savory Loukoumades', category: 'Savory Loukoumades', description: 'Greek puffs with cheese and herbs', image: '/images/store-items/menu-items/loukoumades/savory_loukoumades.avif' },
    { id: 33, name: 'Cheese Loukoumades', category: 'Savory Loukoumades', description: 'Greek puffs with melted cheese', image: '/images/store-items/menu-items/loukoumades/cheese_loukoumades.avif' },
    { id: 34, name: 'Spinach Loukoumades', category: 'Savory Loukoumades', description: 'Greek puffs with spinach and feta', image: '/images/store-items/menu-items/loukoumades/cheese_loukoumades.avif' },
    { id: 35, name: 'Bacon Loukoumades', category: 'Savory Loukoumades', description: 'Greek puffs with bacon and cheese', image: '/images/store-items/menu-items/loukoumades/bacon_loukoumades.avif' },
    { id: 36, name: 'Garlic Herb Loukoumades', category: 'Savory Loukoumades', description: 'Greek puffs with garlic and herbs', image: '/images/store-items/menu-items/loukoumades/bacon_loukoumades.avif' },

    // Sweet Pancakes
    { id: 37, name: 'Sweet Pancakes', category: 'Sweet Pancakes', description: 'Pancakes with maple syrup', image: '/images/store-items/menu-items/pancakes/sweet_pancakes.avif' },
    { id: 38, name: 'Blueberry Pancakes', category: 'Sweet Pancakes', description: 'Pancakes with blueberries and syrup', image: '/images/store-items/menu-items/pancakes/blueberry_pancakes.avif' },
    { id: 39, name: 'Chocolate Chip Pancakes', category: 'Sweet Pancakes', description: 'Pancakes with chocolate chips', image: '/images/store-items/menu-items/pancakes/chocolate_pancakes.avif' },
    { id: 40, name: 'Banana Pancakes', category: 'Sweet Pancakes', description: 'Pancakes with sliced bananas and syrup', image: '/images/store-items/menu-items/pancakes/banana_pancakes.avif' },
    { id: 41, name: 'Strawberry Pancakes', category: 'Sweet Pancakes', description: 'Pancakes with strawberries and cream', image: '/images/store-items/menu-items/pancakes/strawberry_pancakes.avif' },

    // Savory Pancakes
    { id: 42, name: 'Savory Pancakes', category: 'Savory Pancakes', description: 'Pancakes with bacon and cheese', image: '/images/store-items/menu-items/pancakes/savory_pancakes.avif' },
    { id: 43, name: 'Bacon and Egg Pancakes', category: 'Savory Pancakes', description: 'Pancakes with bacon and eggs', image: '/images/store-items/menu-items/pancakes/bacon_&_egg_pancakes.avif' },
    { id: 44, name: 'Cheese and Ham Pancakes', category: 'Savory Pancakes', description: 'Pancakes with cheese and ham', image: '/images/store-items/menu-items/pancakes/cheese_&_ham_pancakes.avif' },
    { id: 45, name: 'Mushrooms Pancakes', category: 'Savory Pancakes', description: 'Pancakes with mushrooms and philadelphia cheese', image: '/images/store-items/menu-items/pancakes/mushrooms_pancakes.avif' },
    { id: 46, name: 'Chicken Pancakes', category: 'Savory Pancakes', description: 'Pancakes with chicken and feta cheese', image: '/images/store-items/menu-items/pancakes/chicken_pancakes.avif' },

    // Sweet Waffles
    { id: 47, name: 'Sweet Waffles', category: 'Sweet Waffles', description: 'Waffles with chocolate sauce', image: '/images/store-items/menu-items/waffles/sweet_waffles.avif' },
    { id: 48, name: 'Strawberry Waffles', category: 'Sweet Waffles', description: 'Waffles with strawberries and cream', image: '/images/store-items/menu-items/waffles/strawberry_waffles.avif' },
    { id: 49, name: 'Happy Hippo Waffles', category: 'Sweet Waffles', description: 'Waffles with white chocolate praline, Bueno praline, grated hazelnut and Happy Hippo chocolate', image: '/images/store-items/menu-items/waffles/happy_hippo_waffles.avif' },
    { id: 50, name: 'Banana Waffles', category: 'Sweet Waffles', description: 'Waffles with banana slices and caramel', image: '/images/store-items/menu-items/waffles/banana_waffles.avif' },
    { id: 51, name: 'Nutella Waffles', category: 'Sweet Waffles', description: 'Waffles with Nutella and powdered sugar', image: '/images/store-items/menu-items/waffles/nutella_waffles.avif' },

    // Savory Waffles
    { id: 52, name: 'Savory Waffles', category: 'Savory Waffles', description: 'Waffles with ham and cheese', image: '/images/store-items/menu-items/waffles/savory_waffles.avif' },
    { id: 53, name: 'Chicken Waffles', category: 'Savory Waffles', description: 'Waffles with fried chicken', image: '/images/store-items/menu-items/waffles/chicken_waffles.avif' },
    { id: 54, name: 'Bacon Waffles', category: 'Savory Waffles', description: 'Waffles with bacon and syrup', image: '/images/store-items/menu-items/waffles/bacon_waffles.avif' },
    { id: 55, name: 'Sausage Waffles', category: 'Savory Waffles', description: 'Waffles with sausage and gravy', image: '/images/store-items/menu-items/waffles/savory_waffles.avif' },
    { id: 56, name: 'Spinach and Feta Waffles', category: 'Savory Waffles', description: 'Waffles with spinach and feta cheese', image: '/images/store-items/menu-items/waffles/savory_waffles.avif' },

    // Desserts
    { id: 57, name: 'Chocolate Dessert', category: 'Desserts', description: 'Rich chocolate cake', image: '/images/store-items/menu-items/desserts/chocolate_cake.avif' },
    { id: 58, name: 'Ice Cream Sundae', category: 'Desserts', description: 'Sundae with ice cream and toppings', image: '/images/store-items/menu-items/desserts/sundae_ice_cream.avif' },
    { id: 59, name: 'Chocolate Milkshake', category: 'Desserts', description: 'Milkshake with chocolate', image: '/images/store-items/menu-items/desserts/milkshake_chocolate.avif' },
    { id: 60, name: 'Vanilla Milkshake', category: 'Desserts', description: 'Milkshake with vanilla', image: '/images/store-items/menu-items/desserts/milkshake_vanilla.avif' },
    { id: 61, name: 'Strawberry Milkshake', category: 'Desserts', description: 'Milkshake with strawberry', image: '/images/store-items/menu-items/desserts/milkshake_strawberry.avif' },
    { id: 62, name: 'Oreo Milkshake', category: 'Desserts', description: 'Milkshake with Oreo cookies', image: '/images/store-items/menu-items/desserts/milkshake_oreo.avif' },
    { id: 63, name: 'Lemon Sorbet', category: 'Desserts', description: 'Refreshing lemon sorbet', image: '/images/store-items/menu-items/desserts/lemon_sorbet.avif' },
    { id: 64, name: 'Panna Cotta', category: 'Desserts', description: 'Italian dessert with cream and berries', image: '/images/store-items/menu-items/desserts/panna_cotta.avif' },
    { id: 65, name: 'Tiramisu', category: 'Desserts', description: 'Classic Italian dessert with coffee', image: '/images/store-items/menu-items/desserts/tiramisu.avif' },
    { id: 66, name: 'Creme Brulee', category: 'Desserts', description: 'French dessert with caramelized sugar', image: '/images/store-items/menu-items/desserts/creme_brulee.avif' },
    { id: 67, name: 'Cannoli', category: 'Desserts', description: 'Italian pastry with sweet pistachio filling', image: '/images/store-items/menu-items/desserts/cannoli.avif' },
    { id: 68, name: 'Apple Pie', category: 'Desserts', description: 'Classic apple pie with cinnamon', image: '/images/store-items/menu-items/desserts/apple_pie.avif' },
    { id: 69, name: 'Orange Pie', category: 'Desserts', description: 'Traditional orange pie with sweet pumpkin cream', image: '/images/store-items/menu-items/desserts/orange_pie.avif' },
    { id: 70, name: 'Chocolate Brownie', category: 'Desserts', description: 'Rich chocolate brownie', image: '/images/store-items/menu-items/desserts/chocolate_brownie.avif' },
    { id: 71, name: 'Cheesecake', category: 'Desserts', description: 'Creamy cheesecake with berry sauce', image: '/images/store-items/menu-items/desserts/cheesecake.avif' },

    // Ice Cream
    { id: 72, name: 'Ice Cream', category: 'Ice Cream', description: 'Vanilla ice cream scoop', image: '/images/store-items/menu-items/ice creams/vanilla_ice_cream.avif' },
    { id: 73, name: 'Cookies Ice Cream', category: 'Ice Cream', description: 'Cookies flavored ice cream scoop', image: '/images/store-items/menu-items/ice creams/cookies_ice_cream.avif' },
    { id: 74, name: 'Chocolate Ice Cream', category: 'Ice Cream', description: 'Chocolate flavored ice cream scoop', image: '/images/store-items/menu-items/ice creams/chocolate_ice_cream.avif' },
    { id: 75, name: 'Strawberry Ice Cream', category: 'Ice Cream', description: 'Strawberry flavored ice cream scoop', image: '/images/store-items/menu-items/ice creams/strawberry_ice_cream.avif' },
    { id: 76, name: 'Mango Ice Cream', category: 'Ice Cream', description: 'Mango flavored ice cream scoop', image: '/images/store-items/menu-items/ice creams/mango_ice_cream.avif' },

    // Starters
    { id: 77, name: 'Chicken Nuggets', category: 'Starters', description: 'Crispy chicken nuggets', image: '/images/store-items/menu-items/starters/chicken_nuggets.avif' },
    { id: 78, name: 'Mozzarella Sticks', category: 'Starters', description: 'Fried mozzarella sticks', image: '/images/store-items/menu-items/starters/mozzarella_sticks.avif' },
    { id: 79, name: 'Garlic Bread', category: 'Starters', description: 'Garlic bread with herbs and butter', image: '/images/store-items/menu-items/starters/garlic_bread.avif' },
    { id: 80, name: 'Onion Rings', category: 'Starters', description: 'Crispy fried onion rings', image: '/images/store-items/menu-items/starters/onion_rings.avif' },
    { id: 81, name: 'Stuffed Mushrooms', category: 'Starters', description: 'Mushrooms stuffed with cheese and herbs', image: '/images/store-items/menu-items/starters/stuffed_mushrooms.avif' },
    { id: 82, name: 'Chicken Wings', category: 'Starters', description: 'Spicy chicken wings', image: '/images/store-items/menu-items/starters/chicken_wings.avif' },
    { id: 83, name: 'Fish Tacos', category: 'Starters', description: 'Tacos with fried fish', image: '/images/store-items/menu-items/starters/fish_tacos.avif' },
    { id: 84, name: 'Shrimp Cocktail', category: 'Starters', description: 'Shrimp with cocktail sauce', image: '/images/store-items/menu-items/starters/shrimp_coctail.avif' },

    // Fries
    { id: 85, name: 'Fries', category: 'Fries', description: 'Crispy french fries', image: '/images/store-items/menu-items/fries/fries.avif' },
    { id: 86, name: 'Cheese Fries', category: 'Fries', description: 'Fries with melted cheese', image: '/images/store-items/menu-items/fries/cheese_fries.avif' },
    { id: 87, name: 'Curly Fries', category: 'Fries', description: 'Seasoned curly fries', image: '/images/store-items/menu-items/fries/curly_fries.avif' },
    { id: 88, name: 'Sweet Potato Fries', category: 'Fries', description: 'Crispy sweet potato fries', image: '/images/store-items/menu-items/fries/sweet_potato.avif' },
    { id: 89, name: 'Sweet Potato Wedges', category: 'Fries', description: 'Wedges made from sweet potatoes', image: '/images/store-items/menu-items/fries/sweet_potato_wedges.avif' },
    { id: 90, name: 'Loaded Fries', category: 'Fries', description: 'Fries topped with cheese and bacon', image: '/images/store-items/menu-items/fries/loaded_fries.avif' },

    // Salads
    { id: 91, name: 'Salad', category: 'Salads', description: 'Fresh garden salad', image: '/images/store-items/menu-items/salads/salad.avif' },
    { id: 92, name: 'Caesar Salad', category: 'Salads', description: 'Classic Caesar salad', image: '/images/store-items/menu-items/salads/caesar_salad.avif' },
    { id: 93, name: 'Greek Salad', category: 'Salads', description: 'Salad with feta, olives, and cucumber', image: '/images/store-items/menu-items/salads/greek_salad.avif' },
    { id: 94, name: 'Cobb Salad', category: 'Salads', description: 'Salad with chicken, bacon, and avocado', image: '/images/store-items/menu-items/salads/cobb_salad.avif' },
    { id: 95, name: 'Quinoa Salad', category: 'Salads', description: 'Healthy quinoa salad', image: '/images/store-items/menu-items/salads/quinoa_salad.avif' },
    { id: 96, name: 'Tuna Salad', category: 'Salads', description: 'Salad with tuna and vegetables', image: '/images/store-items/menu-items/salads/tuna_salad.avif' },
    { id: 97, name: 'Vegan Salad', category: 'Salads', description: 'Salad with mixed greens and vinaigrette', image: '/images/store-items/menu-items/salads/vegan_salad.avif' },

    // Burger
    { id: 98, name: 'Burger Classic', category: 'Burger', description: 'Juicy beef burger with lettuce, tomato, and cheese', image: '/images/store-items/menu-items/burgers/classic_burger.avif' },
    { id: 99, name: 'Cheese Burger', category: 'Burger', description: 'Burger with cheese and bacon', image: '/images/store-items/menu-items/burgers/cheese_burger.avif' },
    { id: 100, name: 'Double Cheeseburger', category: 'Burger', description: 'Burger with double cheese and bacon', image: '/images/store-items/menu-items/burgers/double_cheeseburger.avif' },
    { id: 101, name: 'BBQ Burger', category: 'Burger', description: 'Burger with BBQ sauce and onion rings', image: '/images/store-items/menu-items/burgers/bbq_burger.avif' },
    { id: 102, name: 'Chicken Burger', category: 'Burger', description: 'Grilled chicken burger with lettuce and tomato', image: '/images/store-items/menu-items/burgers/chicken_burger.avif' },

    // Vegan Burger
    { id: 103, name: 'Vegan Burger', category: 'Vegan Burger', description: 'Delicious vegan burger with plant-based patty', image: '/images/store-items/menu-items/burgers/vegan_burger.avif' },
    { id: 104, name: 'Veggie Burger', category: 'Vegan Burger', description: 'Burger with a veggie patty and lettuce', image: '/images/store-items/menu-items/burgers/veggie_burger.avif' },

    // Vegan Sandwiches
    { id: 105, name: 'Falafel Wrap', category: 'Vegan Sandwiches', description: 'Wrap with falafel and hummus', image: '/images/store-items/menu-items/sandwiches/falafel_wrap.avif' },
    { id: 106, name: 'Hummus and Veggie Wrap', category: 'Vegan Sandwiches', description: 'Wrap with hummus and vegetables', image: '/images/store-items/menu-items/sandwiches/veggie_sandwich.avif' },

    // Pasta
    { id: 107, name: 'Penne Arrabbiata', category: 'Pasta', description: 'Pasta with spicy tomato sauce', image: '/images/store-items/menu-items/pasta/arabiata.avif' },
    { id: 108, name: 'Shrimp Pasta', category: 'Pasta', description: 'Shrimp pasta with tomato sauce', image: '/images/store-items/menu-items/pasta/shrimp.avif' },
    { id: 109, name: 'Mac and Cheese', category: 'Pasta', description: 'Cheesy macaroni pasta', image: '/images/store-items/menu-items/pasta/mac_&_cheese.avif' },
    { id: 110, name: 'Spaghetti Carbonara', category: 'Pasta', description: 'Classic Italian pasta with creamy sauce and bacon', image: '/images/store-items/menu-items/pasta/carbonara.avif' },
    { id: 111, name: 'Fettuccine Alfredo', category: 'Pasta', description: 'Pasta with creamy Alfredo sauce', image: '/images/store-items/menu-items/pasta/alfredo.avif' },
    { id: 112, name: 'Spaghetti Bolognese', category: 'Pasta', description: 'Pasta with meat sauce', image: '/images/store-items/menu-items/pasta/bolognese.avif' },
    { id: 113, name: 'Pasta Pollo', category: 'Pasta', description: 'Pasta filled with cheese and chicken pieces with cream and fresh mushrooms.', image: '/images/store-items/menu-items/pasta/pollo.avif' },
    { id: 114, name: 'Vegan Pasta', category: 'Vegan Pasta', description: 'Pasta with tomato sauce and vegetables', image: '/images/store-items/menu-items/pasta/vegan_pasta.avif' },

    // Pizza
    { id: 115, name: 'Pizza Margherita', category: 'Pizza', description: 'Pizza Margherita with fior di latte mozzarella, San Marzano tomato & basil', image: '/images/store-items/menu-items/pizza/margherita.avif' },
    { id: 116, name: 'Pizza Burrata', category: 'Pizza', description: 'Pizza Burrata - Prosciutto with mozzarella fior di latte, San Marzano tomato, confit tomatoes, burrata & San Daniele prosciutto', image: '/images/store-items/menu-items/pizza/Burrata.avif' },
    { id: 117, name: 'Pizza Bianca', category: 'Pizza', description: 'Pizza Bianca with parmesan cream, fresh mozzarella, scamorza, goat cheese, jalapenos, bacon, white onion', image: '/images/store-items/menu-items/pizza/Bianca.avif' },
    { id: 118, name: 'Pizza Truffle', category: 'Pizza', description: 'Pizza Truffle with truffle cream cheese, smoked mozzarella, Portobello mushrooms & fresh truffle', image: '/images/store-items/menu-items/pizza/truffle.avif' },
    { id: 119, name: 'Pizza Bologna', category: 'Pizza', description: 'Pizza Bologna with bologna mortadella, smoked mozzarella, burrata, peanut pesto', image: '/images/store-items/menu-items/pizza/bologna.avif' },
    { id: 120, name: 'Pizza Napoli', category: 'Pizza', description: 'Pizza Napoli with San Marzano tomato sauce, Napoli salami, fresh oregano, mozzarella, parmesan', image: '/images/store-items/menu-items/pizza/napoli.avif' },

    // Vegan Pizza
    { id: 121, name: 'Pizza Vegan', category: 'Vegan Pizza', description: 'Vegan Pizza with San Marzano tomato sauce, pumpkin, eggplant, artichoke, avocado, basil, lemon zest', image: '/images/store-items/menu-items/pizza/vegan.avif' },

    // Sweet Crepes
    { id: 122, name: 'Sweet Crepe', category: 'Sweet Crepes', description: 'Crepe with Nutella and banana', image: '/images/store-items/menu-items/crepes/sweet_crepe.avif' },
    { id: 123, name: 'Sweet Crepe with Berries', category: 'Sweet Crepes', description: 'Crepe with mixed berries', image: '/images/store-items/menu-items/crepes/sweet_crepe_with_berries.avif' },

    // Savory Crepes
    { id: 124, name: 'Savory Crepe', category: 'Savory Crepes', description: 'Crepe with ham, cheese, and mushrooms', image: '/images/store-items/menu-items/crepes/savory_crepe.avif' },
    { id: 125, name: 'Savory Crepe with Spinach', category: 'Savory Crepes', description: 'Crepe with spinach and cheese', image: '/images/store-items/menu-items/crepes/savory_crepe_spinach.avif' },

    // Vegan Crepes
    { id: 126, name: 'Vegan Crepe', category: 'Vegan Crepes', description: 'Crepe with vegan fillings', image: '/images/store-items/menu-items/crepes/vegan_crepe.avif' },
    { id: 127, name: 'Vegan Crepe with Tofu', category: 'Vegan Crepes', description: 'Crepe with tofu and vegetables', image: '/images/store-items/menu-items/crepes/vegan_crepe_with_tofu.avif' },

    // Drinks
    { id: 128, name: 'Water (Small)', category: 'Drinks', description: 'Small bottle of water', image: '/images/store-items/menu-items/drinks/water_small.avif' },
    { id: 129, name: 'Water (Large)', category: 'Drinks', description: 'Large bottle of water', image: '/images/store-items/menu-items/drinks/water_large.avif' },
    { id: 130, name: 'Coca Cola', category: 'Drinks', description: 'Classic Coca Cola', image: '/images/store-items/menu-items/drinks/coca_cola.avif' },
    { id: 131, name: 'Coca Cola Zero', category: 'Drinks', description: 'Coca Cola Zero Sugar', image: '/images/store-items/menu-items/drinks/coca_cola_zero.avif' },
    { id: 132, name: 'Coca Cola Light', category: 'Drinks', description: 'Coca Cola Light', image: '/images/store-items/menu-items/drinks/coca_cola_light.avif' },
    { id: 133, name: 'Coca Cola Zero Caffeine', category: 'Drinks', description: 'Coca Cola without Caffeine', image: '/images/store-items/menu-items/drinks/coca_cola_zero_caffeine.avif' },
    { id: 134, name: 'Sprite', category: 'Drinks', description: 'Refreshing Sprite', image: '/images/store-items/menu-items/drinks/sprite.avif' },
    { id: 135, name: 'Fanta', category: 'Drinks', description: 'Orange flavored Fanta', image: '/images/store-items/menu-items/drinks/fanta.avif' },
    { id: 136, name: 'Mixed Natural Juice', category: 'Drinks', description: 'Refreshing natural juice', image: '/images/store-items/menu-items/drinks/multifruit_juice.avif' },
    { id: 137, name: 'Orange Juice', category: 'Drinks', description: 'Freshly squeezed orange juice', image: '/images/store-items/menu-items/drinks/orange_juice.avif' },
    { id: 138, name: 'Amita Motion', category: 'Drinks', description: 'Amita Motion juice', image: '/images/store-items/menu-items/drinks/amita_motion.avif' },
    { id: 139, name: 'Amita Orange', category: 'Drinks', description: 'Amita Orange juice', image: '/images/store-items/menu-items/drinks/amita_orange.avif' },
    { id: 140, name: 'Berry Smoothie', category: 'Drinks', description: 'Smoothie with mixed berries', image: '/images/store-items/menu-items/drinks/berry_smoothie.avif' },
    { id: 141, name: 'Green Smoothie', category: 'Drinks', description: 'Smoothie with spinach and kale', image: '/images/store-items/menu-items/drinks/green_smoothie.avif' },
    { id: 142, name: 'Mango Smoothie', category: 'Drinks', description: 'Smoothie with mango', image: '/images/store-items/menu-items/drinks/mango_smoothie.avif' },
    { id: 143, name: 'Cold Chocolate', category: 'Drinks', description: 'Refreshing cold chocolate', image: '/images/store-items/menu-items/drinks/cold_chocolate.avif' },
    { id: 144, name: 'Hot Chocolate', category: 'Drinks', description: 'Warm and comforting hot chocolate', image: '/images/store-items/menu-items/drinks/hot_chocolate.avif' },

    // Beverages (Alcoholic)
    { id: 145, name: 'Beer', category: 'Beverages', description: 'Refreshing beer', image: '/images/store-items/menu-items/beverages/beer.avif' },
    { id: 146, name: 'Red Wine', category: 'Beverages', description: 'Glass of red wine', image: '/images/store-items/menu-items/beverages/red_wine.avif' },
    { id: 147, name: 'White Wine', category: 'Beverages', description: 'Glass of white wine', image: '/images/store-items/menu-items/beverages/white_wine.avif' },
    { id: 148, name: 'Whiskey', category: 'Beverages', description: 'Glass of whiskey', image: '/images/store-items/menu-items/beverages/whiskey.avif' },
    { id: 149, name: 'Vodka', category: 'Beverages', description: 'Glass of vodka', image: '/images/store-items/menu-items/beverages/vodka.avif' },
    { id: 150, name: 'Rum Fashioned', category: 'Beverages', description: 'Glass of aged rum, bitter almond syrup, cherry bitters and Aztec chocolate bitters', image: '/images/store-items/menu-items/beverages/rum_fashioned.avif' }
];


const insertMenuItem = db.prepare(`
    INSERT INTO "menu_item" ("id", "name", "category", "description", "image")
    VALUES (@id, @name, @category, @description, @image)
`);
menuItems.forEach(item => insertMenuItem.run(item));


// Insert data into product_category table
const productCategories = [
    { category: 'Coffee', name: 'Coffees' },
    { category: 'Coffee', name: 'Drinks' },
    { category: 'Coffee', name: 'Teas' },
    { category: 'Coffee', name: 'Sandwiches' },
    { category: 'Coffee', name: 'Sweet Loukoumades' },
    { category: 'Coffee', name: 'Savory Loukoumades' },
    { category: 'Coffee', name: 'Sweet Pancakes' },
    { category: 'Coffee', name: 'Savory Pancakes' },
    { category: 'Coffee', name: 'Sweet Waffles' },
    { category: 'Coffee', name: 'Savory Waffles' },
    { category: 'Coffee', name: 'Desserts' },
    { category: 'Coffee', name: 'Ice Cream' },
    { category: 'Coffee', name: 'Sodas' },
    { category: 'Burger', name: 'Starters' },
    { category: 'Burger', name: 'Fries' },
    { category: 'Burger', name: 'Salads' },
    { category: 'Burger', name: 'Burger' },
    { category: 'Burger', name: 'Vegan Burger' },
    { category: 'Burger', name: 'Beverages' },
    { category: 'Burger', name: 'Drinks' },
    { category: 'Burger', name: 'Desserts' },
    { category: 'Pizza', name: 'Starters' },
    { category: 'Pizza', name: 'Fries' },
    { category: 'Pizza', name: 'Salads' },
    { category: 'Pizza', name: 'Pizza' },
    { category: 'Pizza', name: 'Vegan Pizza' },
    { category: 'Pizza', name: 'Beverages' },
    { category: 'Pizza', name: 'Drinks' },
    { category: 'Pizza', name: 'Desserts' },
    { category: 'Crepes', name: 'Sweet Crepes' },
    { category: 'Crepes', name: 'Savory Crepes' },
    { category: 'Crepes', name: 'Vegan Crepes' },
    { category: 'Crepes', name: 'Beverages' },
    { category: 'Crepes', name: 'Drinks' },
    { category: 'Crepes', name: 'Desserts' },
    { category: 'Pasta', name: 'Pasta' },
    { category: 'Pasta', name: 'Vegan Pasta' },
    { category: 'Pasta', name: 'Salads' },
    { category: 'Pasta', name: 'Beverages' },
    { category: 'Pasta', name: 'Drinks' },
    { category: 'Pasta', name: 'Desserts' },
    { category: 'Sandwich', name: 'Salads' },
    { category: 'Sandwich', name: 'Fries' },
    { category: 'Sandwich', name: 'Sandwiches' },
    { category: 'Sandwich', name: 'Vegan Sandwiches' },
    { category: 'Sandwich', name: 'Beverages' },
    { category: 'Sandwich', name: 'Drinks' },
    { category: 'Sandwich', name: 'Desserts' }
];




// Function to generate random prices for menu items based on their category
function getRandomPrice(category) {
    switch (category) {
        case 'Coffees':
            return Math.floor((Math.random() * 2 + 1).toFixed(2)); // Random price between 2 and 3
        case 'Teas':
            return Math.floor((Math.random() * 1.5 + 1.5).toFixed(2)); // Random price between 1.5 and 3
        case 'Sandwiches':
            return Math.floor((Math.random() * 3 + 3).toFixed(2)); // Random price between 3 and 6
        case 'Sweet Loukoumades':
        case 'Savory Loukoumades':
            return Math.floor((Math.random() * 1.5 + 2).toFixed(2)); // Random price between 2 and 3.5
        case 'Sweet Pancakes':
        case 'Savory Pancakes':
            return Math.floor((Math.random() * 2 + 3).toFixed(2)) + 0.4; // Random price between 3 and 5
        case 'Sweet Waffles':
        case 'Savory Waffles':
            return Math.floor((Math.random() * 2 + 3.5).toFixed(2)); // Random price between 3.5 and 5.5
        case 'Desserts':
            return Math.floor((Math.random() * 3 + 2.5).toFixed(2)); // Random price between 2.5 and 5.5
        case 'Ice Cream':
            return Math.floor((Math.random() * 1.5 + 2).toFixed(2)) + 0.3; // Random price between 2 and 3.5
        case 'Sodas':
        case 'Drinks':
            return Math.floor((Math.random() * 1.5 + 1).toFixed(2)); // Random price between 1 and 2.5
        case 'Starters':
            return Math.floor((Math.random() * 3 + 2.5).toFixed(2)); // Random price between 2.5 and 5.5
        case 'Fries':
            return Math.floor((Math.random() * 2 + 1.5).toFixed(2)); // Random price between 1.5 and 3.5
        case 'Salads':
            return Math.floor((Math.random() * 3 + 3).toFixed(2)); // Random price between 3 and 6
        case 'Burger':
        case 'Vegan Burger':
            return Math.floor((Math.random() * 3 + 5).toFixed(2)) + 0.8; // Random price between 5 and 8
        case 'Beverages':
            return Math.floor((Math.random() * 2 + 3).toFixed(2)); // Random price between 3 and 5
        case 'Pasta':
        case 'Vegan Pasta':
            return Math.floor((Math.random() * 3 + 4).toFixed(2)) + 0.3; // Random price between 4 and 7
        case 'Pizza':
            return Math.floor((Math.random() * 5 + 6).toFixed(2)); // Random price between 6 and 11
        case 'Vegan Pizza':
            return Math.floor((Math.random() * 5 + 8).toFixed(2)); // Random price between 8 and 13
        case 'Sweet Crepes':
        case 'Savory Crepes':
        case 'Vegan Crepes':
            return Math.floor((Math.random() * 2 + 3).toFixed(2)); // Random price between 3 and 5
        case 'Vegan Sandwiches':
            return Math.floor((Math.random() * 2 + 4).toFixed(2)) + 0.5; // Random price between 4 and 6
        default:
            return Math.floor((Math.random() * 5 + 1).toFixed(2)); // Random price between 1 and 6
    }
}

// Create and insert data into the menu table
const storeMenus = [];

stores.forEach(store => {
    const relevantCategories = productCategories
        .filter(pc => pc.category === store.category)
        .map(pc => pc.name);

    menuItems.forEach(item => {
        if (relevantCategories.includes(item.category)) {
            storeMenus.push({
                store_id: store.id,
                menu_item_id: item.id,
                price: getRandomPrice(item.category)
            });
        }
    });
});

const insertStoreMenu = db.prepare(`
    INSERT INTO "menu" ("store_id", "menu_item_id", "price")
    VALUES (@store_id, @menu_item_id, @price)
`);
storeMenus.forEach(storeMenu => insertStoreMenu.run(storeMenu));

// Extract unique category names
const uniqueCategories = [...new Set(productCategories.map(item => item.name))];

// Prepare the insert statement
const insertProductCategory = db.prepare(`
    INSERT INTO "product_category" ("id", "name")
    VALUES (@id, @name)
`);

// Insert unique categories into the product_category table
uniqueCategories.forEach((name, index) => {
    insertProductCategory.run({ id: index + 1, name });
});

// Prepare statements to insert into category_item and store_category tables
const insertCategoryItem = db.prepare(`
    INSERT INTO "category_item" ("category_id", "menu_item_id")
    VALUES (@category_id, @menu_item_id)
`);

const insertStoreCategory = db.prepare(`
    INSERT INTO "store_category" ("store_id", "category_id")
    VALUES (@store_id, @category_id)
`);

// Create a map of category names to their IDs
const categoryNameToId = {};
uniqueCategories.forEach((name, index) => {
    categoryNameToId[name] = index + 1;
});

// Populate category_item table
menuItems.forEach(item => {
    const categoryId = categoryNameToId[item.category];
    if (categoryId) {
        insertCategoryItem.run({
            category_id: categoryId,
            menu_item_id: item.id
        });
    }
});

// Populate store_category table
stores.forEach(store => {
    const relevantCategories = productCategories
        .filter(pc => pc.category === store.category)
        .map(pc => pc.name);

    relevantCategories.forEach(categoryName => {
        const categoryId = categoryNameToId[categoryName];
        if (categoryId) {
            insertStoreCategory.run({
                store_id: store.id,
                category_id: categoryId
            });
        }
    });
});

console.log("Database initialized and populated successfully!");

db.close();
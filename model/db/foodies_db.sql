CREATE TABLE IF NOT EXISTS "user" (
    "email" TEXT PRIMARY KEY,
    "password" TEXT,
    "fname" TEXT,
    "lname" TEXT,
    "address" TEXT,
    "phone_number" TEXT
);

CREATE TABLE IF NOT EXISTS "order" (
    "id" INTEGER PRIMARY KEY,
    "user_email" TEXT,
    "store_id" INTEGER,
    "date_of_order" DATE,
    "delivery_address" TEXT,
    "price" INTEGER,
    "tip" INTEGER,
    FOREIGN KEY ("user_email") REFERENCES "user" ("email")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    FOREIGN KEY ("store_id") REFERENCES "store" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "store" (
    "id" INTEGER PRIMARY KEY,
    "name" TEXT,
    "address" TEXT,
    "description" TEXT,
    "category" TEXT,
    "rating" INTEGER,
    "min_order" INTEGER,
    "delivery_fee" INTEGER,
    "estimated_delivery_time" TIME,
    "delivery_times" DATETIME,
    "phone_number" TEXT
);

CREATE TABLE IF NOT EXISTS "menu_item" (
    "id" INTEGER PRIMARY KEY,
    "name" TEXT,
    "category" TEXT,
    "description" TEXT
);

CREATE TABLE IF NOT EXISTS "order_content" (
    "order_id" INTEGER,
    "menu_item_id" INTEGER,
    PRIMARY KEY ("order_id", "menu_item_id"),
    FOREIGN KEY ("order_id") REFERENCES "order" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    FOREIGN KEY ("menu_item_id") REFERENCES "menu_item" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "payment" (
    "id" INTEGER PRIMARY KEY,
    "order_id" INTEGER,
    "user_email" TEXT,
    FOREIGN KEY ("order_id") REFERENCES "order" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    FOREIGN KEY ("user_email") REFERENCES "user" ("email")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "store_menu" (
    "store_id"INTEGER,
    "menu_item_id" INTEGER,
    "price" INTEGER,
    PRIMARY KEY ("store_id", "menu_item_id"),
    FOREIGN KEY ("store_id") REFERENCES "store" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    FOREIGN KEY ("menu_item_id") REFERENCES "menu_item" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

INSERT INTO "store" ("id", "name", "address", "description", "category", "rating", "min_order", "delivery_fee", "estimated_delivery_time", "delivery_times", "phone_number")
VALUES 
(1, 'Burger Park', 'Riga Feraiou 30', 'Savor the juiciest burgers in town at Burger Park. Crafted with premium ingredients and bursting with flavor, each bite is a testament to burger perfection.', 'Burger', 4, 10, 1, '00:30:00', 'Mon-Sat: 10:00 AM - 10:00 PM, Sun: 12:00 PM - 9:00 PM', '261 049 1122'),
(2, 'Burger Premium', 'Lontou 150', 'Treat yourself to delicious, freshly-made burgers at Burger Premium. Our burgers are meticulously prepared with the freshest ingredients, ensuring each bite is a taste sensation.', 'Burger', 4, 10, 1, '00:30:00', 'Mon-Sun: 11:00 AM - 10:00 PM', '261 049 2356'),
(3, 'Coffee Lab', 'Karolou 40', 'Explore artisanal coffee blends at Coffee Lab, where every cup is crafted with care and expertise. Step into Coffee Lab and elevate your coffee experience with every sip.', 'Coffee', 3, 8, 2, '00:45:00', 'Mon-Fri: 11:00 AM - 9:00 PM', '261 049 8890'),
(4, 'Mr Coffee', 'Papaflessa 52', 'Experience the aroma of freshly brewed coffee at Mr Coffee. Our commitment to quality shines through in every cup, as we source the finest beans and expertly roast them for maximum flavor.', 'Coffee', 3, 8, 2, '00:45:00', 'Mon-Fri: 11:00 AM - 9:00 PM', '261 049 4433'),
(5, 'Crepes Go', 'Astiggos 9', 'Indulge in savory and sweet crepes made to order at Crepes Go. Our skilled chefs use only the finest ingredients to create crepes that are as delicious as they are satisfying.', 'Crepes', 3, 8, 2, '00:45:00', 'Mon-Fri: 11:00 AM - 9:00 PM', '261 049 5678'),
(6, 'Hendersons', 'Zaimi 93', 'Satisfy your hunger with gourmet sandwiches from Hendersons. Crafted with care and creativity, our sandwiches are made with premium ingredients and bursting with flavor.', 'Sandwich', 3, 8, 2, '00:45:00', 'Mon-Fri: 11:00 AM - 9:00 PM', '261 049 9012'),
(7, 'Sandwich Spot', 'Solwmou 11', 'Dive into fresh wraps bursting with flavor at Sandwich Spot. Our wraps are made with the freshest ingredients and bold flavors, making them the perfect choice for a quick and satisfying meal.', 'Sandwich', 3, 5, 0.5, '00:30:00', 'Mon-Fri: 10:30 AM - 8:00 PM', '261 049 3456'),
(8, 'Pizzeria', 'Smyrnis 61', 'Enjoy authentic Italian pizzas made with love at Pizzeria. Our pizzas are crafted using traditional techniques and the finest ingredients, ensuring a taste of Italy in every slice.', 'Pizza', 3, 8, 2, '00:45:00', 'Mon-Fri: 11:00 AM - 9:00 PM', '261 049 7789'),
(9, 'Fast Pizza', 'Danihlidos 17', 'Delight in delicious pizzas served hot and fresh at Fast Pizza. Our dedication to quality shines through in every aspect of our pizzas, from the homemade dough to the carefully selected toppings.', 'Pizza', 4, 25, 0.5, '00:40:00', 'Mon-Sat: 11:30 AM - 10:00 PM', '261 049 1234'),
(10, 'Pasta Pulse', 'Maizwnos 315', 'Experience the pulse of pasta at Pasta Pulse, where comforting and flavorful dishes await. Each dish is expertly prepared using the finest ingredients and time-honored recipes, ensuring a dining experience that''s both satisfying and memorable.', 'Pasta', 4, 5, 0, '00:35:00', 'Mon-Sat: 11:00 AM - 9:00 PM', '261 049 5567'),
(11, 'Burger de Papa', 'Syrogiannh 14', 'Indulge in the juiciest burgers made with premium ingredients at Burger de Papa. Our secret blend of spices and handcrafted sauces elevate the burger experience to a whole new level.', 'Burger', 5, 8, 0.60, '00:15:00', 'Mon-Sat: 11:00 AM - 9:00 PM', '261 049 8901'),
(12, 'Burger Urge', 'Androu 31', 'Craving a burger that packs a punch? Look no further than Burger Urge! Our bold flavors and generous portions will satisfy even the most voracious appetite.', 'Burger', 3, 4, 1, '00:45:00', 'Mon-Sat: 11:00 AM - 9:00 PM', '261 049 2345'),
(13, 'Capriottis', 'Arhths 12', 'At Capriottis, we craft sandwiches that are a cut above the rest. From our freshly baked bread to our signature fillings, each bite is a taste of sandwich perfection.', 'Sandwich', 5, 3, 0.50, '00:30:00', 'Mon-Sat: 11:00 AM - 9:00 PM', '261 049 6789'),
(14, 'Crepe Runner', 'Feidiou 20', 'Embark on a culinary journey with Crepe Runner, where savory and sweet crepes take center stage. Satisfy your cravings with our delectable creations made just the way you like.', 'Crepes', 3, 5, 0.50, '00:30:00', 'Mon-Sat: 11:00 AM - 9:00 PM', '261 049 0123'),
(15, 'Imperia', 'Lemesou 12', 'Indulge in the rich flavors of Italy at Imperia. From classic pasta dishes to innovative creations, each plate is a masterpiece crafted with passion and tradition.', 'Pasta', 4, 5, 0.90, '00:40:00', 'Mon-Sat: 11:00 AM - 9:00 PM', '261 049 4567'),
(16, 'Jimmy Johns Sandwiches', 'Pakson 21', 'Craving a sandwich that''s fast and fresh? Look no further than Jimmy John''s! With lightning-fast delivery and quality ingredients, satisfaction is always guaranteed.', 'Sandwich', 5, 4, 0.40, '00:20:00', 'Mon-Sat: 11:00 AM - 9:00 PM', '261 049 8901'),
(17, 'Kopisarasa', 'Fratth 7', 'Awaken your senses with the aroma of freshly brewed coffee at Kopisarasa. Our expertly crafted blends and cozy atmosphere make every sip an experience to savor.', 'Coffee', 5, 2, 0.50, '00:40:00', 'Mon-Sat: 11:00 AM - 9:00 PM', '261 049 2345'),
(18, 'Milios', 'Kanakarh 233', 'At Milios, we believe that a great sandwich starts with great bread. That''s why we bake ours fresh daily, ensuring each bite is a delicious blend of quality and flavor.', 'Sandwich', 5, 2.5, 0, '00:25:00', 'Mon-Sat: 11:00 AM - 9:00 PM', '261 049 6789'),
(19, 'Nilli', 'Karaiskakh 168-176', 'Transport your taste buds to Italy with Nilli''s exquisite pasta dishes. From creamy carbonara to tangy marinara, each recipe is a celebration of authentic Italian cuisine.', 'Pasta', 5, 6, 0.50, '00:30:00', 'Mon-Sat: 11:00 AM - 9:00 PM', '261 049 1234'),
(20, 'Pizza Joes', 'Hleias 56-74', 'At Pizza Joe''s, we believe that pizza is more than just a meal—it''s a way of life. With our mouthwatering pies and endless topping combinations, every slice is a taste of perfection.', 'Pizza', 3, 8, 0, '00:50:00', 'Mon-Sat: 11:00 AM - 9:00 PM', '261 049 5678'),
(21, 'Pizza Luce', 'Karatza 48-50', 'Experience pizza like never before at Pizza Luce. From classic favorites to gourmet creations, our pizzas are crafted with the finest ingredients and a dash of culinary flair.', 'Pizza', 5, 10, 1, '00:30:00', 'Mon-Sat: 11:00 AM - 9:00 PM', '261 049 9012'),
(22, 'Portela', 'Gounarh 80', 'Savor the rich flavors of freshly brewed coffee at Portela. Whether you prefer a bold espresso or a creamy latte, each cup is a testament to quality and craftsmanship.', 'Coffee', 5, 0, 0, '00:20:00', 'Mon-Sat: 11:00 AM - 9:00 PM', '261 049 3456'),
(23, 'The Burger Stop', 'Iwnias 42', 'At The Burger Stop, we''re passionate about burgers. From our juicy patties to our artisanal buns, each bite is a celebration of flavor and quality.', 'Burger', 5, 5, 0.50, '00:40:00', 'Mon-Sat: 11:00 AM - 9:00 PM', '261 049 7890')
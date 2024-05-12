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
(1, 'Burger Park', '1234 Maple Avenue', 'Juicy burgers in a cozy atmosphere!', 'Burger', 4, 10, 1, '00:30:00', 'Mon-Sat: 10:00 AM - 10:00 PM, Sun: 12:00 PM - 9:00 PM', '555-9876'),
(2, 'Coffee Lab', '789 Elm Street', 'Artisan coffee blends for every palate!', 'Coffee', 3, 8, 2, '00:45:00', 'Mon-Fri: 11:00 AM - 9:00 PM', '555-5432'),
(3, 'Crepes Go', '456 Oak Avenue', 'Savory and sweet crepes made to order!', 'Crepes', 3, 8, 2, '00:45:00', 'Mon-Fri: 11:00 AM - 9:00 PM', '555-2468'),
(4, 'Fresh', '789 Pine Avenue', 'Indulge in our decadent desserts!', 'Pancakes', 3, 8, 2, '00:45:00', 'Mon-Fri: 11:00 AM - 9:00 PM', '555-1357'),
(5, 'Hendersons', '567 Cedar Street', 'Satisfy your hunger with our gourmet sandwiches!', 'Sandwich', 3, 8, 2, '00:45:00', 'Mon-Fri: 11:00 AM - 9:00 PM', '555-8023'),
(6, 'Mr Coffee', '789 Maple Avenue', 'Experience the aroma of freshly brewed coffee!', 'Coffee', 3, 8, 2, '00:45:00', 'Mon-Fri: 11:00 AM - 9:00 PM', '555-6789'),
(7, 'Pizzeria', '345 Elm Street', 'Authentic Italian pizzas made with love!', 'Pizza', 3, 8, 2, '00:45:00', 'Mon-Fri: 11:00 AM - 9:00 PM', '555-4321'),
(8, 'Burger Premium', '123 Main Street', 'Tasty burgers made fresh!', 'Burger', 4, 10, 1, '00:30:00', 'Mon-Sun: 11:00 AM - 10:00 PM', '555-1234'),
(9, 'Fast Pizza', '456 Oak Avenue', 'Delicious pizzas served hot!', 'Pizza', 4, 25, 0.5, '00:40:00', 'Mon-Sat: 11:30 AM - 10:00 PM', '555-5678'),
(10, 'Pancakes Pantry', '789 Maple Drive', 'Hearty breakfasts to start your day right!', 'Pancakes', 3, 15, 2, '00:25:00', 'Mon-Sun: 7:00 AM - 12:00 PM', '555-9012'),
(11, 'Pasta Pulse', '1010 Pine Lane', 'Satisfying pasta dishes for every palate!', 'Pasta', 4, 5, 0, '00:35:00', 'Mon-Sat: 11:00 AM - 9:00 PM', '555-3456'),
(12, 'Sandwich Spot', '1212 Cedar Street', 'Fresh wraps bursting with flavor!', 'Sandwich', 2, 5, 0.5, '00:30:00', 'Mon-Fri: 10:30 AM - 8:00 PM', '555-6789'),
(13, 'Sushi Sail', '1414 Spruce Avenue', 'Exquisite sashimi prepared with care!', 'Sushi', 5, 5, 0.5, '00:50:00', 'Tue-Sun: 12:00 PM - 9:00 PM', '555-7890');

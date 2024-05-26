CREATE TABLE IF NOT EXISTS "user" (
    "email" varchar NOT NULL,
    "password" varchar NOT NULL,
    "fname" varchar NOT NULL,
    "lname" varchar NOT NULL,
    "address" varchar NOT NULL,
    "phone_number" varchar NOT NULL,
    PRIMARY KEY ("email")
);

CREATE TABLE IF NOT EXISTS "store" (
    "id" INTEGER PRIMARY KEY,
    "name" VARCHAR,
    "address" VARCHAR,
    "description" VARCHAR,
    "category" VARCHAR,
    "rating" INTEGER,
    "min_order" INTEGER,
    "delivery_fee" INTEGER,
    "estimated_delivery_time" TIME,
    "delivery_times" DATETIME,
    "phone_number" VARCHAR
);

CREATE TABLE IF NOT EXISTS "menu_item" (
    "id" INTEGER PRIMARY KEY,
    "name" VARCHAR,
    "category" VARCHAR,
    "description" VARCHAR,
    "image" VARCHAR
);

CREATE TABLE IF NOT EXISTS "order" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "user_email" VARCHAR,
    "store_id" INTEGER,
    "date_of_order" DATE,
    "delivery_address" VARCHAR,
    "price" VARCHAR,
    "tip" VARCHAR,
    FOREIGN KEY ("user_email") REFERENCES "user" ("email")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    FOREIGN KEY ("store_id") REFERENCES "store" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "order_content" (
    "order_id" INTEGER,
    "menu_item_id" INTEGER,
    "comment" VARCHAR,
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
    "user_email" VARCHAR,
    "amount" VARCHAR,
    "method" VARCHAR,
    FOREIGN KEY ("order_id") REFERENCES "order" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    FOREIGN KEY ("user_email") REFERENCES "user" ("email")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "menu" (
    "store_id" INTEGER,
    "menu_item_id" INTEGER,
    "price" VARCHAR,
    PRIMARY KEY ("store_id", "menu_item_id"),
    FOREIGN KEY ("store_id") REFERENCES "store" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    FOREIGN KEY ("menu_item_id") REFERENCES "menu_item" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "product_category" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS "category_item" (
    "category_id" INTEGER,
    "menu_item_id" INTEGER,
    PRIMARY KEY ("category_id", "menu_item_id"),
    FOREIGN KEY ("category_id") REFERENCES "product_category" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    FOREIGN KEY ("menu_item_id") REFERENCES "menu_item" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS "store_category" (
    "store_id" INTEGER,
    "category_id" INTEGER,
    PRIMARY KEY ("store_id", "category_id"),
    FOREIGN KEY ("store_id") REFERENCES "store" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    FOREIGN KEY ("category_id") REFERENCES "product_category" ("id")
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

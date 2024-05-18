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

CREATE TABLE IF NOT EXISTS "product_category" (
    "id" INTEGER PRIMARY KEY,
    "category" TEXT NOT NULL,
    "name" TEXT,
    UNIQUE ("category", "name")
);


CREATE TABLE IF NOT EXISTS "store" (
    "id" INTEGER PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "rating" INTEGER,
    "min_order" INTEGER,
    "delivery_fee" INTEGER,
    "estimated_delivery_time" TIME,
    "openUntil" TIME,
    "delivery_times" DATETIME,
    "phone_number" TEXT
);

CREATE TABLE IF NOT EXISTS "menu_item" (
    "id" INTEGER PRIMARY KEY,
    "name" TEXT,
    "category" TEXT,
    "description" TEXT,
    "image" TEXT,
    "comment" TEXT
);

CREATE TABLE IF NOT EXISTS "store_menu" (
    "store_id" INTEGER,
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
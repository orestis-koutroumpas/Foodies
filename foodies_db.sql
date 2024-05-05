-- USER table
CREATE TABLE IF NOT EXISTS "USER" (
    "email" VARCHAR PRIMARY KEY,
    "password" VARCHAR,
    "fname" VARCHAR,
    "lname" VARCHAR,
    "address" VARCHAR,
    "phone_number" VARCHAR
);

-- STORE table
CREATE TABLE IF NOT EXISTS "STORE" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "address" VARCHAR,
    "description" VARCHAR,
    "category" VARCHAR,
    "rating" INTEGER,
    "min_order" INTEGER,
    "delivery_fee" DECIMAL(10, 2),
    "estimated_delivery_time" TIME,
    "delivery_times" VARCHAR,
    "phone_number" VARCHAR
);

-- MENU_ITEM table
CREATE TABLE IF NOT EXISTS "MENU_ITEM" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "category" VARCHAR,
    "description" VARCHAR
);

-- ORDER table
CREATE TABLE IF NOT EXISTS "ORDER" (
    "id" SERIAL PRIMARY KEY,
    "user_email" VARCHAR REFERENCES "USER" ("email") ON DELETE RESTRICT ON UPDATE RESTRICT,
    "store_id" INTEGER REFERENCES "STORE" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    "date_of_order" DATE,
    "delivery_address" VARCHAR,
    "price" DECIMAL(10, 2),
    "tip" DECIMAL(10, 2)
);

-- ORDER_CONTENTS table
CREATE TABLE IF NOT EXISTS "ORDER_CONTENTS" (
    "order_id" INTEGER REFERENCES "ORDER" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    "menu_item_id" INTEGER REFERENCES "MENU_ITEM" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    PRIMARY KEY ("order_id", "menu_item_id")
);

-- PAYMENT table
CREATE TABLE IF NOT EXISTS "PAYMENT" (
    "id" SERIAL PRIMARY KEY,
    "order_id" INTEGER REFERENCES "ORDER" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    "user_email" VARCHAR REFERENCES "USER" ("email") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- MENU table
CREATE TABLE IF NOT EXISTS "MENU" (
    "store_id" INTEGER REFERENCES "STORE" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    "menu_item_id" INTEGER REFERENCES "MENU_ITEM" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    "price" DECIMAL(10, 2),
    PRIMARY KEY ("store_id", "menu_item_id")
);

-- Indexes
CREATE INDEX idx_user_email ON "USER" ("email");
CREATE INDEX idx_order_user_email ON "ORDER" ("user_email");
CREATE INDEX idx_order_store_id ON "ORDER" ("store_id");
CREATE INDEX idx_order_contents_order_id ON "ORDER_CONTENTS" ("order_id");
CREATE INDEX idx_order_contents_menu_item_id ON "ORDER_CONTENTS" ("menu_item_id");
CREATE INDEX idx_payment_order_id ON "PAYMENT" ("order_id");
CREATE INDEX idx_payment_user_email ON "PAYMENT" ("user_email");
CREATE INDEX idx_menu_store_id ON "MENU" ("store_id");
CREATE INDEX idx_menu_menu_item_id ON "MENU" ("menu_item_id");

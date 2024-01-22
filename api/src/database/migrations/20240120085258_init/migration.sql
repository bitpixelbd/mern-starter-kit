-- CreateEnum
CREATE TYPE "DiscountTypes" AS ENUM ('PERCENTAGE', 'FIXED');

-- CreateTable
CREATE TABLE "admin_users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "push_token" TEXT,
    "profile_photo" VARCHAR(200),
    "timezone" VARCHAR(20),

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_password_resets" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "reset_code" VARCHAR(200) NOT NULL,
    "reset_token" VARCHAR(200),

    CONSTRAINT "admin_password_resets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "care_home_id" INTEGER,
    "city_id" INTEGER,
    "short_order" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletters" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(200) NOT NULL,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp_verifications" (
    "id" SERIAL NOT NULL,
    "otp" INTEGER NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "phone" VARCHAR(200),

    CONSTRAINT "otp_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" SERIAL NOT NULL,
    "user_name" VARCHAR(200) NOT NULL,
    "desc" TEXT,
    "city" VARCHAR(200),
    "image" VARCHAR(200),
    "sort_order" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "alternative_phone" TEXT,
    "address_line_1" TEXT,
    "address_line_2" TEXT,
    "city" VARCHAR(200),
    "postal_cdoe" VARCHAR(200),
    "country" VARCHAR(200),
    "is_billing_address" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "partner_id" INTEGER,
    "care_home_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reset_password" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "otp" VARCHAR(10) NOT NULL,
    "role" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "reset_password_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flash_sales" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200),
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "status" VARCHAR(200),
    "product_id" INTEGER,

    CONSTRAINT "flash_sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "discount_id" INTEGER,
    "sub_amount" INTEGER,
    "promotion_amount" INTEGER,
    "tax_amount" INTEGER,
    "shipping_amount" INTEGER,
    "shipping_id" INTEGER,
    "billing_id" INTEGER,
    "note" TEXT,
    "status" VARCHAR(200),
    "is_company_invoice" BOOLEAN NOT NULL DEFAULT false,
    "company_name" TEXT,
    "company_email" TEXT,
    "company_address" TEXT,
    "company_tax" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_on_products" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER,
    "product_id" INTEGER,
    "product_quantity" INTEGER,
    "total_price" INTEGER,

    CONSTRAINT "order_on_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "s_e_o_metas" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "title" VARCHAR(200),
    "description" VARCHAR(200),
    "is_index" VARCHAR(200),
    "category_id" INTEGER,
    "tag_id" INTEGER,
    "brand_id" INTEGER,
    "page_id" INTEGER,

    CONSTRAINT "s_e_o_metas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_faqs" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "question" VARCHAR(200),
    "answer" VARCHAR(200),

    CONSTRAINT "product_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "product_id" INTEGER,
    "type" VARCHAR(200),
    "discount_type" "DiscountTypes" NOT NULL DEFAULT 'FIXED',
    "discount_amount" INTEGER,
    "is_expired" BOOLEAN NOT NULL DEFAULT true,
    "store_id" INTEGER,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "related_products" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "related_product_id" INTEGER,
    "is_cross_selling" BOOLEAN,

    CONSTRAINT "related_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_options" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200),
    "input_type" VARCHAR(200),
    "is_required" BOOLEAN,
    "label" VARCHAR(200),
    "price" INTEGER,
    "price_type" VARCHAR(200),
    "is_global" BOOLEAN,

    CONSTRAINT "product_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_tags" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "tag_id" INTEGER,

    CONSTRAINT "product_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_settings" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "key" VARCHAR(200),
    "value" VARCHAR(200),
    "type" VARCHAR(200),

    CONSTRAINT "product_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variants" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "product_attribute_id" INTEGER,

    CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "permalink" VARCHAR(200),
    "description" TEXT,
    "content" TEXT,
    "sku" VARCHAR(200),
    "price" DOUBLE PRECISION,
    "discount_id" INTEGER,
    "cost_pert_item" DOUBLE PRECISION,
    "barcode" VARCHAR(200),
    "stock_status" VARCHAR(200),
    "stock_quantity" INTEGER,
    "weight" DOUBLE PRECISION,
    "length" DOUBLE PRECISION,
    "wide" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "status" VARCHAR(200),
    "store_id" INTEGER,
    "is_featured" BOOLEAN,
    "category_id" INTEGER,
    "brand_id" INTEGER,
    "featured_image" TEXT,
    "collection_tag" VARCHAR(200),
    "label" VARCHAR(200),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "permalink" VARCHAR(200),
    "description" TEXT,
    "status" VARCHAR(200),
    "image" TEXT,
    "font_icon" TEXT,
    "icon_image" TEXT,
    "is_featured" BOOLEAN,
    "parent_id" INTEGER,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_attributes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(200),
    "short_order" INTEGER,
    "created_at" TIMESTAMP(3),
    "status" VARCHAR(200),

    CONSTRAINT "product_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_on_options" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_option_id" INTEGER NOT NULL,

    CONSTRAINT "product_on_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "permalink" VARCHAR(200),
    "description" TEXT,
    "website" VARCHAR(200),
    "logo" TEXT,
    "status" VARCHAR(200),
    "order" VARCHAR(200),
    "is_featured" BOOLEAN,
    "category_id" INTEGER,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_collections" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" VARCHAR(200),
    "description" TEXT,
    "image" TEXT,
    "status" VARCHAR(200),
    "is_featured" BOOLEAN,

    CONSTRAINT "product_collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_labels" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "color" VARCHAR(200),
    "status" VARCHAR(200),

    CONSTRAINT "product_labels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3),
    "comment" TEXT,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "phone" VARCHAR(200),
    "date_of_birth" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "status" VARCHAR(200),
    "profile_image" TEXT,
    "is_vendor" BOOLEAN,
    "private_notes" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "address" TEXT,
    "description" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "email" VARCHAR(200),
    "phone" VARCHAR(200),
    "description" TEXT,
    "content" TEXT,
    "country" VARCHAR(200),
    "state" VARCHAR(200),
    "city" VARCHAR(200),
    "address" TEXT,
    "company" VARCHAR(200),
    "logo" TEXT,
    "cover_image" TEXT,
    "status" VARCHAR(200),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores_on_products" (
    "id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stores_on_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "permalink" TEXT,
    "description" VARCHAR(200),
    "content" VARCHAR(200),
    "status" VARCHAR(200),
    "templete" VARCHAR(200),
    "image" VARCHAR(200),

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" SERIAL NOT NULL,
    "page_id" INTEGER,
    "question" TEXT,
    "answer" TEXT,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "permalink" VARCHAR(200),
    "description" VARCHAR(200),
    "content" VARCHAR(200),
    "status" VARCHAR(200),
    "category_id" INTEGER,
    "tag_id" INTEGER,
    "image" VARCHAR(200),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "permalink" VARCHAR(200),
    "description" VARCHAR(200),
    "is_default" BOOLEAN,
    "is_featured" BOOLEAN,
    "icon" TEXT,
    "status" VARCHAR(200),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "permalink" VARCHAR(200),
    "description" VARCHAR(200),
    "status" VARCHAR(200),

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advertisements" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" VARCHAR(200),
    "url" VARCHAR(200),
    "order_quantity" INTEGER,
    "open_new_tab" BOOLEAN,
    "status" VARCHAR(200),
    "viewport_location" VARCHAR(200),
    "expiration_date" TIMESTAMP(3),
    "desktop_image" VARCHAR(200),
    "tablet_image" VARCHAR(200),
    "mobile_image" VARCHAR(200),

    CONSTRAINT "advertisements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sliders" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200),
    "key" VARCHAR(200),
    "description" TEXT,
    "status" VARCHAR(200),

    CONSTRAINT "sliders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200),
    "country_iso_code" VARCHAR(200),
    "nationality" VARCHAR(200),
    "sort_order" INTEGER,
    "is_default" BOOLEAN,
    "status" VARCHAR(200),

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorOnProduct" (
    "id" SERIAL NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "VendorOnProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "withdrawals" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "bank_name" VARCHAR(200),
    "account_holder_name" TEXT,
    "account_number" TEXT,
    "discount_amount" INTEGER,
    "vendor_id" INTEGER NOT NULL,

    CONSTRAINT "withdrawals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT,
    "whell" INTEGER,
    "price" DOUBLE PRECISION,
    "is_verified" BOOLEAN NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_password_resets_email_key" ON "admin_password_resets"("email");

-- CreateIndex
CREATE UNIQUE INDEX "otp_verifications_email_key" ON "otp_verifications"("email");

-- CreateIndex
CREATE UNIQUE INDEX "settings_key_key" ON "settings"("key");

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_email_key" ON "reset_password"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_id_fkey" FOREIGN KEY ("shipping_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_billing_id_fkey" FOREIGN KEY ("billing_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_on_products" ADD CONSTRAINT "order_on_products_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_on_products" ADD CONSTRAINT "order_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "s_e_o_metas" ADD CONSTRAINT "s_e_o_metas_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "s_e_o_metas" ADD CONSTRAINT "s_e_o_metas_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "s_e_o_metas" ADD CONSTRAINT "s_e_o_metas_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "s_e_o_metas" ADD CONSTRAINT "s_e_o_metas_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_faqs" ADD CONSTRAINT "product_faqs_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "related_products" ADD CONSTRAINT "related_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "related_products" ADD CONSTRAINT "related_products_related_product_id_fkey" FOREIGN KEY ("related_product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tags" ADD CONSTRAINT "product_tags_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tags" ADD CONSTRAINT "product_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_settings" ADD CONSTRAINT "product_settings_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_attribute_id_fkey" FOREIGN KEY ("product_attribute_id") REFERENCES "product_attributes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "product_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_on_options" ADD CONSTRAINT "product_on_options_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_on_options" ADD CONSTRAINT "product_on_options_product_option_id_fkey" FOREIGN KEY ("product_option_id") REFERENCES "product_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores_on_products" ADD CONSTRAINT "stores_on_products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores_on_products" ADD CONSTRAINT "stores_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorOnProduct" ADD CONSTRAINT "VendorOnProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdrawals" ADD CONSTRAINT "withdrawals_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

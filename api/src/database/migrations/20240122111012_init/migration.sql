/*
  Warnings:

  - You are about to drop the `VendorOnProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `advertisements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `brands` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `countries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `discounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `flash_sales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_on_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_methods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_attributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_collections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_faqs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_labels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_on_options` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_options` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_variants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `related_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `s_e_o_metas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sliders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stores_on_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `withdrawals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VendorOnProduct" DROP CONSTRAINT "VendorOnProduct_userId_fkey";

-- DropForeignKey
ALTER TABLE "brands" DROP CONSTRAINT "brands_category_id_fkey";

-- DropForeignKey
ALTER TABLE "discounts" DROP CONSTRAINT "discounts_product_id_fkey";

-- DropForeignKey
ALTER TABLE "discounts" DROP CONSTRAINT "discounts_store_id_fkey";

-- DropForeignKey
ALTER TABLE "order_on_products" DROP CONSTRAINT "order_on_products_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_on_products" DROP CONSTRAINT "order_on_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_billing_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_shipping_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "product_faqs" DROP CONSTRAINT "product_faqs_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_on_options" DROP CONSTRAINT "product_on_options_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_on_options" DROP CONSTRAINT "product_on_options_product_option_id_fkey";

-- DropForeignKey
ALTER TABLE "product_settings" DROP CONSTRAINT "product_settings_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_tags" DROP CONSTRAINT "product_tags_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_tags" DROP CONSTRAINT "product_tags_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "product_variants" DROP CONSTRAINT "product_variants_product_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "product_variants" DROP CONSTRAINT "product_variants_product_id_fkey";

-- DropForeignKey
ALTER TABLE "related_products" DROP CONSTRAINT "related_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "related_products" DROP CONSTRAINT "related_products_related_product_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_product_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_user_id_fkey";

-- DropForeignKey
ALTER TABLE "s_e_o_metas" DROP CONSTRAINT "s_e_o_metas_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "s_e_o_metas" DROP CONSTRAINT "s_e_o_metas_page_id_fkey";

-- DropForeignKey
ALTER TABLE "s_e_o_metas" DROP CONSTRAINT "s_e_o_metas_product_id_fkey";

-- DropForeignKey
ALTER TABLE "s_e_o_metas" DROP CONSTRAINT "s_e_o_metas_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "stores" DROP CONSTRAINT "stores_user_id_fkey";

-- DropForeignKey
ALTER TABLE "stores_on_products" DROP CONSTRAINT "stores_on_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "stores_on_products" DROP CONSTRAINT "stores_on_products_store_id_fkey";

-- DropForeignKey
ALTER TABLE "withdrawals" DROP CONSTRAINT "withdrawals_vendor_id_fkey";

-- DropTable
DROP TABLE "VendorOnProduct";

-- DropTable
DROP TABLE "advertisements";

-- DropTable
DROP TABLE "brands";

-- DropTable
DROP TABLE "cars";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "countries";

-- DropTable
DROP TABLE "discounts";

-- DropTable
DROP TABLE "flash_sales";

-- DropTable
DROP TABLE "order_on_products";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "payment_methods";

-- DropTable
DROP TABLE "posts";

-- DropTable
DROP TABLE "product_attributes";

-- DropTable
DROP TABLE "product_categories";

-- DropTable
DROP TABLE "product_collections";

-- DropTable
DROP TABLE "product_faqs";

-- DropTable
DROP TABLE "product_labels";

-- DropTable
DROP TABLE "product_on_options";

-- DropTable
DROP TABLE "product_options";

-- DropTable
DROP TABLE "product_settings";

-- DropTable
DROP TABLE "product_tags";

-- DropTable
DROP TABLE "product_variants";

-- DropTable
DROP TABLE "related_products";

-- DropTable
DROP TABLE "reviews";

-- DropTable
DROP TABLE "s_e_o_metas";

-- DropTable
DROP TABLE "sliders";

-- DropTable
DROP TABLE "stores";

-- DropTable
DROP TABLE "stores_on_products";

-- DropTable
DROP TABLE "tags";

-- DropTable
DROP TABLE "withdrawals";

-- DropEnum
DROP TYPE "DiscountTypes";

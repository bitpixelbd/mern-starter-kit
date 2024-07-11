-- DropForeignKey
ALTER TABLE "association_subscribers" DROP CONSTRAINT "association_subscribers_association_id_fkey";

-- DropForeignKey
ALTER TABLE "association_subscribers" DROP CONSTRAINT "association_subscribers_subscriber_id_fkey";

-- DropForeignKey
ALTER TABLE "event_categories" DROP CONSTRAINT "event_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "event_shares" DROP CONSTRAINT "event_shares_event_id_fkey";

-- DropForeignKey
ALTER TABLE "event_shares" DROP CONSTRAINT "event_shares_user_id_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_association_id_fkey";

-- AddForeignKey
ALTER TABLE "association_subscribers" ADD CONSTRAINT "association_subscribers_subscriber_id_fkey" FOREIGN KEY ("subscriber_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "association_subscribers" ADD CONSTRAINT "association_subscribers_association_id_fkey" FOREIGN KEY ("association_id") REFERENCES "associations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_shares" ADD CONSTRAINT "event_shares_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_shares" ADD CONSTRAINT "event_shares_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_association_id_fkey" FOREIGN KEY ("association_id") REFERENCES "associations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_categories" ADD CONSTRAINT "event_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

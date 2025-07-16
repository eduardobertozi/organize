ALTER TABLE "sale_servants" DROP CONSTRAINT "sale_servants_sale_id_sale_id_fk";
--> statement-breakpoint
ALTER TABLE "sale_servants" DROP CONSTRAINT "sale_servants_servant_id_servant_id_fk";
--> statement-breakpoint
ALTER TABLE "servant_product" DROP CONSTRAINT "servant_product_servant_id_servant_id_fk";
--> statement-breakpoint
ALTER TABLE "servant_product" DROP CONSTRAINT "servant_product_product_id_product_id_fk";
--> statement-breakpoint
ALTER TABLE "sale_servants" ADD CONSTRAINT "sale_servants_sale_id_sale_id_fk" FOREIGN KEY ("sale_id") REFERENCES "public"."sale"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "sale_servants" ADD CONSTRAINT "sale_servants_servant_id_servant_id_fk" FOREIGN KEY ("servant_id") REFERENCES "public"."servant"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "servant_product" ADD CONSTRAINT "servant_product_servant_id_servant_id_fk" FOREIGN KEY ("servant_id") REFERENCES "public"."servant"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "servant_product" ADD CONSTRAINT "servant_product_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "sale" DROP CONSTRAINT "sale_client_id_client_id_fk";
--> statement-breakpoint
ALTER TABLE "sale" ADD COLUMN "seller_id" text;--> statement-breakpoint
ALTER TABLE "sale" ADD CONSTRAINT "sale_seller_id_user_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sale" ADD CONSTRAINT "sale_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;
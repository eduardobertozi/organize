ALTER TABLE "sale" DROP CONSTRAINT "sale_client_id_client_id_fk";
--> statement-breakpoint
ALTER TABLE "sale" ADD CONSTRAINT "sale_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE cascade ON UPDATE cascade;
CREATE TABLE "servant_product" (
	"servant_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	CONSTRAINT "servant_product_servant_id_product_id_pk" PRIMARY KEY("servant_id","product_id")
);
--> statement-breakpoint
ALTER TABLE "servant_product" ADD CONSTRAINT "servant_product_servant_id_servant_id_fk" FOREIGN KEY ("servant_id") REFERENCES "public"."servant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "servant_product" ADD CONSTRAINT "servant_product_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;
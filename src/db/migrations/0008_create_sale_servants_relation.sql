CREATE TABLE "sale_servants" (
	"sale_id" uuid NOT NULL,
	"servant_id" uuid NOT NULL,
	CONSTRAINT "sale_servants_sale_id_servant_id_pk" PRIMARY KEY("sale_id","servant_id")
);
--> statement-breakpoint
ALTER TABLE "sale_servants" ADD CONSTRAINT "sale_servants_sale_id_sale_id_fk" FOREIGN KEY ("sale_id") REFERENCES "public"."sale"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sale_servants" ADD CONSTRAINT "sale_servants_servant_id_servant_id_fk" FOREIGN KEY ("servant_id") REFERENCES "public"."servant"("id") ON DELETE no action ON UPDATE no action;